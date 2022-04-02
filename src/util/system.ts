export function getSlash() {
  return process.platform === "win32" ? "\\" : "/";
}
