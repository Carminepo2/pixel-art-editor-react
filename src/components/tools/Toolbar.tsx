import { ButtonGroup, IconButton, Stack } from "@mui/material";
import React from "react";
import ColorPicker from "./ColorPicker";
import DownloadIcon from "@mui/icons-material/Download";
import { clear, redo, selectPixelGrid, undo } from "../../store/drawing-board/slices/drawingBoardSlice";
import { useDrawingBoardDispatch, useDrawingBoardSelector } from "../../store/drawing-board/hooks";
import generatePNG from "../../utils/generatePNG";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import DeleteIcon from "@mui/icons-material/Delete";
import ToolsButtonGroup from "./ToolsButtonGroup";

const Toolbar: React.FC = () => {
  const pixelGrid = useDrawingBoardSelector(selectPixelGrid);
  const dispatch = useDrawingBoardDispatch();

  const handleDownload = () => {
    const data = generatePNG(pixelGrid);
    const link = document.createElement("a");
    link.href = data;
    link.download = "pixel-grid.png";
    link.click();
  };

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };

  const handleClear = () => {
    confirm("Are you sure you want to clear the canvas?") && dispatch(clear());
  };

  return (
    <Stack position="absolute" spacing={2} sx={{ top: 32, left: 32, backgroundColor: "white", padding: 1 }}>
      <ToolsButtonGroup />

      <ButtonGroup>
        <IconButton onClick={handleUndo} aria-label="undo">
          <UndoIcon />
        </IconButton>
        <IconButton onClick={handleRedo} aria-label="redo">
          <RedoIcon />
        </IconButton>
      </ButtonGroup>

      <IconButton onClick={handleClear} aria-label="clear">
        <DeleteIcon />
      </IconButton>

      <ColorPicker />

      <IconButton onClick={handleDownload} aria-label="download">
        <DownloadIcon />
      </IconButton>
    </Stack>
  );
};

export default Toolbar;
