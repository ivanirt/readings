import { FormEvent, useMemo, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import { AWOS, DAYS, FEE, SLOTS } from "../data";

export default function Book() {
  const [awoId, setAwoId] = useState(AWOS[0].id);
  const [dayIso, setDayIso] = useState("2026-11-25");
  const [slotId, setSlotId] = useState("09:30");
  const [pay, setPay] = useState<"card" | "apple" | "crypto">("apple");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    intention: "",
  });

  const awo = AWOS.find((item) => item.id === awoId)!;
  const day = DAYS.find((item) => item.iso === dayIso)!;
  const slot = SLOTS.find((item) => item.id === slotId)!;

  const natalReady = useMemo(
    () =>
      Boolean(
        form.name &&
          form.email &&
          form.birthDate &&
          form.birthTime &&
          form.birthPlace
      ),
    [form]
  );

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!natalReady || day.blocked) return;
    setOpen(true);
  }

  return (
    <main className="page">
      <HeroBanner
        kicker="Canonical Ifá Oracle · Ilé-Ifẹ̀ Protocol"
        title="Book an Ifá Divination Consultation"
        lede="Sacred Ẹ̀rìndínlógún consultation with initiated Babalawos and consecrated Awos. Governed by traditional Yorùbá canonical rigor and absolute confidentiality."
      >
        <div className="hero-price">
          <strong>${FEE}.00 USD</strong>
          <span>Global consecrated rate</span>
        </div>
      </HeroBanner>

      <section className="card protocol">
        <p className="section-label">Liturgical Protocol</p>
        <h2>Mandatory Reading Protocol Before Booking</h2>
        <p className="note">
          These conditions are non-negotiable. A session cannot be opened if any
          item is incomplete or refused.
        </p>
        <div className="protocol-grid">
          <article className="protocol-item">
            <div className="num">01</div>
            <h3>Exact Birth Itinerary</h3>
            <p>
              Date, exact time to the minute, and place of birth are required.
              Memory, estimates, or “around” times are not accepted.
            </p>
          </article>
          <article className="protocol-item">
            <div className="num">02</div>
            <h3>Exact Birth Data</h3>
            <p>
              Provide documented natal records, not recollection. Memory
              substitutes delay the Odù until a certified chart can be verified.
            </p>
          </article>
          <article className="protocol-item">
            <div className="num">03</div>
            <h3>48-Hour Cancellation</h3>
            <p>
              Rescheduling or cancellation requires a minimum of 48 hours.
              Later changes forfeit the offering as the shrine has already been
              prepared.
            </p>
          </article>
          <article className="protocol-item">
            <div className="num">04</div>
            <h3>Dual Oracle Nature (Iré & Osobo)</h3>
            <p>
              Ifá dictates truths. The reading may reveal blessing (Iré) or
              warnings and taboos (Osobo / Èèwò). Both are canonical speech.
            </p>
          </article>
          <article className="protocol-item">
            <div className="num">05</div>
            <h3>Private 1-to-1 Consultation</h3>
            <p>
              Strictly private. No intermediaries, companions, translators, or
              analog/digital recording of any kind.
            </p>
          </article>
        </div>
      </section>

      <form onSubmit={submit}>
        <div className="layout-2">
          <div>
            <section className="card panel">
              <div className="panel-head">
                <div>
                  <p className="step">Step 01 · Lineage</p>
                  <h2>Select Consecrated Awo</h2>
                </div>
              </div>
              <p className="muted">
                Each Babalawo listed here has undergone initiation into the
                computation of the 256 Odù Ifá.
              </p>
              <div className="awo-list" style={{ marginTop: 14 }}>
                {AWOS.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={`awo-option${awoId === item.id ? " is-selected" : ""}`}
                    onClick={() => setAwoId(item.id)}
                  >
                    <span className="radio" />
                    <img className="awo-thumb" src={item.photo} alt="" />
                    <span>
                      <h3>{item.name}</h3>
                      <span className="badge">{item.years} years consecrated</span>
                      <p>
                        {item.lineage} · {item.languages.join(" / ")} · Next:{" "}
                        {item.nextSlot}
                      </p>
                      <p>{item.bio}</p>
                    </span>
                    <span className="fee">${FEE}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="card panel" style={{ marginTop: 16 }}>
              <div className="panel-head">
                <div>
                  <p className="step">Step 02 · Liturgical hour</p>
                  <h2>Divination Date & Slot</h2>
                </div>
              </div>
              <div className="dates">
                {DAYS.map((item) => (
                  <button
                    type="button"
                    key={item.iso}
                    disabled={Boolean(item.blocked)}
                    className={`day${dayIso === item.iso ? " is-selected" : ""}${item.blocked ? " is-blocked" : ""}`}
                    onClick={() => !item.blocked && setDayIso(item.iso)}
                    title={item.blocked}
                  >
                    <small>{item.weekday}</small>
                    <strong>{item.day}</strong>
                    <small>{item.month}</small>
                  </button>
                ))}
              </div>
              <div className="slots">
                {SLOTS.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={`slot${slotId === item.id ? " is-selected" : ""}`}
                    onClick={() => setSlotId(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {day.blocked && (
                <p className="hint">
                  This day is ritually closed: {day.blocked}
                </p>
              )}
            </section>
          </div>

          <aside className="card order">
            <img className="order-photo" src={awo.photo} alt={awo.name} />
            <p className="section-label">Canonical Offering</p>
            <h2>Consultation Order</h2>
            <div className="order-row">
              <span>Consecrated Awo</span>
              <strong>{awo.name}</strong>
            </div>
            <div className="order-row">
              <span>Session</span>
              <strong>
                {day.weekday} {day.day} · {slot.label}
              </strong>
            </div>
            <div className="order-row">
              <span>Sanctuary</span>
              <strong>{awo.sanctuary}</strong>
            </div>
            <div className="order-row">
              <span>Sacred Ifá Divination Consultation</span>
              <strong>${FEE}.00</strong>
            </div>
            <div className="divider" />
            <div className="total">
              <span>Total Offering Exchange</span>
              <strong>${FEE}.00</strong>
            </div>
            <div className="pays">
              <button
                type="button"
                className={`pay${pay === "card" ? " is-selected" : ""}`}
                onClick={() => setPay("card")}
              >
                Card
              </button>
              <button
                type="button"
                className={`pay${pay === "apple" ? " is-selected" : ""}`}
                onClick={() => setPay("apple")}
              >
                Apple Pay
              </button>
              <button
                type="button"
                className={`pay${pay === "crypto" ? " is-selected" : ""}`}
                onClick={() => setPay("crypto")}
              >
                Crypto
              </button>
            </div>
            <button className="btn btn-dark" style={{ width: "100%" }} disabled={!natalReady}>
              Pay ${FEE}.00 & Confirm Booking
            </button>
            <p className="secure">
              Canonical-grade encryption · Odù seal of Ifá · No recording
            </p>
          </aside>
        </div>

        <section className="card dossier">
          <p className="section-label">Step 03 · Consultante</p>
          <h2>Required Natal Dossier</h2>
          <p className="muted">
            Submit documented natal records only. Approximate memory of birth
            hour is refused; the Odù cannot be seated on an unverified chart.
          </p>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">Full legal name</label>
              <input
                id="name"
                placeholder="e.g. Olúwapẹ́lúmi Reyes Adeyemi"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="email">Direct email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@sanctuary.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="phone">WhatsApp / phone</label>
              <input
                id="phone"
                placeholder="+1 (555) 018-3314"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="birthDate">Exact date of birth</label>
              <input
                id="birthDate"
                type="date"
                value={form.birthDate}
                onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="birthTime">Exact time of birth (to the minute)</label>
              <input
                id="birthTime"
                type="time"
                value={form.birthTime}
                onChange={(e) => setForm({ ...form, birthTime: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="birthPlace">Place of birth (city, country)</label>
              <input
                id="birthPlace"
                placeholder="e.g. Salvador da Bahia, Brazil"
                value={form.birthPlace}
                onChange={(e) => setForm({ ...form, birthPlace: e.target.value })}
                required
              />
            </div>
            <div className="field full">
              <label htmlFor="intention">Intention (context, not the question)</label>
              <textarea
                id="intention"
                placeholder="State only clarifying viscera: dreams, sudden illness, lineage, or pivotal decisions."
                value={form.intention}
                onChange={(e) => setForm({ ...form, intention: e.target.value })}
              />
            </div>
          </div>
          <div className="notice">
            <strong>Ritual Environment Notice. </strong>
            The consultant must be alone during the live oracular session. Keep
            the space clean, the camera at eye level, and analog or digital
            recording devices powered off. Translation by a third party is
            forbidden.
          </div>
        </section>
      </form>

      <div className="commitments">
        <article>
          <h3>48-hour Cancellation</h3>
          <p>
            Changes require forty-eight hours. After that threshold the shrine
            offering is retained.
          </p>
        </article>
        <article>
          <h3>Birth Chart Integrity</h3>
          <p>
            Exact minute and place only. Recollection is not a natal record and
            will not seat the Odù.
          </p>
        </article>
        <article>
          <h3>Private 1-on-1 Data</h3>
          <p>
            No companions, intermediaries, or translators. The speech of Ifá
            remains inside the sealed room.
          </p>
        </article>
        <article>
          <h3>Absolute Confidentiality</h3>
          <p>
            Analog and digital recording are forbidden. The Awo does not archive
            the voice of Ọ̀rúnmìlà beyond the session.
          </p>
        </article>
      </div>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="card modal" onClick={(e) => e.stopPropagation()}>
            <p className="kicker">Odù sealed</p>
            <h2>Booking confirmed</h2>
            <p className="muted">
              {form.name || "Consultant"} is seated with {awo.name} on {day.weekday}{" "}
              {day.day} at {slot.label}. A private sanctuary link will arrive by
              encrypted mail. Recording remains prohibited.
            </p>
            <button
              className="btn btn-dark"
              style={{ marginTop: 18 }}
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
