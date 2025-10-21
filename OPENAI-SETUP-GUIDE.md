# OpenAI API Key Setup Guide

## Step-by-Step Instructions

### Step 1: Create an OpenAI Account

1. **Go to OpenAI's website:**
   - Visit: https://platform.openai.com/signup

2. **Sign up for an account:**
   - Click "Sign up"
   - Choose one of these options:
     - Sign up with Google
     - Sign up with Microsoft
     - Sign up with Apple
     - Sign up with email

3. **Verify your email** (if using email signup)
   - Check your inbox for verification email
   - Click the verification link

### Step 2: Set Up Billing (Required)

⚠️ **Important:** You need to add payment information to use the API

1. **Go to Billing:**
   - Visit: https://platform.openai.com/account/billing/overview
   - Or click your profile (top right) → "Billing"

2. **Add Payment Method:**
   - Click "Add payment details" or "Set up paid account"
   - Enter your credit/debit card information
   - Click "Continue" or "Add payment method"

3. **Add Credits (Recommended):**
   - Click "Add to credit balance"
   - Recommended: Start with $5-10 for testing
   - Our script generation costs ~$0.01-0.03 per request
   - With $5, you can generate ~200-500 video scripts

### Step 3: Create Your API Key

1. **Go to API Keys page:**
   - Visit: https://platform.openai.com/api-keys
   - Or click your profile → "View API keys"

2. **Create a new key:**
   - Click the green "+ Create new secret key" button

3. **Name your key (optional but recommended):**
   - Enter a name like: `AdForge-AI-Development`
   - This helps you identify it later
   - Click "Create secret key"

4. **Copy your API key:**
   - A popup will show your key (starts with `sk-proj-...`)
   - **IMPORTANT:** Click "Copy" and save it immediately
   - You won't be able to see this key again!
   - If you lose it, you'll need to create a new one

### Step 4: Add Key to Your Project

1. **Open your `.env.local` file** in your project
   - Location: `/Users/ericarzouman/Code/AI UGC/.env.local`

2. **Add the OpenAI API key:**
   ```bash
   OPENAI_API_KEY=sk-proj-your-actual-key-here
   ```

   Your complete `.env.local` should look like:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   OPENAI_API_KEY=sk-proj-your-actual-key-here
   ```

3. **Save the file**

4. **Restart your dev server:**
   - Stop the server (Ctrl+C in terminal)
   - Start it again: `npm run dev`

### Step 5: Test Your API Key

1. **Navigate to the new project page:**
   - http://localhost:3001/dashboard/new-project

2. **Try a test URL:**
   ```
   https://www.amazon.com/dp/B08N5WRWNW
   ```

3. **Click "Analyze Product"**
   - If successful: You'll see real product data and AI-generated scripts
   - If it fails: Check the browser console for error messages

## 💰 Pricing Information

### How Much Does This Cost?

**GPT-4 Pricing (as of 2024):**
- Input: ~$0.03 per 1K tokens
- Output: ~$0.06 per 1K tokens
- Our script generation: ~500-800 tokens total
- **Cost per video script generation: $0.02-0.04**

**Example Budget:**
- $5 = ~125-250 script generations
- $10 = ~250-500 script generations
- $20 = ~500-1000 script generations

### Cost-Saving Tips

1. **Use GPT-3.5-turbo for development:**
   - 10x cheaper than GPT-4
   - Edit `lib/ai/script-generator.ts` line 45:
   - Change `model: "gpt-4"` to `model: "gpt-3.5-turbo"`

2. **Reduce token usage:**
   - Generate fewer scripts (change count from 5 to 3)

3. **Use the fallback templates:**
   - If OpenAI fails, we automatically use free templates
   - Test this by using an invalid API key

## 🔒 Security Best Practices

### Protecting Your API Key

✅ **DO:**
- Keep your `.env.local` file private
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Use different keys for development and production
- Rotate keys regularly (every 90 days)
- Set usage limits in OpenAI dashboard

❌ **DON'T:**
- Share your API key publicly
- Commit it to GitHub/version control
- Use the same key across multiple projects
- Expose it in client-side code

### Set Usage Limits (Recommended)

1. **Go to:** https://platform.openai.com/account/limits
2. **Set monthly budget cap:**
   - Click "Set limit"
   - Enter amount (e.g., $10/month)
   - This prevents unexpected charges

## 🐛 Troubleshooting

### "Incorrect API key provided"
- Double-check you copied the entire key (starts with `sk-proj-`)
- Make sure there are no extra spaces
- Verify the key is added to `.env.local`
- Restart your dev server

### "You exceeded your current quota"
- Add credits to your OpenAI account
- Go to: https://platform.openai.com/account/billing/overview
- Click "Add to credit balance"

### "Rate limit exceeded"
- You're making requests too quickly
- Wait 20-60 seconds
- Consider upgrading your usage tier

### "Model 'gpt-4' does not exist"
- Your account might not have GPT-4 access
- Solution 1: Use GPT-3.5-turbo instead (cheaper anyway)
- Solution 2: Upgrade your OpenAI account tier

### Scripts are template-based (not AI-generated)
- Check browser console for errors
- Verify API key is correct
- Check OpenAI account has credits
- The system falls back to templates if OpenAI fails

## 📊 Monitor Your Usage

### View API Usage

1. **Go to:** https://platform.openai.com/usage
2. **See:**
   - Daily API usage
   - Cost breakdown by model
   - Request counts
   - Token usage

### Set Up Email Alerts

1. **Go to:** https://platform.openai.com/account/billing/overview
2. **Enable usage notifications:**
   - Click "Email preferences"
   - Enable "Usage notifications"
   - Set threshold (e.g., when you hit 80% of budget)

## 🔗 Quick Links

- **Create Account:** https://platform.openai.com/signup
- **API Keys:** https://platform.openai.com/api-keys
- **Billing:** https://platform.openai.com/account/billing/overview
- **Usage:** https://platform.openai.com/usage
- **Documentation:** https://platform.openai.com/docs
- **Pricing:** https://openai.com/pricing

## ❓ FAQ

**Q: Do I need a paid account?**
A: Yes, OpenAI requires payment information to use the API, even for small amounts.

**Q: Is there a free tier?**
A: New accounts get $5 in free credits that expire after 3 months. After that, you pay per use.

**Q: How do I delete an API key?**
A: Go to https://platform.openai.com/api-keys, click the trash icon next to the key.

**Q: Can I use the same key in production?**
A: It's recommended to create separate keys for development and production.

**Q: What if I lose my API key?**
A: You can't recover it. Delete the old key and create a new one.

---

**Need help?** Open an issue or check the OpenAI documentation: https://platform.openai.com/docs
