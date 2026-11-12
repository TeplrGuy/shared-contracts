const test = require('node:test');
const assert = require('node:assert/strict');
const { loadValidator } = require('../../scripts/validate');
const validate = loadValidator().getSchema(
  'https://github.com/TeplrGuy/shared-contracts/contracts/responses/order-list-response.v1.schema.json'
);
const order = {
  orderId: 'demo-1', orderNumber: 'demo-1', status: 'new_order',
  item: 'SKU-1', customerName: 'customer-1',
  createdAt: '2026-11-12T00:00:00Z', updatedAt: '2026-11-12T00:00:00Z'
};
const page = orders => ({ orders, pagination: { page: 1, limit: 10, total: orders.length, totalPages: orders.length ? 1 : 0 } });

test('validates populated and empty pages with referenced order schema', () => {
  assert.equal(validate(page([order])), true, JSON.stringify(validate.errors));
  assert.equal(validate(page([])), true);
});

test('rejects invalid status, dates, missing required data and invalid pagination', () => {
  for (const changed of [{ status: 'pending' }, { createdAt: 'yesterday' }, { item: '' }]) {
    assert.equal(validate(page([{ ...order, ...changed }])), false);
  }
  const missing = { ...order };
  delete missing.customerName;
  assert.equal(validate(page([missing])), false);
  for (const pagination of [{ page: 0 }, { limit: 101 }, { total: -1 }, { totalPages: 0.5 }]) {
    const response = page([]);
    Object.assign(response.pagination, pagination);
    assert.equal(validate(response), false);
  }
});
