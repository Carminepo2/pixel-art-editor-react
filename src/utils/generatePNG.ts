import { hexToRgb } from "@/utils/colors";
import { PixelGrid } from "@/types/pixel";

function generatePNG(data: PixelGrid, scaleFactor: number = 1) {
  const canvas = document.createElement("canvas");
  canvas.width = (data[0]?.length ?? 0) * scaleFactor;
  canvas.height = data.length * scaleFactor;

  const ctx = canvas.getContext("2d");

  if (ctx) {
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        const colorHex = data[y][x];

        if (colorHex) {
          const colorRgb = hexToRgb(data[y][x]);

          ctx.fillStyle = `rgb(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b})`;
          ctx.fillRect(x * scaleFactor, y * scaleFactor, scaleFactor, scaleFactor);
        }
      }
    }
  }

  return canvas.toDataURL("image/png");
}

export default generatePNG;
