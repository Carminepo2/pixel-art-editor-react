import React from "react";
import { PixelGrid } from "@/types/pixel";
import PixelRow from "@/components/canvas/PixelRow";

interface Props {
  pixelGrid: PixelGrid;
}

const Canvas: React.FC<Props> = ({ pixelGrid }) => {
  return (
    <>
      {pixelGrid.map((row: Array<string>, rowIndex: number) => (
        <PixelRow pixels={row} rowNum={rowIndex} key={rowIndex} />
      ))}
    </>
  );
};

export default Canvas;
