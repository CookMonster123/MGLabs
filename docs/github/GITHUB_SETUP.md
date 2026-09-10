# GitHub Setup for MGLabs

## Repository root
Upload the extracted project files directly to the root of the repository.

You should see:
- package.json
- index.html
- vite.config.ts
- tsconfig.json
- src/
- public/
- .github/
- docs/
- README.md

Do not use only the ZIP as the deployed website.

## GitHub Pages
1. Upload/push the extracted project.
2. Go to Settings → Pages.
3. Choose GitHub Actions under Build and deployment.
4. Push to main.
5. The deploy workflow will install dependencies, typecheck, build, and deploy dist/.

## Custom domain
1. Go to Settings → Pages.
2. Enter your custom domain.
3. Add GitHub's DNS records at your domain provider.
4. After verification, enable Enforce HTTPS.
5. Optionally copy public/CNAME.example to public/CNAME and replace it with the real domain.

## Google Analytics
index.html includes a disabled GA4 template.
Replace GOOGLE_ANALYTICS_MEASUREMENT_ID with your real G-XXXXXXXXXX ID and uncomment it.

## AdSense
Do not add a fake publisher ID. After approval, paste the exact AdSense script Google gives you into index.html inside <head>.
