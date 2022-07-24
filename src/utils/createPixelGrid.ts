import { PixelGrid } from "../types/pixel";

function createPixelGrid(width: number, height: number): PixelGrid {
  const pixelGrid: PixelGrid = [];
  for (let y = 0; y < height; y++) {
    const row: string[] = [];
    for (let x = 0; x < width; x++) {
      row.push("");
    }
    pixelGrid.push(row);
  }
  return pixelGrid;
}

export default createPixelGrid;
