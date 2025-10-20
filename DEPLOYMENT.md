# Deploying to Vercel

This guide will help you deploy your Import-Export System to Vercel.

## Method 1: Using Vercel CLI (Fastest)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy from Terminal
Navigate to your project directory and run:
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **What's your project's name?** → import-export-system (or your preferred name)
- **In which directory is your code located?** → ./ (press Enter)
- **Want to override the settings?** → No (press Enter)

Vercel will automatically:
- Detect it's a Next.js project
- Build your application
- Deploy it to a production URL
- Give you a live URL (e.g., `import-export-system.vercel.app`)

### Step 3: Production Deployment
For production deployment, run:
```bash
vercel --prod
```

---

## Method 2: Using Vercel Dashboard (Recommended for GitHub Integration)

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Create a GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., "import-export-system")
   - Don't initialize with README

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/import-export-system.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with your GitHub account
3. **Click "Add New Project"**
4. **Import your GitHub repository**
5. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)
6. **Click "Deploy"**

Vercel will:
- Build your project
- Deploy it automatically
- Give you a production URL
- Auto-deploy on every push to main branch

---

## Method 3: Using Vercel Git Integration (No GitHub)

### Step 1: Deploy Directly
```bash
vercel --prod
```

This will create a production deployment without GitHub integration.

---

## Important Notes

### Environment Variables
If you add environment variables later (for databases, APIs, etc.):

1. **Via CLI**:
```bash
vercel env add
```

2. **Via Dashboard**:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add your variables

### Custom Domain
To add a custom domain:

1. Go to your project on Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

### Automatic Deployments
- **Production**: Push to `main` branch
- **Preview**: Push to any other branch (creates preview URL)

---

## Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment logs
vercel logs

# List all deployments
vercel ls

# Open project in browser
vercel open
```

---

## Your Project URLs

After deployment, you'll get URLs like:
- **Production**: `https://import-export-system.vercel.app`
- **Preview**: `https://import-export-system-git-branch.vercel.app`

---

## Troubleshooting

### Build Errors
If build fails, check:
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run type-check
```

### Node Version
Vercel uses Node.js 18.x by default. To specify version, add to `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## Next Steps

After deployment:
1. ✅ Visit your live URL
2. ✅ Test all features
3. ✅ Share with your team
4. ✅ Set up custom domain (optional)
5. ✅ Configure environment variables (if needed)

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
