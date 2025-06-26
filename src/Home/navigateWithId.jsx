// navigateWithId.js
export function navigateWithId(navigate, id) {
  navigate("/account", { state: { userId: id } });
}
