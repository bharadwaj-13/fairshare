# Fair Share architecture

## System boundaries

Fair Share is a single-origin web application. Vercel serves the Vite build and rewrites `/api/*` requests to an Express serverless function. Supabase owns user identity, MongoDB owns application data, and Razorpay owns payment processing. Fair Share never stores passwords or card details.

```text
Browser
  ├─ React application
  ├─ Supabase OAuth / email authentication
  └─ Authenticated /api requests
             │
             ▼
Express API
  ├─ verifies the Supabase bearer token
  ├─ validates input and ledger relationships with Zod
  ├─ reads and writes MongoDB workspace records
  └─ creates and verifies Razorpay orders
```

## Data model

| Collection | Purpose | Important constraints |
| --- | --- | --- |
| `Workspace` | People, groups, expenses, settlements, comments, and activity | Owner and member IDs; bounded validated state; optimistic version |
| `Membership` | Maps one authenticated user to one workspace | Unique user ID |
| `Invite` | Email-bound workspace invitation | Hashed random token, seven-day expiry, single accepting user |
| `Purchase` | Razorpay order and verified payment | Unique order ID; fixed ₹149 amount and fixed expiry |
| `Entitlement` | Current Plus access | Unique user ID; maximum verified expiry |

Ledger-facing monetary values use integer minor units. A ₹1,200 expense is stored as `120000`, preventing floating-point drift. Expense split values must add up exactly to the expense amount.

## Authenticated request flow

1. Supabase authenticates the browser and returns a session.
2. The browser sends the access token as `Authorization: Bearer …`.
3. Express calls `supabase.auth.getUser(token)` and rejects invalid or expired sessions.
4. The verified Supabase user ID resolves a MongoDB membership.
5. The route validates input and confirms workspace membership before returning or changing data.

## Workspace writes

The client loads a workspace state and version. Each update submits both. MongoDB updates only when the stored version still matches, then increments it atomically. Concurrent changes return HTTP 409 instead of silently overwriting another member's work.

This first release stores one bounded workspace document per account. That keeps multi-record ledger updates atomic and the API understandable. Pagination and record-level updates are the next scaling step for very large workspaces.

## Balance calculation

For each currency and group:

1. Credit each payer by the full expense.
2. Debit every participant by their assigned split.
3. Apply recorded settlements in the opposite direction.
4. Match debtors with creditors to produce simplified payment directions.

Currencies are independent ledgers; Fair Share never performs hidden foreign-exchange conversion.

## Billing flow

1. An authenticated user requests a ₹149 Razorpay order.
2. The API persists the order and its fixed 30-day expiry before returning the public checkout details.
3. After checkout, the API verifies the HMAC signature against the stored order.
4. The API fetches the Razorpay payment and confirms order, amount, currency, and `captured` status.
5. A signed `payment.captured` webhook can complete delayed capture.
6. Duplicate callbacks cannot extend the original pass.

## Reliability and security controls

- Helmet security headers, explicit CORS origins, and per-minute rate limiting.
- One-megabyte JSON and 100-kilobyte webhook body limits.
- Zod bounds on people, groups, expenses, settlements, comments, and text lengths.
- Unique indexes for memberships, orders, entitlements, and invitation token hashes.
- Hashed invitation tokens and email matching.
- CSV cells quoted and guarded against spreadsheet formula injection.
- Secrets loaded only from environment variables; `.env` files are ignored by Git.

## Known constraints

- One workspace per account.
- Workspace members can edit the shared ledger; granular roles are future work.
- Invitations are created as links and are not automatically emailed.
- Payments are recorded after they occur elsewhere; Fair Share does not transfer settlement money.
- The fixed Plus pass has no refunds, renewal, or subscription management in this release.

