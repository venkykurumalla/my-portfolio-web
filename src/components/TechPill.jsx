import { dev, logos } from "./skillData";

export default function Pill({ name }) {
  const logo = logos[name];
  return (
    <span className="chip !px-4 !py-2.5 !text-[0.9rem]">
      {logo && (
        <img src={dev(logo.slug)} alt="" width="20" height="20" loading="lazy" decoding="async"
             className={logo.mono ? "logo-mono h-5 w-5" : "h-5 w-5"} onError={(e) => { e.currentTarget.style.display = "none"; }} />
      )}
      {name}
    </span>
  );
}

