# MGLabs v14 Build Fix

Changes made:
- pinned React, Vite, TypeScript and type package versions
- moved build tools to devDependencies
- added `npm run typecheck` and `npm run check`
- upgraded TS target/libs to ES2021 + DOM
- fixed MetroRush canvas nullability issue
- removed unused imports from App.tsx
- set Vite `base: ./` for portable static hosting
- added GitHub Actions build verification

Validation performed in this environment:
- every TS/TSX source file successfully transpiles with TypeScript 5.8.3
- JSON files were parsed successfully
- full `npm install` could not complete because package-network access timed out in the execution environment

Once dependencies are available, run:

```bash
npm install
npm run check
```

GitHub Actions will also run typecheck + production build after upload/push.
