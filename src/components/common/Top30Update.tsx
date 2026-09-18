import top30 from '../../data/top30-v22.json';

export default function Top30Update() {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">V22 UPDATE</span>
          <h2>30 New MGLabs Features</h2>
          <p>Discovery, personalization, multiplayer, learning, building, and community upgrades.</p>
        </div>
      </div>
      <div className="top30-grid">
        {top30.map((f:any) => (
          <article className="top30-card" key={f.id}>
            <div className="top30-card-head">
              <span>#{String(f.id).padStart(2,'0')} · {f.area}</span>
              <b>{f.status}</b>
            </div>
            <h3>{f.name}</h3>
            <p>{f.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
