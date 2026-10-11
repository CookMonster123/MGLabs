# MGLabs Custom Domain Setup

Use `mglabs.xyz` in GitHub Pages Custom domain.

Namecheap DNS:
- A @ 185.199.108.153
- A @ 185.199.109.153
- A @ 185.199.110.153
- A @ 185.199.111.153
- CNAME www CookMonster123.github.io

Remove conflicting parking, redirect, A, or CNAME records for @ or www.

GitHub:
1. Repository Settings -> Pages
2. Custom domain: mglabs.xyz
3. Save
4. Wait for DNS verification
5. Enable Enforce HTTPS

This package uses Vite base `/` and `public/CNAME` = `mglabs.xyz`.
