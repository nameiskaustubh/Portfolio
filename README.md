# Portfolio

A Vite + React portfolio site for Kaustubh Deshmukh.

## Local setup

1. Install dependencies:
   npm install
2. Copy the environment template:
   copy .env.example .env
3. Fill in the required values in `.env`.

## Required environment variables

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Notes:
- `.env` is git-ignored and should never be committed.
- Vite embeds `VITE_*` values in browser code. EmailJS's service ID, template ID, and public key are intended for client-side use; never put private credentials such as an OpenAI API key in a `VITE_*` variable.
- the contact form uses the EmailJS npm SDK instead of a CDN global so it works reliably in Vite builds.
