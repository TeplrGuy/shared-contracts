# shared-contracts

Shared API and event contracts for SDLC demo services.

## Order listing v1

`contracts/models/order.v1.schema.json` and
`contracts/responses/order-list-response.v1.schema.json` define the list shape.
Validate with `npm ci`, `npm run validate` and `npm run test:unit`.

The API vocabulary is `new_order`, `in_production`, `shipped`, `cancelled`,
`rejected`, `draft`. UI terms `pending`, `processing`, `fulfilled` are presentation
aliases for the first three values, not additional API enum values. The UI must
explicitly map labels and filters; do not silently send UI aliases to the API.
This resolves the proposed mapping technically; product/human review is still
required before closing the alignment blocker in issue #3.

Existing order lifecycle values `received`, `inventory_reserved`, `created` and
`created_notification_pending` project to `new_order`. `rejected_inventory`,
`failed_timeout` and `failed_downstream` project to `rejected`. No existing service
claims production or shipping transitions. Unknown lifecycle values must fail
explicitly until mapped. Existing create/get-by-ID responses remain unchanged.

Until richer customer/catalog data exists, list `orderNumber` equals `orderId`,
`item` is the SKU and `customerName` is the customer identifier. These are explicit
demo aliases, not enriched customer names. Optional shipping/tracking fields are
omitted if no data exists.

Provider: `TeplrGuy/orders-service#4`; gateway: `TeplrGuy/api-gateway#3`;
future UI consumers: `TeplrGuy/portal-web#4` and `#6`; parent epic: `portal-web#2`.
Roll out schemas, then provider, then gateway, then UI. These additions do not
change event schemas or existing endpoint shapes. Rollback removes the new list
route and its callers together; keep existing create/tracking routes.

## Agentic review runtime

The advisory PR review is generated with gh-aw v1.2.2, matching the compile
workflow's CLI version. Regenerate from Markdown; never hand-edit the lock.
The [gateway runtime runbook](https://github.com/TeplrGuy/api-gateway/pull/103)
records the coordinated repair and validation. The previously approved
250-credit cap does not guarantee runtime success. Safe outputs remain one
comment and up to three labels, not approval, merge or deployment. Independent
review and the documented API/UI alignment gate remain required.

