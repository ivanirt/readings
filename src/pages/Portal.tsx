import { useState } from "react";
import HeroBanner from "../components/HeroBanner";
import { AWOS, BOOKINGS } from "../data";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function Portal() {
  const [active, setActive] = useState(true);
  const [capacity, setCapacity] = useState(5);
  const [buffer, setBuffer] = useState(15);
  const [itadogun, setItadogun] = useState(true);
  const [hours, setHours] = useState(
    weekdays.map((day) => ({ day, start: "09:00", end: "16:30", open: day !== "Thursday" }))
  );

  return (
    <main className="page">
      <HeroBanner
        compact
        kicker="Awo Schedule & Sanctuary Settings"
        title="Private control for the consecrated Awo"
        lede="Availability, purification buffers, spiritual capacity, and liturgical closures. This panel is not visible to consultants."
      >
        <div className="hero-actions">
          <img className="awo-thumb lg" src={AWOS[0].photo} alt={AWOS[0].name} />
          <div className="switch">
            <button
              className={`toggle${active ? " is-on" : ""}`}
              aria-label="Availability"
              onClick={() => setActive((v) => !v)}
            />
            <span>{active ? "Active & Consecrated" : "Sanctuary paused"}</span>
          </div>
        </div>
      </HeroBanner>

      <div className="settings-grid">
        <section className="card panel">
          <h2>Daily hours of attention</h2>
          <p className="muted">
            Monday to Friday. A {buffer}-minute purification buffer is inserted
            after each session for orations, omi tútù, and preparation of the
            oracular table.
          </p>
          <div className="hours">
            {hours.map((row, index) => (
              <div className="hour-row" key={row.day}>
                <span>{row.day}</span>
                <input
                  type="time"
                  value={row.start}
                  onChange={(e) => {
                    const next = [...hours];
                    next[index] = { ...row, start: e.target.value };
                    setHours(next);
                  }}
                />
                <input
                  type="time"
                  value={row.end}
                  onChange={(e) => {
                    const next = [...hours];
                    next[index] = { ...row, end: e.target.value };
                    setHours(next);
                  }}
                />
                <button
                  className={`pill${row.open ? " is-on" : ""}`}
                  onClick={() => {
                    const next = [...hours];
                    next[index] = { ...row, open: !row.open };
                    setHours(next);
                  }}
                >
                  {row.open ? "Open" : "Closed"}
                </button>
              </div>
            ))}
          </div>
          <p className="hint">
            Thursday defaults to Ọ̀sẹ̀ Ifá closure unless you reopen the shrine.
          </p>
        </section>

        <div>
          <section className="card panel">
            <h2>Spiritual capacity</h2>
            <p className="muted">
              Maximum consultations per day to protect the priest’s spiritual
              energy.
            </p>
            <div className="stat" style={{ marginTop: 16 }}>
              <strong>{capacity}</strong>
              <span className="muted">sessions / day</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              style={{ width: "100%", marginTop: 14 }}
            />
            <p className="hint">Canonical ceiling: 5. Cannot be raised.</p>
          </section>

          <section className="card panel" style={{ marginTop: 16 }}>
            <h2>Purification buffer</h2>
            <div className="stat">
              <strong>{buffer} min</strong>
              <span className="muted">orations · omi tútù · table</span>
            </div>
            <div className="pills" style={{ marginTop: 14 }}>
              {[10, 15, 20].map((mins) => (
                <button
                  key={mins}
                  className={`pill${buffer === mins ? " is-on" : ""}`}
                  onClick={() => setBuffer(mins)}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </section>

          <section className="card panel" style={{ marginTop: 16 }}>
            <div className="switch">
              <button
                className={`toggle${itadogun ? " is-on" : ""}`}
                aria-label="Block Itadogun feasts"
                onClick={() => setItadogun((v) => !v)}
              />
              <span>Block Ìtádogún & traditional feasts</span>
            </div>
            <p className="hint">
              When enabled, public booking is refused on Ìtádogún, Ọ̀sẹ̀ Ifá, and
              house feast days.
            </p>
          </section>
        </div>
      </div>

      <section className="card panel" style={{ marginTop: 18 }}>
        <h2>Upcoming confirmed consultations</h2>
        <p className="muted">Natal data verified. Private virtual rooms remain sealed.</p>
        <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Reference</th>
              <th>Consultant</th>
              <th>Verified natal record</th>
              <th>Hour</th>
              <th>Status</th>
              <th>Sanctuary</th>
            </tr>
          </thead>
          <tbody>
            {BOOKINGS.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.consultant}</td>
                <td>{row.natal}</td>
                <td>
                  {row.date}
                  <br />
                  {row.slot}
                </td>
                <td>
                  <span className={`status${row.status === "Preparing" ? " prep" : ""}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <a href={`#${row.room}`}>Enter private room</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </section>
    </main>
  );
}
