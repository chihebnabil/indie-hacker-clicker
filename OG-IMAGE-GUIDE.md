# Creating Your Open Graph (OG) Image

An Open Graph image is what appears when you share your link on social media platforms like Facebook, Twitter, LinkedIn, etc.

## Recommended Specifications

- **Size**: 1200 x 630 pixels (1.91:1 ratio)
- **Format**: PNG or JPG
- **File Size**: Keep under 1MB for fast loading
- **Safe Zone**: Keep important content in the center 1200 x 600px area

## Quick Guide

### Option 1: Use Canva (Free & Easy)

1. Go to [Canva.com](https://www.canva.com)
2. Search for "Open Graph" or create custom size (1200 x 630px)
3. Design your image with:
   - Game title: "Indie Hacker Clicker"
   - Tagline: "Build Your Startup Empire"
   - Visual elements (laptop icon, money symbols, growth chart)
   - Your branding/colors (purple theme matches the app)
4. Download as PNG
5. Save to `public/og-image.png`

### Option 2: Use Figma (Professional)

1. Create a new frame (1200 x 630px)
2. Design with your game's theme
3. Export as PNG
4. Save to `public/og-image.png`

### Option 3: Use Screenshots

1. Take a screenshot of your game in action
2. Resize to 1200 x 630px
3. Add text overlay with title
4. Save to `public/og-image.png`

## Design Tips

✅ Use high contrast text  
✅ Include your game name prominently  
✅ Show gameplay elements (laptop, money counter)  
✅ Use your brand colors (purple/indigo theme)  
✅ Keep text readable on mobile  
✅ Test on multiple platforms

## Testing Your OG Image

After deployment, test how your link appears:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Current Placeholder

The app currently references `public/og-image.png`. Create this file to enable social media previews!

Example text for your OG image:
```
🚀 Indie Hacker Clicker
Build Your Startup Empire
Click • Upgrade • Prestige • Compete
```
