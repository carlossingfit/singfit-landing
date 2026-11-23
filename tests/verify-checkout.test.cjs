const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createHandler } = require('../api/stripe/verify-checkout');
const env = { STRIPE_SECRET_KEY: 'not-a-real-key', STRIPE_CAREGIVER_PAYMENT_LINK_ID: 'plink_caregiver', STRIPE_CAREGIVER_PRICE_ID: 'price_caregiver' };
async function run({ session = {}, subscription = {}, items, error, query = { session_id: 'cs_test_1234567890abc' }, method = 'GET', config = env } = {}) {
  let calls = 0;
  const stripe = {
    checkout: { sessions: { retrieve: async () => { calls++; if (error) throw error; return { status: 'complete', mode: 'subscription', payment_link: env.STRIPE_CAREGIVER_PAYMENT_LINK_ID, subscription: 'sub_caregiver', payment_status: 'no_payment_required', ...session }; } } },
    subscriptions: { retrieve: async () => ({ status: 'trialing', trial_end: 1900000000, ...subscription }) },
    subscriptionItems: { list: async function* () { yield* (items || [{ price: { id: env.STRIPE_CAREGIVER_PRICE_ID, type: 'recurring', recurring: { interval: 'month' } } }]); } },
  };
  const res = { headers: {}, setHeader(k,v) { this.headers[k]=v; }, status(n) { this.code=n; return this; }, json(data) { this.body=data; return this; } };
  await createHandler({ env: config, stripeFactory: () => stripe })({ method, query },res);
  assert.equal(res.headers['Cache-Control'],'private, no-store');
  return { ...res, calls };
}
test('completed $0 trial does not require payment_status paid; minimal response',async()=>{
  const r=await run(); assert.equal(r.code,200); assert.deepEqual(r.body,{ verified:true,trial_end:1900000000 });
});
test('active subscription accepted, absent trial date stays null',async()=>{assert.deepEqual((await run({subscription:{status:'active',trial_end:null}})).body,{verified:true,trial_end:null});});
test('invalid, missing and duplicate session IDs do not call Stripe',async()=>{
  for(const query of [{},{session_id:'bad'},{session_id:['cs_test_1234567890abc','cs_test_other']}]){ const r=await run({query});assert.equal(r.code,400);assert.equal(r.calls,0); }
});
for(const [name,options] of [
  ['wrong Payment Link',{session:{payment_link:'plink_other'}}],
  ['wrong price',{items:[{price:{id:'price_other',type:'recurring',recurring:{}}}]}],
  ['one-time price',{items:[{price:{id:env.STRIPE_CAREGIVER_PRICE_ID,type:'one_time'}}]}],
  ['canceled subscription',{subscription:{status:'canceled'}}],
  ['incomplete checkout',{session:{status:'open'}}],
  ['wrong mode',{session:{mode:'payment'}}],
  ['missing subscription',{session:{subscription:null}}],
])test(name,async()=>{const r=await run(options);assert.equal(r.code,422);assert.deepEqual(r.body,{verified:false,error:'unable_to_verify'});});
test('Stripe API errors are sanitized',async()=>{const r=await run({error:new Error('secret customer data')});assert.equal(r.code,503);assert.deepEqual(r.body,{verified:false,error:'verification_unavailable'});});
test('missing configuration fails closed',async()=>{const r=await run({config:{}});assert.equal(r.code,503);assert.equal(r.calls,0);});
test('GET only',async()=>{const r=await run({method:'POST'});assert.equal(r.code,405);assert.equal(r.calls,0);});
test("checkout and lead rewrites precede the demo and SPA fallback", () => {
  const { rewrites } = require("../vercel.json");
  assert.equal(rewrites[0].source, "/api/stripe/verify-checkout");
  assert.equal(rewrites[0].destination, "/api/stripe/verify-checkout");
  assert.equal(rewrites[1].source, "/api/lead");
  assert.equal(new URL(rewrites[1].destination).hostname, "hook.us2.make.com");
  assert.deepEqual(rewrites.slice(2), [
    { source: "/demo", destination: "https://singfit-free.vercel.app/demo/index.html" },
    { source: "/demo/:path*", destination: "https://singfit-free.vercel.app/demo/:path*" },
    { source: "/(.*)", destination: "/" },
  ]);
});
