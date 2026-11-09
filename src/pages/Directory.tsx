import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import { AWOS, FEE, LANGUAGES, LINEAGES } from "../data";
import type { Language, Lineage } from "../types";

export default function Directory() {
  const [lineage, setLineage] = useState<Lineage | "All">("All");
  const [language, setLanguage] = useState<Language | "All">("All");

  const list = useMemo(
    () =>
      AWOS.filter(
        (awo) =>
          (lineage === "All" || awo.lineage === lineage) &&
          (language === "All" || awo.languages.includes(language))
      ),
    [lineage, language]
  );

  return (
    <main className="page">
      <HeroBanner
        compact
        kicker="Consecrated Awos Directory"
        title="Initiated priests of the 256 Odù"
        lede="Exclusive register of Awos and Babalawos consecrated into Ifá. No uninitiated readers, mediums, or commercial diviners are listed."
      />

      <p className="section-label">Lineage</p>
      <div className="pills">
        <button
          className={`pill${lineage === "All" ? " is-on" : ""}`}
          onClick={() => setLineage("All")}
        >
          All lineages
        </button>
        {LINEAGES.map((item) => (
          <button
            key={item}
            className={`pill${lineage === item ? " is-on" : ""}`}
            onClick={() => setLineage(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="section-label">Language</p>
      <div className="pills">
        <button
          className={`pill${language === "All" ? " is-on" : ""}`}
          onClick={() => setLanguage("All")}
        >
          All languages
        </button>
        {LANGUAGES.map((item) => (
          <button
            key={item}
            className={`pill${language === item ? " is-on" : ""}`}
            onClick={() => setLanguage(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="awo-grid">
        {list.map((awo) => (
          <article key={awo.id} className="card awo-card">
            <img className="awo-cover" src={awo.photo} alt={awo.name} />
            <p className="section-label">{awo.title}</p>
            <h3>{awo.name}</h3>
            <div className="meta-row">
              <span className="chip">{awo.years} years of priesthood</span>
              <span className="chip">Verified {awo.lineage}</span>
              <span className="chip">{awo.languages.join(" · ")}</span>
            </div>
            <p>{awo.bio}</p>
            <div className="card-actions">
              <div>
                <div className="muted">Next liturgical hour</div>
                <strong>{awo.nextSlot}</strong>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="muted">Fixed honorarium</div>
                <strong>${FEE} USD</strong>
              </div>
            </div>
            <Link to="/" className="btn btn-dark" style={{ marginTop: 16, width: "100%" }}>
              Book this Awo
            </Link>
          </article>
        ))}
      </div>

      {list.length === 0 && (
        <p className="muted">No consecrated Awo matches these filters.</p>
      )}

      <section className="card canon">
        <p className="section-label">Canonical rigor</p>
        <h2>Why only consecrated Ifá priesthood</h2>
        <p className="muted">
          Ifá is not a generic oracle. A Babalawo or Awo is initiated into the
          full computation of the 256 Odù, the handling of ikin and ọ̀pẹ̀lẹ̀, and
          the ethical silence of the shrine. This directory excludes anyone who
          has not completed that consecration. Lineage is verified against Ilé-Ifẹ̀,
          Òṣogbo, Ọ̀yọ́ Traditional, and Matanzas / Abeokuta houses. Honoraria are
          fixed so the Odù is never auctioned.
        </p>
      </section>
    </main>
  );
}
