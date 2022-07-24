import { Box } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { drawingBoardStore } from "../store/drawing-board/drawingBoardStore";
import ContextMenu from "./tools/ContextMenu";
import CanvasWrapper from "./canvas/CanvasWrapper";
import Toolbar from "./tools/Toolbar";
import useSetKeybindings from "../hooks/useSetKeybindings";

const DrawingBoard: React.FC = () => {
  return (
    <Provider store={drawingBoardStore}>
      <DrawingBoardWrapper>
        <CanvasWrapper />
        <ContextMenu />
        <Toolbar />
      </DrawingBoardWrapper>
    </Provider>
  );
};

const DrawingBoardWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useSetKeybindings();

  return <Box position="relative">{children}</Box>;
};

export default DrawingBoard;
