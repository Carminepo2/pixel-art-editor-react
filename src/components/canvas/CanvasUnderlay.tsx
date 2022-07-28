import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import CONSTANTS from "../../config/constants";
import { PixelGrid } from "../../types/pixel";

interface Props {
  pixelGrid: PixelGrid;
}

const CanvasUnderlay: React.FC<Props> = ({ pixelGrid }) => {
  const underlayPixelGrid = pixelGrid.map((row: Array<string>, outerIndex: number) => {
    return row.map((_: string, index) => {
      return CONSTANTS.CANVAS_UNDERLAY_COLORS[(index + (outerIndex % 2)) % 2];
    });
  });

  return (
    <>
      {underlayPixelGrid.map((row: Array<string>, index: number) => (
        <div className="flex" key={index}>
          {row.map((pixel, pixelIndex) => (
            <div
              key={pixelIndex}
              style={{ backgroundColor: pixel, height: CONSTANTS.PIXEL_SIZE, width: CONSTANTS.PIXEL_SIZE }}
            />
          ))}
        </div>
      ))}
    </>
  );
};

// It only rerenders when the pixelGrid size changes
export default React.memo(CanvasUnderlay, (prevProps, nextProps) => {
  return (
    prevProps.pixelGrid[0]?.length === nextProps.pixelGrid[0]?.length &&
    prevProps.pixelGrid.length === nextProps.pixelGrid.length
  );
});
