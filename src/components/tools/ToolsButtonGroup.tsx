import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useDrawingBoardSelector, useDrawingBoardDispatch } from "@/store/drawing-board/hooks";
import { selectActiveTool, setActiveTool } from "@/store/drawing-board/slices/drawingBoardSlice";
import EditIcon from "@mui/icons-material/Edit";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import Tool from "@/types/tool";
import ColorizeIcon from "@mui/icons-material/Colorize";
import EraserIcon from "@/components/tools/EraserIcon";

const ToolsButtonGroup: React.FC = () => {
  const activeTool = useDrawingBoardSelector(selectActiveTool);
  const dispatch = useDrawingBoardDispatch();

  const handleToolChange = (_event: any, value: Tool) => {
    dispatch(setActiveTool(value));
  };

  return (
    <div className="flex">
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
    </div>
  );
};

export default ToolsButtonGroup;
