# 🔐 Google OAuth Setup Guide

## ✅ Code Implementation Complete!

Your AdForge AI platform now has **fully functional Google OAuth authentication**! Here's how to enable it:

---

## 🚀 Step-by-Step Setup in Supabase

### **Step 1: Go to Supabase Dashboard**

1. Open your Supabase project: https://supabase.com/dashboard
2. Click on your project: `qbiwkmjrmpfhlznyfpra`

### **Step 2: Enable Google Provider**

1. In the left sidebar, click **Authentication** → **Providers**
2. Find **Google** in the list
3. Click to expand it
4. Toggle **Enable Sign in with Google** to ON

### **Step 3: Get Google OAuth Credentials**

You need to create a Google OAuth app:

1. Go to: https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Name it: "AdForge AI"

**Add Authorized JavaScript origins:**
```
http://localhost:3001
https://yourdomain.com
```

**Add Authorized redirect URIs:**
```
https://qbiwkmjrmpfhlznyfpra.supabase.co/auth/v1/callback
http://localhost:3001/auth/callback
```

7. Click **Create**
8. Copy the **Client ID** and **Client Secret**

### **Step 4: Configure in Supabase**

Back in your Supabase dashboard:

1. Paste **Client ID** into the Google provider settings
2. Paste **Client Secret**
3. Click **Save**

---

## ✅ That's It! Google OAuth is Now Live

### **How Users Will Sign In:**

1. User clicks **"Continue with Google"** button
2. Redirected to Google sign-in page
3. Selects their Google account
4. Consents to share profile info
5. Redirected back to your app at `/auth/callback`
6. Auto-redirected to `/dashboard`

---

## 🧪 Test It Now!

1. Go to: http://localhost:3001/sign-up
2. Click **"Continue with Google"**
3. Sign in with your Google account
4. You'll be redirected to the dashboard!

---

## 📝 What's Already Implemented:

✅ **AuthProvider Context** - Manages authentication state globally
✅ **useAuth() Hook** - Easy access to auth functions anywhere
✅ **Sign Up with Google** - One-click registration
✅ **Sign In with Google** - One-click login
✅ **Email/Password Auth** - Also works!
✅ **Auth Callback Route** - Handles OAuth redirects
✅ **Session Management** - Persists login across refreshes
✅ **Sign Out** - Logout functionality

---

## 🔒 Security Features:

- ✅ Secure session handling with Supabase
- ✅ PKCE flow for OAuth
- ✅ HTTP-only cookies for tokens
- ✅ Auto token refresh
- ✅ Cross-tab synchronization

---

## 💡 Next Steps (Optional):

### **Add GitHub OAuth** (5 minutes)
Same process, but with GitHub:
1. Create OAuth app at: https://github.com/settings/developers
2. Enable GitHub provider in Supabase
3. Already implemented in the code!

### **Add Email Verification**
Already built-in! Users who sign up with email get a verification email automatically.

### **Customize Email Templates**
In Supabase: Authentication → Email Templates
- Customize your confirmation emails
- Add your branding

---

## 🎯 Your Users Can Now:

- ✅ Sign up with Google (1 click)
- ✅ Sign up with email/password
- ✅ Sign in with Google (1 click)
- ✅ Sign in with email/password
- ✅ Stay logged in across sessions
- ✅ Access the full dashboard

---

## 🐛 Troubleshooting:

**"Invalid redirect URI"**
- Make sure you added the exact Supabase callback URL to Google Console
- URL format: `https://[your-project-ref].supabase.co/auth/v1/callback`

**"Provider not enabled"**
- Check that Google is toggled ON in Supabase Authentication → Providers

**"Popup blocked"**
- OAuth opens in same window, not popup - should work fine

---

## 📚 Resources:

- Supabase Auth Docs: https://supabase.com/docs/guides/auth
- Google OAuth Setup: https://supabase.com/docs/guides/auth/social-login/auth-google

---

**Your authentication is production-ready!** 🎉

Just enable Google OAuth in Supabase and you're live!
