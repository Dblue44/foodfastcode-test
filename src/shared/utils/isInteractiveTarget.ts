
export const isInteractiveTarget = (el: HTMLElement | null) => {
  if (!el) return false;
  const tag = el.tagName;
  if (["INPUT", "BUTTON", "A", "SELECT", "TEXTAREA", "LABEL"].includes(tag)) return true;
  if (["SVG", "PATH", "USE"].includes(tag)) return true;
  const role = el.getAttribute("role");
  if (role && ["button", "link", "checkbox", "menuitem"].includes(role)) return true;
  return !!el.closest("button, a, [role='button'], [role='link']");
};