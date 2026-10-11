import type {GameEntry} from '../../types/core';
import StatusBadge from '../../components/StatusBadge';

export default function GameDetail({game}:{game:GameEntry}) {
  return <article className="game-detail">
    <div className="game-detail-head">
      <div>
        <h2>{game.name}</h2>
        <p>{game.description}</p>
      </div>
      <StatusBadge status={game.status}/>
    </div>
    <dl>
      <div><dt>Category</dt><dd>{game.category}</dd></div>
      <div><dt>Developer</dt><dd>{game.developer}</dd></div>
      {game.license && <div><dt>License</dt><dd>{game.license}</dd></div>}
      <div><dt>Touch</dt><dd>{game.touch?'Yes':'No / unknown'}</dd></div>
      <div><dt>Controller</dt><dd>{game.controller?'Yes':'No / unknown'}</dd></div>
    </dl>
    <div className="game-actions">
      {game.playUrl && <a href={game.playUrl} target="_blank" rel="noreferrer">Play</a>}
      {game.sourceUrl && <a href={game.sourceUrl} target="_blank" rel="noreferrer">Source</a>}
    </div>
  </article>
}
