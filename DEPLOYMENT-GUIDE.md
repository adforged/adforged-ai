# 🚀 Deployment Guide - AdForge AI

Deploy AdForge AI to production with your domain: **adforged.ai**

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [x] Domain purchased: **adforged.ai**
- [ ] GitHub repository (if private, need access token)
- [ ] Supabase project with database migrations run
- [ ] OpenAI API key with credits
- [ ] Vercel account (free tier works)

---

## 🚀 Step 1: Deploy to Vercel (5 minutes)

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with GitHub

2. **Import Your Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository (or import via Git URL)
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables** (CRITICAL!)
   Click "Environment Variables" and add these:

   ```bash
   # Required - App Configuration
   NEXT_PUBLIC_APP_URL=https://adforged.ai
   NEXT_PUBLIC_APP_NAME=AdForge AI

   # Required - Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

   # Required - OpenAI
   OPENAI_API_KEY=sk-your-openai-api-key-here

   # Optional - Google OAuth (if you set it up)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Video Provider (when available)
   HEYGEN_API_KEY=your-heygen-key (leave empty for now)

   # Stripe (when ready)
   STRIPE_SECRET_KEY=sk_test_your-key (leave empty for now)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-key (leave empty for now)
   ```

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - You'll get a URL like: `adforge-ai.vercel.app`

### Option B: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts to configure
```

---

## 🌐 Step 2: Connect Your Domain (3 minutes)

### In Vercel Dashboard:

1. **Go to Your Project**
   - Click on your deployed project
   - Go to "Settings" → "Domains"

2. **Add Custom Domain**
   - Click "Add"
   - Enter: `adforged.ai`
   - Click "Add"

3. **Add WWW Subdomain** (Optional but recommended)
   - Click "Add" again
   - Enter: `www.adforged.ai`
   - Set to redirect to `adforged.ai`

4. **Vercel Will Show You DNS Settings**

---

## 🔧 Step 3: Configure DNS (5 minutes)

Go to your domain registrar (where you bought adforged.ai):

### DNS Records to Add:

**For Root Domain (adforged.ai):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto
```

**For WWW (www.adforged.ai):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

**Vercel will provide exact values** - use those if different!

### Wait for DNS Propagation
- Usually takes 5-30 minutes
- Sometimes up to 24 hours
- Check status at: https://www.whatsmydns.net/#A/adforged.ai

---

## ⚙️ Step 4: Update Supabase OAuth Settings

### In Supabase Dashboard:

1. **Go to Authentication → URL Configuration**
   - Site URL: `https://adforged.ai`

2. **Add Redirect URLs:**
   ```
   https://adforged.ai/auth/callback
   https://adforged.ai/*
   ```

3. **Google OAuth (if configured):**
   - Go to Google Cloud Console
   - OAuth 2.0 Client IDs
   - Add Authorized redirect URIs:
     ```
     https://adforged.ai/auth/callback
     ```

---

## ✅ Step 5: Verify Deployment

### 1. Test the Site
Visit: https://adforged.ai

**Check:**
- [ ] Landing page loads
- [ ] Sign up works
- [ ] Sign in works
- [ ] Google OAuth works (if configured)
- [ ] Dashboard loads
- [ ] New project flow works
- [ ] Script generation works

### 2. Test Database
- Sign up with a test account
- Go to Supabase → Table Editor → Users
- Verify user appears with 10 credits

### 3. Test API Endpoints
```bash
# Test health
curl https://adforged.ai/api/health

# Test script generation (after signing in)
curl -X POST https://adforged.ai/api/generate-scripts \
  -H "Content-Type: application/json" \
  -d '{"productData": {...}}'
```

---

## 🔒 Step 6: Production Security Checklist

- [ ] **Environment Variables**: All secrets in Vercel, not in code
- [ ] **Database RLS**: Row Level Security enabled in Supabase
- [ ] **HTTPS**: Vercel handles this automatically ✅
- [ ] **Rate Limiting**: Already implemented ✅
- [ ] **CORS**: Configure if needed for external APIs
- [ ] **API Keys**: Use production keys (not test keys)
- [ ] **Error Monitoring**: Set up Sentry (optional)

---

## 📊 Step 7: Post-Deployment Setup (Optional)

### Add Analytics

**Vercel Analytics** (recommended - free):
```bash
npm install @vercel/analytics
```

Then in `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Google Analytics** (optional):
- Add `NEXT_PUBLIC_GA_ID` to Vercel env vars
- GA will auto-track pageviews

### Set Up Error Monitoring (Sentry)

1. Sign up at https://sentry.io
2. Create new Next.js project
3. Follow their setup guide
4. Add DSN to Vercel env vars

---

## 🔄 Continuous Deployment

**Every push to main = automatic deploy!**

Vercel will automatically:
1. Detect changes when you push to GitHub
2. Build your app
3. Deploy to production
4. Keep your domain updated

### Deploy Preview Branches
- Create a branch: `git checkout -b feature/new-feature`
- Push: `git push origin feature/new-feature`
- Vercel creates preview URL: `feature-new-feature.vercel.app`
- Test before merging to main

---

## 🐛 Troubleshooting

### "Domain not working"
- Check DNS propagation: https://www.whatsmydns.net
- Wait 30 minutes, sometimes takes longer
- Verify DNS records match Vercel's instructions

### "Build failed"
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Make sure no TypeScript errors: `npm run type-check`

### "Database connection error"
- Check Supabase URL and keys in Vercel env vars
- Verify Supabase project is active
- Check network settings in Supabase (allow all IPs)

### "OAuth not working"
- Update redirect URLs in Google Cloud Console
- Update Site URL in Supabase
- Clear browser cookies and try again

### "API routes returning errors"
- Check Vercel function logs
- Verify OpenAI API key is valid and has credits
- Check rate limiting isn't blocking requests

---

## 📱 Mobile Testing

Once deployed, test on mobile devices:
- iOS Safari
- Android Chrome
- Check responsive design
- Test video generation flow

---

## 🎉 You're Live!

Your app is now live at **https://adforged.ai**! 🚀

### Next Steps:

1. **Test Everything** - Go through entire flow
2. **Invite Beta Users** - Get feedback
3. **Monitor Performance** - Watch Vercel analytics
4. **Fix Bugs** - Address any issues found
5. **Start Marketing** - Share your product!

---

## 📞 Support

**Vercel Issues:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**Supabase Issues:**
- Docs: https://supabase.com/docs
- Support: https://supabase.com/support

**Domain Issues:**
- Contact your domain registrar
- Check DNS settings

---

## 🚨 Emergency Rollback

If something goes wrong:

1. **In Vercel Dashboard:**
   - Go to Deployments
   - Find last working deployment
   - Click "..." → "Promote to Production"
   - Instant rollback!

2. **Or via CLI:**
   ```bash
   vercel rollback
   ```

---

## 📊 Post-Launch Monitoring

**Daily:**
- Check Vercel Analytics for traffic
- Monitor error rates in logs
- Review Supabase database growth

**Weekly:**
- Review user feedback
- Check API usage and costs
- Optimize slow queries
- Update documentation

**Monthly:**
- Review performance metrics
- Plan new features
- Scale resources if needed

---

## 🎯 Current Deployment Status

**Working Features:**
✅ URL scraping
✅ AI script generation
✅ User authentication
✅ Dashboard
✅ Credit tracking
✅ Production APIs

**Mock/Placeholder:**
🚧 Video generation (using mock provider)
🚧 Avatar library (placeholder images)
🚧 Voice library (placeholder data)

**Not Yet Integrated:**
❌ Stripe payments
❌ Shopify/Meta/TikTok integrations
❌ Email notifications

The core platform is production-ready! Video generation integration can be added later without downtime.

---

**Congratulations! AdForge AI is now live! 🎉**
