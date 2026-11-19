const Stripe = require('stripe');

// Never log request URLs, Stripe objects, or SDK errors: they may contain secrets/PII.
function createHandler({ env = process.env, stripeFactory = key => new Stripe(key, { timeout: 10000, maxNetworkRetries: 1 }) } = {}) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'private, no-store');
    res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
    const fail = (status, error) => res.status(status).json({ verified: false, error });
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return fail(405, 'method_not_allowed');
    }
    const id = req.query?.session_id;
    if (typeof id !== 'string' || !/^cs_(test|live)_[A-Za-z0-9]{10,200}$/.test(id)) return fail(400, 'invalid_session');
    const { STRIPE_SECRET_KEY: key, STRIPE_CAREGIVER_PAYMENT_LINK_ID: link, STRIPE_CAREGIVER_PRICE_ID: price } = env;
    if (!key || !/^plink_[A-Za-z0-9]+$/.test(link || '') || !/^price_[A-Za-z0-9]+$/.test(price || '')) return fail(503, 'verification_unavailable');
    try {
      const stripe = stripeFactory(key);
      const session = await stripe.checkout.sessions.retrieve(id);
      const linkId = typeof session.payment_link === 'string' ? session.payment_link : session.payment_link?.id;
      if (session.status !== 'complete' || session.mode !== 'subscription' || linkId !== link) return fail(422, 'unable_to_verify');
      const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;
      if (!subscriptionId) return fail(422, 'unable_to_verify');
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      if (!['active', 'trialing'].includes(subscription.status)) return fail(422, 'unable_to_verify');
      // Paginate rather than trusting the first page of expanded subscription items.
      let matches = false;
      for await (const item of stripe.subscriptionItems.list({ subscription: subscriptionId, limit: 100 })) {
        if (item.price?.id === price && item.price.type === 'recurring' && item.price.recurring) matches = true;
      }
      if (!matches) return fail(422, 'unable_to_verify');
      // A completed free trial can have payment_status=no_payment_required.
      const trialEnd = Number.isSafeInteger(subscription.trial_end) && subscription.trial_end > 0 ? subscription.trial_end : null;
      return res.status(200).json({ verified: true, trial_end: trialEnd });
    } catch (error) {
      return fail(error?.code === 'resource_missing' ? 404 : 503, error?.code === 'resource_missing' ? 'unable_to_verify' : 'verification_unavailable');
    }
  };
}

module.exports = createHandler();
module.exports.createHandler = createHandler;
