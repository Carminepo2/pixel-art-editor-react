import { PixelGrid, PixelPosition } from "@/types/pixel";

//TODO: BETTER PERFORMANCE!!
function fill(pixelGrid: PixelGrid, startingPosition: PixelPosition, color: string) {
  const maxColumn = pixelGrid[0].length - 1;
  const maxRow = pixelGrid.length - 1;

  const pixelGridCopy = JSON.parse(JSON.stringify(pixelGrid));
  const targetColor = pixelGrid[startingPosition.row][startingPosition.col];
  const queue: Array<PixelPosition> = [startingPosition];

  const visited: Array<Array<boolean>> = pixelGrid.map((row) => row.map(() => false));

  console.time();

  while (queue.length > 0) {
    const { row, col } = queue.shift()!;

    if (visited[row][col]) {
      continue;
    }

    pixelGridCopy[row][col] = color;
    visited[row][col] = true;

    const up = row - 1;
    const down = row + 1;
    const left = col - 1;
    const right = col + 1;

    if (up >= 0 && !visited[up][col] && pixelGrid[up][col] === targetColor) {
      queue.push({ row: up, col: col });
    }

    if (down <= maxRow && !visited[down][col] && pixelGrid[down][col] === targetColor) {
      queue.push({ row: down, col: col });
    }

    if (left >= 0 && !visited[row][left] && pixelGrid[row][left] === targetColor) {
      queue.push({ row: row, col: left });
    }

    if (right <= maxColumn && !visited[row][right] && pixelGrid[row][right] === targetColor) {
      queue.push({ row: row, col: right });
    }
  }

  console.timeEnd();

  return pixelGridCopy;
}

export default fill;
