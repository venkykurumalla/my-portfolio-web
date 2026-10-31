export default function SectionHead({ label, title }) {
  return (
    <header className="m-head">
      <span className="m-label"><i aria-hidden="true" />{label}</span>
      <h2 className="m-title display">{title}</h2>
    </header>
  );
}
