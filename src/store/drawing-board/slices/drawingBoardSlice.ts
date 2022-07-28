import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DrawingBoardState } from "../drawingBoardStore";
import { PixelGrid, PixelPosition } from "../../../types/pixel";
import createPixelGrid from "../../../utils/createPixelGrid";
import CONSTANTS from "../../../config/constants";
import Tool from "../../../types/tool";
import { loadState } from "../../../utils/browserStorage";
import { minifyHex } from "../../../utils/colors";
import fill from "../../../utils/fill";
import compareArray from "../../../utils/compareArray";
import ColorFillType from "../../../types/fillColor";
import generatePNG from "../../../utils/generatePNG";

interface CounterState {
  pixelGrid: PixelGrid;
  snapshotCursor: number;
  snapshots: Array<PixelGrid>;
  activeTool: Tool;
  selectedPrimaryColor: string;
  selectedSecondaryColor: string;
}

const initialState: CounterState = {
  pixelGrid: loadState() || createPixelGrid(CONSTANTS.STARTING_PIXEL_GRID_WIDTH, CONSTANTS.STARTING_PIXEL_GRID_HEIGHT),
  snapshotCursor: -1,
  snapshots: [],
  activeTool: Tool.Pen,
  selectedPrimaryColor: CONSTANTS.DEFAULT_SELECTED_PRIMARY_COLOR,
  selectedSecondaryColor: CONSTANTS.DEFAULT_SELECTED_SECONDARY_COLOR,
};

export const drawingBoardSlice = createSlice({
  name: "drawingBoard",
  initialState,
  reducers: {
    changePixel: (state, action: PayloadAction<PixelPosition & { withRightClick: boolean }>) => {
      const color = !action.payload.withRightClick ? state.selectedPrimaryColor : state.selectedSecondaryColor;
      switch (state.activeTool) {
        case Tool.Pen:
          state.pixelGrid[action.payload.row][action.payload.col] = color;
          break;
        case Tool.Eraser:
          state.pixelGrid[action.payload.row][action.payload.col] = "";
          break;
        case Tool.Bucket:
          state.pixelGrid = fill(state.pixelGrid, action.payload, color);
          break;
        case Tool.Eyedropper:
          const newColor = state.pixelGrid[action.payload.row][action.payload.col];
          if (newColor) {
            if (action.payload.withRightClick) {
              state.selectedSecondaryColor = newColor;
            } else {
              state.selectedPrimaryColor = newColor;
            }
          }
      }
    },

    setSelectedColor: (state, action: PayloadAction<{ type: ColorFillType; color: string }>) => {
      switch (action.payload.type) {
        case "primary":
          state.selectedPrimaryColor = minifyHex(action.payload.color);
          break;
        case "secondary":
          state.selectedSecondaryColor = minifyHex(action.payload.color);
          break;
      }
    },

    setActiveTool: (state, action: PayloadAction<Tool>) => {
      state.activeTool = action.payload;
    },

    addSnapshot: (state) => {
      if (compareArray(state.pixelGrid, state.snapshots[state.snapshotCursor])) {
        return;
      }

      if (state.snapshotCursor < state.snapshots.length - 1) {
        state.snapshots.splice(state.snapshotCursor + 1);
      }
      state.snapshots.push(state.pixelGrid);
      state.snapshotCursor = state.snapshots.length - 1;
    },

    undo: (state) => {
      if (state.snapshotCursor > 0) {
        state.snapshotCursor--;
        state.pixelGrid = state.snapshots[state.snapshotCursor];
      }
    },

    redo: (state) => {
      if (state.snapshots.length - 1 > state.snapshotCursor) {
        state.snapshotCursor++;
        state.pixelGrid = state.snapshots[state.snapshotCursor];
      }
    },

    clear: (state) => {
      state.pixelGrid = createPixelGrid(CONSTANTS.STARTING_PIXEL_GRID_WIDTH, CONSTANTS.STARTING_PIXEL_GRID_HEIGHT);
      state.snapshots = [];
      state.snapshotCursor = 0;
    },

    download: (state) => {
      const data = generatePNG(state.pixelGrid);
      const link = document.createElement("a");
      link.href = data;
      link.download = "pixel-grid.png";
      link.click();
    },
  },
});

// Actions
export const { changePixel, setActiveTool, setSelectedColor, addSnapshot, undo, redo, clear, download } =
  drawingBoardSlice.actions;

// Selectors
export const selectPixelGrid = (state: DrawingBoardState) => state.drawingBoard.pixelGrid;
export const selectSelectedPrimaryColor = (state: DrawingBoardState) => state.drawingBoard.selectedPrimaryColor;
export const selectSelectedSecondaryColor = (state: DrawingBoardState) => state.drawingBoard.selectedSecondaryColor;
export const selectActiveTool = (state: DrawingBoardState) => state.drawingBoard.activeTool;

export default drawingBoardSlice.reducer;
