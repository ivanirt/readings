import type { ReactNode } from "react";

type Props = {
  kicker: string;
  title: string;
  lede?: string;
  compact?: boolean;
  children?: ReactNode;
};

export default function HeroBanner({
  kicker,
  title,
  lede,
  compact,
  children,
}: Props) {
  return (
    <section className={`hero${compact ? " is-compact" : ""}`}>
      <img src="/images/banner-shrine.jpg" alt="Ifá shrine table with opon Ifá tray" />
      <div className="hero-overlay">
        <p className="kicker kicker-light">{kicker}</p>
        <h1>{title}</h1>
        {lede && <p className="hero-lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
