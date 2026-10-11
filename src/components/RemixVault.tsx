const remixGames=[
  {slug:'metro-dash',name:'Metro Dash',inspired:'Subway Surfers',genre:'Lane Runner',description:"Dodge barriers, switch lanes, jump and collect tokens."},
  {slug:'sky-hop',name:'Sky Hop',inspired:'Flappy Bird',genre:'Tap Flyer',description:"Tap to stay airborne and thread moving gates."},
  {slug:'merge-grid',name:'Merge Grid',inspired:'2048',genre:'Number Puzzle',description:"Slide matching tiles together and build the biggest number."},
  {slug:'neon-snake',name:'Neon Snake',inspired:'Snake',genre:'Arcade',description:"Grow your trail without hitting the wall or yourself."},
  {slug:'block-drop',name:'Block Drop',inspired:'Tetris',genre:'Puzzle',description:"Rotate and place falling blocks to clear horizontal lines."},
  {slug:'maze-munch',name:'Maze Munch',inspired:'Pac-Man',genre:'Maze',description:"Collect every dot while avoiding the roaming hunter."},
  {slug:'mine-grid',name:'Mine Grid',inspired:'Minesweeper',genre:'Logic',description:"Reveal safe cells and flag hidden mines."},
  {slug:'word-five',name:'Word Five',inspired:'Wordle',genre:'Word',description:"Guess the five-letter word in six tries."},
  {slug:'brick-burst',name:'Brick Burst',inspired:'Breakout',genre:'Arcade',description:"Bounce the ball, move the paddle and clear the wall."},
  {slug:'galaxy-guard',name:'Galaxy Guard',inspired:'Space Invaders',genre:'Shooter',description:"Move, shoot, and clear descending alien formations."},
  {slug:'desert-sprint',name:'Desert Sprint',inspired:'Chrome Dino',genre:'Runner',description:"Jump obstacles as the world speeds up."},
  {slug:'street-hop',name:'Street Hop',inspired:'Crossy Road',genre:'Crossing',description:"Hop through traffic and reach the next safe strip."},
  {slug:'pulse-jump',name:'Pulse Jump',inspired:'Geometry Dash',genre:'Rhythm Platformer',description:"Auto-run through spikes and time every jump."},
  {slug:'cloud-climb',name:'Cloud Climb',inspired:'Doodle Jump',genre:'Platformer',description:"Bounce upward from platform to platform."},
  {slug:'slice-storm',name:'Slice Storm',inspired:'Fruit Ninja',genre:'Reaction',description:"Slice targets before they fall. Avoid the bombs."},
  {slug:'sling-siege',name:'Sling Siege',inspired:'Angry Birds',genre:'Physics Puzzle',description:"Launch a ball toward block towers and score direct hits."},
  {slug:'tower-stack',name:'Tower Stack',inspired:'Stack',genre:'Timing',description:"Drop moving blocks and build the tallest clean tower."},
  {slug:'spiral-drop',name:'Spiral Drop',inspired:'Helix Jump',genre:'Dropper',description:"Guide the ball through rotating gaps while avoiding danger zones."},
  {slug:'chroma-hop',name:'Chroma Hop',inspired:'Color Switch',genre:'Color Timing',description:"Pass through matching color gates and keep your streak alive."},
  {slug:'temple-dash',name:'Temple Dash',inspired:'Temple Run',genre:'Runner',description:"Turn, jump, and slide through an endless ruin path."},
];

export default function RemixVault(){
  return <div className="page remix-vault-page">
    <div className="page-title"><div><span>20 ORIGINAL REMAKES</span><h1>Remix Vault</h1><p>Popular-game-inspired browser games rebuilt from scratch for MGLabs with original code, visuals, names and lightweight mechanics.</p></div><span className="status built">20 PLAYABLE</span></div>
    <section className="section no-top"><div className="grid">{remixGames.map(g=><article className="card" key={g.slug}><div className="card-top"><span>{g.genre}</span><span className="status built">Built</span></div><h3>{g.name}</h3><p>{g.description}</p><div className="support-row"><span>Inspired by {g.inspired}</span><span>Original MGLabs remake</span></div><div className="card-actions"><a href={`/remix-vault/${g.slug}.html`}>Play</a></div></article>)}</div></section>
    <section className="retro-bowl-note"><b>Original remakes, not copied games</b><p>Each game uses an original MGLabs name and implementation. The famous game names are shown only to explain the genre inspiration. No original commercial assets, code, characters, music, logos, or levels are bundled.</p></section>
  </div>
}
