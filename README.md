# Indie Hacker Clicker Game

An engaging incremental clicker game built with React, TypeScript, Vite, and Convex for cloud saves and leaderboards.

## Features

- 🖱️ **Click Combo System** - Build combos for multipliers up to 10x!
- 🏢 **Buildings** - Purchase automated income generators
- ⬆️ **Upgrades** - Boost your clicking power and production
- 🎯 **Challenges** - Complete objectives for rewards
- 🏆 **Achievements** - Unlock milestones
- ✨ **Prestige System** - Reset for permanent bonuses
- 🍪 **Golden Cookies** - Random bonus events with frenzy mode
- 💾 **Cloud Saves** - Automatic cloud saving with Convex
- 🏅 **Leaderboard** - Compete with other players globally

## Tech Stack

- **React 19.2** with TypeScript
- **Vite** for fast builds
- **Convex** for real-time backend and cloud saves
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)
- Convex account (free at [convex.dev](https://convex.dev))

### Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Set up Convex:
```bash
pnpm dlx convex dev
```
This will:
- Prompt you to log in to Convex
- Create a new project (or link to existing)
- Start the Convex development server

4. Start the dev server:
```bash
pnpm dev
```

## How to Play

1. **Click the laptop** to earn money
2. **Build combos** by clicking rapidly (10+ clicks for 2x multiplier, up to 10x!)
3. **Buy buildings** in the store to generate passive income
4. **Purchase upgrades** to increase click power and production
5. **Complete challenges** for bonus rewards
6. **Unlock achievements** to show off your progress
7. **Watch for golden cookies** - click them for frenzy mode!
8. **Prestige** when you've earned enough to reset with permanent bonuses
9. **Check the leaderboard** - Click the **👥 Users icon** (6th tab in the store panel on the right) to see global rankings
10. **Set your username** by clicking your name in the header (top right)

### Finding the Leaderboard

The leaderboard is located in the **Store panel** on the right side of the screen:

```
Store Tabs (from left to right):
1. 🚀 Rocket   = Buildings
2. ✨ Sparkles = Upgrades  
3. 🎯 Trophy   = Challenges
4. 🏆 Award    = Achievements
5. 🔄 Rotate   = Prestige
6. 👥 Users    = Leaderboard ← Click here!
```

The leaderboard shows:
- Top 10 players ranked by lifetime earnings
- Username, total money earned, prestige level, tokens, and best combo
- Your current rank and stats

## Deployment to Vercel

### Step 1: Prepare Convex for Production

1. Go to your [Convex Dashboard](https://dashboard.convex.dev/)
2. Create a production deployment:
   - Navigate to your project
   - Click "Settings" → "Deployments"
   - Create a production deployment
   - Copy your production deployment URL

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI

1. Install Vercel CLI:
```bash
pnpm add -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel:
   - Go to your project settings on [vercel.com](https://vercel.com)
   - Navigate to "Settings" → "Environment Variables"
   - Add: `VITE_CONVEX_URL` = your production Convex deployment URL

4. Redeploy to apply environment variables:
```bash
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and click "Add New Project"

3. Import your GitHub repository

4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build` (or `npm run build`)
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install` (or `npm install`)

5. Add environment variables:
   - Click "Environment Variables"
   - Add: `VITE_CONVEX_URL` = your production Convex deployment URL

6. Click "Deploy"

### Step 3: Update Convex Production Deployment

After deploying to Vercel, push your Convex functions to production:

```bash
pnpm dlx convex deploy --prod
```

### Important Notes

- Your Convex deployment URL should look like: `https://your-project.convex.cloud`
- Make sure to use the production URL, not the dev URL
- Environment variables starting with `VITE_` are exposed to the client
- The app will automatically save player progress to the cloud
- Leaderboard updates in real-time across all players

### Troubleshooting Deployment

**Build fails:**
- Make sure all dependencies are in `package.json`
- Check that TypeScript has no errors: `pnpm tsc --noEmit`

**Convex not connecting:**
- Verify `VITE_CONVEX_URL` is set correctly
- Make sure you've run `convex deploy --prod`
- Check browser console for connection errors

**Environment variables not working:**
- Redeploy after adding environment variables
- Make sure variable names start with `VITE_` to be accessible in the app

## SEO Features

This app includes comprehensive SEO optimization:

### Built-in SEO Features

1. **Meta Tags**
   - Primary meta tags (title, description, keywords, author)
   - Open Graph tags for social media sharing
   - Twitter Card tags for Twitter previews
   - Canonical URLs to prevent duplicate content

2. **Dynamic SEO**
   - Page title updates with current game progress
   - Description updates with player stats
   - Custom hook `useSEO()` for easy SEO management

3. **Structured Data (JSON-LD)**
   - Schema.org markup for better search engine understanding
   - Game/WebApplication type
   - Author information
   - Rating data

4. **SEO Files**
   - `robots.txt` - Search engine crawling instructions
   - `sitemap.xml` - Site structure for search engines

### Customizing SEO

To customize SEO for your deployment:

1. **Update the URL** in `index.html`:
   - Replace `https://indie-hacker-clicker.vercel.app/` with your actual domain
   - Update Open Graph and Twitter card URLs

2. **Update sitemap.xml**:
   - Change the domain in `public/sitemap.xml`
   - Update `lastmod` date when making major changes

3. **Update robots.txt**:
   - Modify `public/robots.txt` with your sitemap URL

4. **Add OG Image** (Optional but recommended):
   - Create a preview image (1200x630px recommended)
   - Save as `public/og-image.png`
   - This image will appear when sharing on social media

### SEO Best Practices Applied

✅ Mobile-friendly responsive design  
✅ Fast loading with Vite optimization  
✅ Semantic HTML structure  
✅ Descriptive page titles  
✅ Meta descriptions under 160 characters  
✅ Structured data for rich snippets  
✅ Canonical URLs  
✅ Social media preview cards  

## Project Structure

```
src/
├── components/       # React components
├── hooks/           # Custom React hooks (useGameLogic, useAutoSave)
├── types/           # TypeScript type definitions
├── data/            # Game data and configurations
├── utils/           # Utility functions
└── App.tsx          # Main application component

convex/
├── schema.ts        # Database schema
└── gameState.ts     # Backend functions (save, load, leaderboard)
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
