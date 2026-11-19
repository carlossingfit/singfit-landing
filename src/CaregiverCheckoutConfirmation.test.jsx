import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import CaregiverCheckoutConfirmation from "./CaregiverCheckoutConfirmation";

let container, root;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  global.fetch = jest.fn();
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  delete global.fetch;
});
const render = async (search = "") => {
  await act(async () => root.render(<MemoryRouter initialEntries={[`/caregiver-checkout-confirmation${search}`]}><CaregiverCheckoutConfirmation /></MemoryRouter>));
};
test("direct visit without session_id cannot display success or call API", async () => {
  await render();
  expect(container.textContent).toContain("unable to verify");
  expect(container.textContent).not.toContain("Your 30-day free trial has started!");
  expect(fetch).not.toHaveBeenCalled();
  expect(container.querySelector(".scc-brand").getAttribute("href")).toBe("/caregiver-free-trial");
  expect(container.querySelector(".scc-back").getAttribute("href")).toBe("/caregiver-free-trial");
});
test("invalid session cannot display success or call API", async () => {
  await render("?session_id=invalid");
  expect(fetch).not.toHaveBeenCalled();
  expect(container.querySelector("iframe")).toBeNull();
});
test("loading is neutral; verified response unlocks success, downloads and video", async () => {
  let resolve;
  fetch.mockImplementation(() => new Promise(r => { resolve = r; }));
  await render("?session_id=cs_test_1234567890abc");
  expect(container.textContent).toContain("Checking your checkout");
  expect(container.textContent).not.toContain("Your 30-day free trial has started!");
  await act(async () => resolve({ ok: true, json: async () => ({ verified: true, trial_end: null }) }));
  expect(container.textContent).toContain("Your 30-day free trial has started!");
  expect(container.querySelectorAll(".scc-stores a")).toHaveLength(2);
  expect(container.querySelector("iframe").src).toContain("1175592420?h=b5ad0b8108");
});
test.each(["rejected", "network", "malformed"])("%s response never shows success", async kind => {
  if (kind === "network") fetch.mockRejectedValue(new Error("offline"));
  else fetch.mockResolvedValue({ ok: kind !== "rejected", json: async () => kind === "malformed" ? {} : { verified: false } });
  await render("?session_id=cs_test_1234567890abc");
  expect(container.textContent).toContain("unable to verify");
  expect(container.textContent).not.toContain("Your 30-day free trial has started!");
});
