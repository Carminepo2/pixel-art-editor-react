import React from "react";
import CONSTANTS from "@/config/constants";
import ReactZoomPanPinch from "@/libs/react-zoom-pan-pinch";
import { useDrawingBoardSelector } from "@/store/drawing-board/hooks";
import { selectPixelGrid } from "@/store/drawing-board/slices/drawingBoardSlice";
import Canvas from "@/components/canvas/Canvas";
import CanvasUnderlay from "@/components/canvas/CanvasUnderlay";

const CanvasWrapper: React.FC = () => {
  const pixelGrid = useDrawingBoardSelector(selectPixelGrid);

  return (
    <div className="h-screen w-screen" style={{ backgroundColor: CONSTANTS.BACKGROUND_COLOR }}>
      <ReactZoomPanPinch>
        <div className="flex justify-center items-center h-screen w-screen relative">
          <div className="absolute">
            <CanvasUnderlay pixelGrid={pixelGrid} />
          </div>
          <div className="absolute">
            <Canvas pixelGrid={pixelGrid} />
          </div>
        </div>
      </ReactZoomPanPinch>
    </div>
  );
};

export default CanvasWrapper;
