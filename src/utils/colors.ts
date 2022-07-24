export function hexToRgb(hex: string) {
  const code = hex.slice(1);
  const sliceFactor = code.length / 3;

  function hexToInt(hex: string) {
    return parseInt(hex, 16);
  }

  const r = hexToInt(code.slice(0, sliceFactor));
  const g = hexToInt(code.slice(sliceFactor, sliceFactor * 2));
  const b = hexToInt(code.slice(sliceFactor * 2));

  return { r, g, b };
}

export function minifyHex(hex: string): string {
  let newHex = hex.replace(/^#/, "");

  if (newHex.length === 6) {
    let r = newHex.slice(0, 2);
    let g = newHex.slice(2, 4);
    let b = newHex.slice(4);

    if (r[0] === r[1] && g[0] === g[1] && b[0] === b[1]) {
      newHex = r[0] + g[0] + b[0];
    }
  }

  return newHex;
}

export function normalizeHex(hex: string): string {
  let normalizedHex = hex;

  if (hex.length === 3) {
    normalizedHex = normalizedHex.replace(/(.)/g, "$1$1");
  }

  return "#" + normalizedHex;
}
