# Game Importer

Target workflow:

Choose ZIP → Build → Preview → Publish

Supported inputs:
- HTML
- CSS
- JavaScript
- ZIP browser games

Detection:
- index.html
- scripts
- styles
- assets
- title

Safety/build constraints:
- readable browser entry point required
- reject unreadable or corrupt archives
- keep size limits explicit
- do not claim a successful build until preview loads
- isolate imported game assets
- preserve third-party licenses
