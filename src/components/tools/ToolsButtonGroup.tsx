import React from "react";
import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useDrawingBoardSelector, useDrawingBoardDispatch } from "../../store/drawing-board/hooks";
import { selectActiveTool, setActiveTool } from "../../store/drawing-board/slices/drawingBoardSlice";
import EditIcon from "@mui/icons-material/Edit";
import RemoveIcon from "@mui/icons-material/Remove";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import Tool from "../../types/tool";
import ColorizeIcon from "@mui/icons-material/Colorize";
import { styled } from "@mui/material/styles";
import EraserIcon from "./EraserIcon";

const ToolsButtonGroup: React.FC = () => {
  const activeTool = useDrawingBoardSelector(selectActiveTool);
  const dispatch = useDrawingBoardDispatch();

  const handleToolChange = (_event: any, value: Tool) => {
    dispatch(setActiveTool(value));
  };

  return (
    <Stack direction="row">
      <ToggleButtonGroup orientation="vertical" value={activeTool} exclusive onChange={handleToolChange}>
        <ToggleButton value={Tool.Pen} aria-label="pen">
          <EditIcon />
        </ToggleButton>
        <ToggleButton value={Tool.Eraser} aria-label="eraser">
          <EraserIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup orientation="vertical" value={activeTool} exclusive onChange={handleToolChange}>
        <ToggleButton value={Tool.Bucket} aria-label="bucket">
          <FormatColorFillIcon />
        </ToggleButton>
        <ToggleButton value={Tool.Eyedropper} aria-label="eyedropper">
          <ColorizeIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default ToolsButtonGroup;
