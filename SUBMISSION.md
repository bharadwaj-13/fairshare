# End-term project submission

## Submission details

**Project Name:** Fair Share
**Student Name:** Bharadwaj
**Problem Statement:** Groups frequently lose track of shared expenses, custom splits, and external repayments across chats and spreadsheets. Fair Share maintains one clear, validated ledger that explains who paid, who owes, and what remains to settle.
**GitHub Repository:** https://github.com/bharadwaj-13/fairshare
**Deployed Application:** https://fairshare.tinkeringspaces.com
**Demo Video:** https://raw.githubusercontent.com/bharadwaj-13/fairshare/main/docs/demo/fairshare-demo.mp4
**Tech Stack:** MongoDB, Express, React, Node.js, Vite, Supabase Auth, Razorpay, Zod, Mongoose, Vercel

## Major features

- Google OAuth and email/password authentication with server-verified sessions.
- Shared groups and optional email-bound workspace invitations.
- Equal, exact, percentage, and weighted-share expenses with deterministic minor-unit rounding.
- Per-currency balances, debt simplification, settlements, search, filters, comments, drafts, duplicate warnings, repeat expense, and undo deletion.
- Razorpay-backed 30-day Plus access with server-side signature and capture verification.
- Spending insights and entitlement-protected CSV export.
- Responsive onboarding, loading, empty, success, validation, conflict, and external-service failure states.

## Evaluator workflow

1. Open the deployed application and sign in.
2. Create a group and add people by name.
3. Add an expense, open **Change split**, and choose any split method.
4. Open the group ledger and record an external payment.
5. Search or filter expenses, inspect a person, and open **Spending insights**.

## Verification completed

- [x] Production build succeeds.
- [x] Ten domain and model tests pass.
- [x] `.env` is ignored and no credentials are tracked.
- [x] README covers the problem, users, solution, features, stack, architecture, setup, environment, and deployment.
- [x] Public application and API health endpoints are documented.
- [x] Full-HD product video demonstrates working workflows.

Before pasting this into the official form, replace **Student Name** with the exact name used by your institution if “Bharadwaj” is incomplete.
