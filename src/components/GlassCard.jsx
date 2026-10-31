/**
 * Liquid-glass surface. `flat` drops the backdrop blur (used for grids and moving cards,
 * where stacked blurs are what makes scrolling janky); the highlight border stays.
 */
export default function GlassCard({
  as: Tag = "div",
  className = "",
  large = false,
  flat = false,
  hover = false,
  children,
  ...rest
}) {
  return (
    <Tag
      className={`glass ${large ? "glass--lg" : ""} ${flat ? "glass--flat" : ""} ${hover ? "glass--hover" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
