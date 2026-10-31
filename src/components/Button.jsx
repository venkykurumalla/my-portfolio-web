/** Pill button/link. Variants: primary, glass, icon. Hover feedback is CSS-only (transform + opacity). */
export default function Button({ as: Tag = "a", variant = "glass", className = "", children, ...rest }) {
  const cls = variant === "icon" ? "btn btn-glass btn-icon" : `btn btn-${variant}`;
  return (
    <Tag className={`${cls} ${className}`} {...rest}>
      <span className="inline-flex items-center gap-2.5">{children}</span>
    </Tag>
  );
}
