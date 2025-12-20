# 🚀 VetLabAI - Complete Deployment Guide

This guide will walk you through deploying VetLabAI to Vercel in **5 simple steps**.

---

## ✅ Prerequisites

Before you start, make sure you have:
- [ ] A GitHub account (free at [github.com](https://github.com))
- [ ] An Anthropic API key (get it from [console.anthropic.com](https://console.anthropic.com))

---

## 📋 Step-by-Step Deployment

### **Step 1: Get Your Anthropic API Key** (2 minutes)

1. Go to **https://console.anthropic.com**
2. **Sign up** or **Login** (you can use Google/GitHub)
3. Click **"API Keys"** in the left sidebar
4. Click **"Create Key"**
5. Give it a name like "VetLabAI Production"
6. **Copy the key** (starts with `sk-ant-...`)
   
   ⚠️ **IMPORTANT**: Save this key somewhere safe! You'll only see it once.

---

### **Step 2: Fork This Repository** (1 minute)

1. Go to the VetLabAI repository on GitHub
2. Click the **"Fork"** button in the top right
3. This creates your own copy of the code

**OR** if you're starting fresh:

1. Download all the files from this deployment package
2. Go to **https://github.com/new**
3. Repository name: **vetlabai**
4. Make it **Public**
5. **Don't** check any initialization options
6. Click **"Create repository"**
7. Upload the files using the "uploading an existing file" link

---

### **Step 3: Deploy to Vercel** (3 minutes)

#### **Option A: One-Click Deploy Button**

1. Click this button:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FYOUR-USERNAME%2Fvetlabai&env=VITE_ANTHROPIC_API_KEY&envDescription=Your%20Anthropic%20API%20key&envLink=https%3A%2F%2Fconsole.anthropic.com%2Fsettings%2Fkeys)

2. **Sign in with GitHub** (or create Vercel account)
3. When prompted, enter your Anthropic API key
4. Click **"Deploy"**

#### **Option B: Manual Deploy**

1. Go to **https://vercel.com**
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub
4. Click **"Add New..."** → **"Project"**
5. Find **vetlabai** in your repository list
6. Click **"Import"**

**Configure:**

7. **Framework Preset**: Vite (should auto-detect)
8. **Root Directory**: `./` (default)
9. **Build Command**: `npm run build` (auto-filled)
10. **Output Directory**: `dist` (auto-filled)

**Add Environment Variable:**

11. Expand **"Environment Variables"**
12. **Name**: `VITE_ANTHROPIC_API_KEY`
13. **Value**: Paste your Anthropic API key
14. Click **"Add"**
15. Click **"Deploy"**

---

### **Step 4: Wait for Deployment** (1-2 minutes)

Vercel will:
- ✅ Clone your repository
- ✅ Install dependencies
- ✅ Build your app
- ✅ Deploy to edge network

You'll see a progress screen with logs.

---

### **Step 5: Visit Your Live App!** (Instant)

When complete, you'll see:

🎉 **"Congratulations!"**

Your app is live at:
```
https://vetlabai-xxxxx.vercel.app
```

Click **"Visit"** to see your app!

---

## ✅ Post-Deployment Checklist

- [ ] **Test the app** with sample blood work
- [ ] **Verify API key** works (run an analysis)
- [ ] **Share the URL** with friends/testers
- [ ] **Set up custom domain** (optional)
- [ ] **Monitor usage** at console.anthropic.com

---

## 🌐 Custom Domain (Optional)

Want `vetlabai.com` instead of `vetlabai-xxxxx.vercel.app`?

### **Step 1: Buy a Domain**

Buy from:
- **Namecheap** (~$10/year) - Recommended
- **Google Domains**
- **GoDaddy**

### **Step 2: Add to Vercel**

1. In Vercel dashboard, click your project
2. Go to **Settings** → **Domains**
3. Enter your domain (e.g., `vetlabai.com`)
4. Click **"Add"**
5. Follow the DNS setup instructions

Vercel will give you nameservers to add at your domain registrar.

⏱️ Wait 24-48 hours for DNS propagation.

---

## 🔒 Security: Protect Your API Key

**Current Status**: Your API key is exposed in the browser (anyone can steal it).

**Fix Options:**

### **Option A: Add Payment Gate** (Quick)

Require payment BEFORE analysis using Stripe.

**Benefits:**
- People won't abuse your API if they have to pay first
- You make money: $9.99 - $0.10 (API cost) = $9.89 profit

### **Option B: Serverless Function** (Proper)

Move API calls to backend so key stays hidden.

**Want help implementing either?** Ask in GitHub Issues!

---

## 📊 Monitor Your App

### **Vercel Analytics**

1. Go to Vercel dashboard
2. Click your project
3. Click **"Analytics"** tab

See:
- Page views
- Unique visitors
- Performance metrics
- Geographic distribution

### **Anthropic Usage**

1. Go to **https://console.anthropic.com/settings/usage**
2. Monitor:
   - API calls per day
   - Tokens used
   - Cost per day
   - Remaining credits

**Set Budget Alerts:**
1. Go to **Settings** → **Billing**
2. Set monthly limit (e.g., $50)
3. Get alerts at 50%, 75%, 90%

---

## 🐛 Troubleshooting

### **"Build Failed" Error**

**Check**: Build logs in Vercel

**Common fix**: Make sure `package.json` has all dependencies:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.263.1"
  }
}
```

### **API Key Not Working**

**Check**: Environment variables

1. Vercel dashboard → Project → **Settings** → **Environment Variables**
2. Verify `VITE_ANTHROPIC_API_KEY` exists
3. If you changed it, go to **Deployments** → **...** → **Redeploy**

### **404 on Page Refresh**

**Fix**: Make sure `vercel.json` exists in root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

If missing, add it and push to GitHub (auto-redeploys).

### **"Invalid API Key" Error**

**Check**:
- Key copied completely (they're long!)
- No extra spaces at start/end
- Key starts with `sk-ant-`
- Try creating new key in Anthropic console

---

## 🔄 Update Your App

Made changes to the code?

**Automatic** (if using GitHub):
1. Push changes to GitHub
2. Vercel automatically redeploys
3. Live in 1-2 minutes!

**Manual**:
1. Vercel dashboard → **Deployments**
2. Click **"..."** → **Redeploy**

---

## 💰 Pricing

### **Anthropic API**
- Free tier: $5 credits (~50 analyses)
- Paid: ~$0.10 per analysis
- Add payment: console.anthropic.com/settings/billing

### **Vercel Hosting**
- **Hobby (Free)**: Perfect for testing/personal use
- **Pro ($20/mo)**: For commercial/production use
- Includes: SSL, CDN, analytics

---

## 🎯 Next Steps

Now that you're live:

1. **Test thoroughly** - Try all test cases
2. **Get feedback** - Share with 10-20 pet owners
3. **Validate with vets** - Get clinical review
4. **Add payments** - Monetize with Stripe
5. **Marketing** - Facebook ads, Instagram
6. **Scale** - Get your first 100 customers!

---

## 📞 Get Help

- **Deployment issues**: [Vercel Support](https://vercel.com/support)
- **API issues**: [Anthropic Docs](https://docs.anthropic.com)
- **App bugs**: [GitHub Issues](https://github.com/YOUR-USERNAME/vetlabai/issues)

---

## 🎉 You Did It!

Your VetLabAI app is now **LIVE** and ready for users!

**Share your success:**
- Tweet your launch
- Post in dog owner communities
- Tell vet friends
- Get your first users!

Built with ❤️ for pets and their humans 🐕
