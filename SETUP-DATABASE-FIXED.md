# 🗄️ Database Setup - FIXED VERSION

## 🔧 Updated Instructions

Your database already has some tables and indexes (like `projects` and `idx_projects_status`), so I've created a **safe version** of the migration that won't fail on existing objects.

---

## 🚀 Step-by-Step Setup

### Step 1: Run the Safe Migration

1. **Go to Supabase Dashboard → SQL Editor**
   - Visit: https://supabase.com/dashboard/project/YOUR_PROJECT_ID
   - Click "SQL Editor" in left sidebar
   - Click "New query"

2. **Copy and Run This File:**
   - File: `supabase/migrations/001_initial_schema_safe.sql`
   - Copy the ENTIRE contents
   - Paste into SQL Editor
   - Click "Run"

3. **You Should See:**
   ```
   ✅ Migration completed successfully!
   ✅ User auto-creation trigger is now active
   ✅ Next step: Run the backfill query to add existing users
   ```

---

### Step 2: Backfill Existing Users

Now that the `users` table and trigger exist, let's add your existing authenticated users:

**Copy and run this SQL:**

```sql
-- Backfill existing authenticated users into users table
INSERT INTO public.users (id, email, full_name, created_at)
SELECT
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', ''),
  created_at
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users)
ON CONFLICT (id) DO NOTHING;

-- Verify users were added
SELECT COUNT(*) as total_users FROM public.users;
```

**Expected Result:**
- You should see a count showing how many users now exist in the `users` table
- This should match the number of authenticated users

---

### Step 3: Verify the Setup

Run these verification queries:

**Check the trigger exists:**
```sql
SELECT
  trigger_name,
  event_manipulation,
  event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```

**Expected:** 1 row showing the trigger on `auth.users`

**Check your user data:**
```sql
SELECT
  email,
  full_name,
  credits,
  subscription_tier,
  created_at
FROM public.users
ORDER BY created_at DESC;
```

**Expected:** All your users listed with 10 credits and 'free' tier

---

### Step 4: Test New Sign-Up

1. **Sign out** of your application
2. **Create a new test account** (use a new email or Google account)
3. **Immediately check Supabase:**
   ```sql
   SELECT * FROM public.users ORDER BY created_at DESC LIMIT 1;
   ```

**Expected:** The new user should appear immediately with:
- Email
- Full name
- 10 credits
- 'free' subscription_tier

---

## 🎯 What This Migration Does

### ✅ Creates Missing Tables

- **users** - Now properly linked to auth.users
- **avatars** - Seeded with 3 default options
- **voices** - Seeded with 3 default options
- **templates** - Seeded with 3 default options
- **user_activity** - Logs all user actions
- **credit_transactions** - Tracks credit purchases and usage

### ✅ Creates The Critical Trigger

```sql
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**This trigger:**
- Fires automatically when someone signs up
- Creates a record in `public.users` table
- Copies email and name from auth metadata
- Gives them 10 free credits
- Sets subscription_tier to 'free'

### ✅ Automatic Credit Tracking

When users create video projects, credits are automatically:
1. Deducted from their balance
2. Logged in `credit_transactions` table
3. Updated in real-time

### ✅ Security (RLS Policies)

- Users can only see their own data
- No cross-user data access
- Proper authentication checks

---

## 🔍 Troubleshooting

### "Still getting errors"

If you see any errors, please copy and paste the **exact error message** and I'll help you fix it.

### "Trigger not working for new sign-ups"

Check if the trigger exists:
```sql
SELECT proname, prosrc
FROM pg_proc
WHERE proname = 'handle_new_user';
```

If it doesn't exist, manually create it:
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### "Users table exists but is empty"

Run the backfill query from Step 2 above.

### "Can't see user data in dashboard"

Check if RLS policies are blocking you:
```sql
-- Temporarily check data as superuser
SELECT * FROM public.users;

-- Check if RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'users';
```

---

## ✨ What's Different in the Safe Version?

The new `001_initial_schema_safe.sql` file:

1. ✅ **Checks for existing indexes** before creating them
2. ✅ **Uses `IF NOT EXISTS`** for all tables
3. ✅ **Drops existing triggers/policies** before recreating them
4. ✅ **Adds missing columns** to existing tables
5. ✅ **Won't fail** if you run it multiple times

---

## 📊 Expected Results

### Before Migration:
- ❌ Users sign up but don't appear in `users` table
- ❌ Dashboard can't show credit balance
- ❌ No credit tracking
- ❌ Can't create videos (no user record)

### After Migration:
- ✅ Users automatically created on sign-up
- ✅ Dashboard shows credits (10 free)
- ✅ Full credit tracking system
- ✅ Activity logging
- ✅ Ready for video creation
- ✅ Stripe integration ready

---

## 🎉 You're Done!

Once you run the migration and backfill query:

1. **Existing users** will have records in the `users` table
2. **New sign-ups** will automatically create user records
3. **Credits system** will work correctly
4. **Dashboard** will display user information
5. **Video creation** will properly track credit usage

Try signing up with a new test account to verify everything works! 🚀
