import { Box, Button } from "@mui/material";
import React from "react";
import CONSTANTS from "../../config/constants";
import { useDrawingBoardDispatch } from "../../store/drawing-board/hooks";
import { changePixel } from "../../store/drawing-board/slices/drawingBoardSlice";

interface Props {
  colorHex: string;
  rowNum: number;
  colNum: number;
}

const Pixel: React.FC<Props> = ({ colorHex, rowNum, colNum }) => {
  const dispatch = useDrawingBoardDispatch();

  function handleClick(e: React.MouseEvent<HTMLDivElement>, clicking: boolean) {
    //@ts-ignore
    const isMouseDownWhileHovering = [1, 2, 3].includes(e.buttons);
    const withRightClick = e.buttons === 2;

    if ((isMouseDownWhileHovering || clicking) && !e.ctrlKey) {
      dispatch(changePixel({ col: colNum, row: rowNum, withRightClick }));
    }
  }

  return (
    <div
      onPointerDown={(e) => handleClick(e, true)}
      onPointerEnter={(e) => handleClick(e, false)}
      style={{
        backgroundColor: colorHex ? `#${colorHex}` : "transparent",
        height: CONSTANTS.PIXEL_SIZE,
        width: CONSTANTS.PIXEL_SIZE,
      }}
    />
  );
};

export default React.memo(Pixel);
