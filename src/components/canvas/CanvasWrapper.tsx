import { Box, Stack } from "@mui/material";
import React from "react";
import CONSTANTS from "../../config/constants";
import ReactZoomPanPinch from "../../libs/react-zoom-pan-pinch";
import { useDrawingBoardSelector } from "../../store/drawing-board/hooks";
import { selectPixelGrid } from "../../store/drawing-board/slices/drawingBoardSlice";
import Canvas from "./Canvas";
import CanvasUnderlay from "./CanvasUnderlay";

const CanvasWrapper: React.FC = () => {
  const pixelGrid = useDrawingBoardSelector(selectPixelGrid);

  return (
    <Box sx={{ height: "100vh", width: "100vw", backgroundColor: CONSTANTS.BACKGROUND_COLOR }}>
      <ReactZoomPanPinch>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100vh", width: "100vw", position: "relative" }}
        >
          <Box sx={{ position: "absolute" }}>
            <CanvasUnderlay pixelGrid={pixelGrid} />
          </Box>
          <Box sx={{ position: "absolute" }}>
            <Canvas pixelGrid={pixelGrid} />
          </Box>
        </Stack>
      </ReactZoomPanPinch>
    </Box>
  );
};

export default CanvasWrapper;
