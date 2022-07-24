import { Stack } from "@mui/material";
import React from "react";
import { PixelGrid } from "../../types/pixel";
import compareArray from "../../utils/compareArray";
import Pixel from "./Pixel";

interface Props {
  pixels: PixelGrid[0];
  rowNum: number;
}

const PixelRow: React.FC<Props> = ({ pixels, rowNum }) => {
  return (
    <Stack direction="row">
      {pixels.map((pixel, colIndex) => (
        <Pixel key={colIndex} colorHex={pixel} rowNum={rowNum} colNum={colIndex} />
      ))}
    </Stack>
  );
};

export default React.memo(PixelRow, (prevProps, nextProps) => {
  return compareArray(prevProps.pixels, nextProps.pixels) && prevProps.rowNum === nextProps.rowNum;
});
