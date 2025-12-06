# Next.js + Supabase Auth + n8n (Welcome Harsh Yadav)

This project is a Next.js app with Sign Up / Login using Supabase Auth,
and a post-signup n8n webhook trigger. The dashboard explicitly shows "Welcome, Harsh Yadav".

## Features
- Email + Password login
- Google OAuth login (Supabase OAuth provider)
- Signup posts data to an n8n webhook (if configured)
- Protected Dashboard showing "Welcome, Harsh Yadav"
- Advanced, clean UI

## Setup (local)

1. Clone or extract project and install deps:
```bash
npm install
```

2. Create a Supabase project (https://app.supabase.com) and get:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon/public API key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

3. Enable Google OAuth in Supabase (Authentication → Providers → Google)
   - Set the Redirect URL to `NEXT_PUBLIC_SUPABASE_REDIRECT_URL` (e.g. http://localhost:3000)
   - Copy the Google client id/secret into Supabase provider settings.

4. (Optional) Setup n8n:
   - Import `n8n_workflow.json` into your n8n instance.
   - Configure email (SMTP/Gmail) and Google Sheets nodes.
   - Enable the workflow and copy the webhook URL.
   - Add the webhook URL to `.env.local` as NEXT_PUBLIC_N8N_WEBHOOK_URL

5. Create `.env.local` based on `env.example` and run:
```bash
npm run dev
# open http://localhost:3000
```


## n8n workflow (HTML email)
Import `n8n_workflow.json`. The Send Email node uses an HTML template for a nicer welcome email.

## Notes
- This project uses the Supabase anon key in the client for simplicity.
- The dashboard text "Welcome, Harsh Yadav" is intentionally static per request.
