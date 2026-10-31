// Liquid aurora: four colour layers whose blobs slowly morph (transform only). The active
// section decides which colours are visible, so the whole background shifts as you scroll.
const colours = ["blue", "violet", "cyan", "pink"];

export default function MobileBackdrop({ section }) {
  return (
    <div className="m-aurora" data-sec={section} aria-hidden="true">
      {colours.map((c) => (
        <div key={c} className={`m-blob m-blob--${c}`}>
          <span />
        </div>
      ))}
    </div>
  );
}
