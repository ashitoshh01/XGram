# Vercel Environment Variables Setup

Your Vercel deployment failed because the Firebase configuration requires environment variables that are not present in the repository (for security reasons).

To fix the deployment and secure your keys:

1. **Go to your Vercel Project Dashboard.**
2. Navigate to **Settings** -> **Environment Variables**.
3. Add the following keys. **Copy the values from your local `.env.local` file.**

| Key | Description |
|-----|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Copy from `.env.local` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Copy from `.env.local` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Copy from `.env.local` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Copy from `.env.local` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Copy from `.env.local` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Copy from `.env.local` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Copy from `.env.local` |

4. **Redeploy** your application (or push a new commit) for these changes to take effect.

5. And you are **GOOD** to go.