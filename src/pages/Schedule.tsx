import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import { AWOS, DAYS, SLOTS } from "../data";

type Pick = { awoId: string; iso: string; slot: string } | null;

const blockedSlots: Record<string, string> = {
  "2026-11-26": "Ọ̀sẹ̀ Ifá",
  "2026-11-29": "Temple vigil",
  "2026-11-24|09:30": "Omi tútù preparation",
};

export default function Schedule() {
  const [awoId, setAwoId] = useState("all");
  const [picked, setPicked] = useState<Pick>({
    awoId: "faleti",
    iso: "2026-11-25",
    slot: "09:30",
  });

  const priests = awoId === "all" ? AWOS : AWOS.filter((a) => a.id === awoId);

  const summary = useMemo(() => {
    if (!picked) return null;
    const slot = SLOTS.find((s) => s.id === picked.slot);
    return {
      awo: AWOS.find((item) => item.id === picked.awoId)!,
      day: DAYS.find((item) => item.iso === picked.iso)!,
      slot,
    };
  }, [picked]);

  return (
    <main className="page">
      <HeroBanner
        compact
        kicker="Weekly Divination Schedule"
        title="Liturgical week of 23–29 November"
        lede="Morning and afternoon oracular hours. Days marked for Ọ̀sẹ̀ Ifá and temple vigils remain closed to public consultation."
      />

      <p className="section-label">Priest</p>
      <div className="pills">
        <button
          className={`pill${awoId === "all" ? " is-on" : ""}`}
          onClick={() => setAwoId("all")}
        >
          All consecrated Awos
        </button>
        {AWOS.map((item) => (
          <button
            key={item.id}
            className={`pill${awoId === item.id ? " is-on" : ""}`}
            onClick={() => setAwoId(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {priests.map((priest) => (
        <section key={priest.id} className="card panel" style={{ marginBottom: 16 }}>
          <div className="panel-head">
            <div className="priest-id">
              <img className="awo-thumb" src={priest.photo} alt="" />
              <h2>{priest.name}</h2>
            </div>
            <span className="muted">{priest.lineage}</span>
          </div>
          <div className="week">
            <div className="lane">Period</div>
            {DAYS.map((item) => (
              <div className="week-head" key={item.iso}>
                <small>{item.weekday}</small>
                <strong>{item.day}</strong>
              </div>
            ))}
            <div className="lane">Morning</div>
            {DAYS.map((item) => (
              <div className="cell" key={`${item.iso}-am`}>
                {item.blocked ? (
                  <button className="slot-chip is-blocked" disabled>
                    {item.blocked.split("—")[0]}
                  </button>
                ) : (
                  SLOTS.filter((s) => s.period === "morning").map((s) => {
                    const key = `${item.iso}|${s.id}`;
                    const blocked = blockedSlots[key];
                    const selected =
                      picked?.awoId === priest.id &&
                      picked.iso === item.iso &&
                      picked.slot === s.id;
                    return (
                      <button
                        key={s.id}
                        disabled={Boolean(blocked)}
                        className={`slot-chip${selected ? " is-selected" : ""}${blocked ? " is-blocked" : ""}`}
                        onClick={() =>
                          setPicked({ awoId: priest.id, iso: item.iso, slot: s.id })
                        }
                      >
                        {blocked ?? s.label}
                      </button>
                    );
                  })
                )}
              </div>
            ))}
            <div className="lane">Afternoon</div>
            {DAYS.map((item) => (
              <div className="cell" key={`${item.iso}-pm`}>
                {item.blocked ? (
                  <button className="slot-chip is-blocked" disabled>
                    Closed
                  </button>
                ) : (
                  SLOTS.filter((s) => s.period === "afternoon").map((s) => {
                    const selected =
                      picked?.awoId === priest.id &&
                      picked.iso === item.iso &&
                      picked.slot === s.id;
                    return (
                      <button
                        key={s.id}
                        className={`slot-chip${selected ? " is-selected" : ""}`}
                        onClick={() =>
                          setPicked({ awoId: priest.id, iso: item.iso, slot: s.id })
                        }
                      >
                        {s.label}
                      </button>
                    );
                  })
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {summary && (
        <aside className="card float-card">
          <img className="awo-thumb" src={summary.awo.photo} alt="" />
          <div>
            <p className="section-label">Selected liturgical hour</p>
            <strong>
              {summary.awo.name} · {summary.day.weekday} {summary.day.day} ·{" "}
              {summary.slot?.label}
            </strong>
            <div className="muted">Private 1-to-1 · $75 USD · no recording</div>
          </div>
          <Link to="/" className="btn btn-dark">
            Continue to confirmation
          </Link>
        </aside>
      )}
    </main>
  );
}
