# Vercel Environment Variables Setup

Your Vercel deployment failed because the Firebase configuration is now secure and requires Environment Variables.

Please add the following Environment Variables to your Vercel Project Settings:

1. Go to your **Vercel Dashboard** -> **Project** -> **Settings** -> **Environment Variables**.
2. Add the following key-value pairs (copy exactly as shown):

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyAmdxQ1wdc3lnNkHZlskedqiJfE4AIOCIY` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `xgram-535be.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `xgram-535be` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `xgram-535be.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `249355477437` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:249355477437:web:587bd669f2664939acb2d4` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-7EE3C1GXXY` |

**Important Security Note:**
One of your previous commits exposed these keys. For maximum security, you should:
1. Go to **Google Cloud Console**.
2. **Revoke/Delete** the old API Key.
3. **Generate a new API Key**.
4. Use the **NEW** API Key in Vercel (update the value for `NEXT_PUBLIC_FIREBASE_API_KEY`).
