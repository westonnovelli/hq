# PostHog Setup

This project uses PostHog for analytics. To configure PostHog, you need to set the `PUBLIC_POSTHOG_KEY` environment variable.

## Setup Instructions

1. Create a `.env` file in the `apps/web-ui` directory (if it doesn't exist)
2. Add your PostHog API key to the `.env` file:

```bash
# .env
PUBLIC_POSTHOG_KEY=your_actual_posthog_api_key_here
```

## Important Notes

- The environment variable must be prefixed with `PUBLIC_` for Astro to make it available in the browser
- Never commit your actual API key to version control
- The `.env` file should be added to `.gitignore` if it's not already there
- If the API key is not set, PostHog will not initialize and you'll see a warning in the browser console

## Environment Variable Reference

- **Variable Name**: `PUBLIC_POSTHOG_KEY`
- **Type**: String
- **Required**: Yes
- **Example**: `PUBLIC_POSTHOG_KEY=phc_abc123...`
