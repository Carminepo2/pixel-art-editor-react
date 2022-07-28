import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { DrawingBoardState, DrawingBoardDispatch } from "@/store/drawing-board/drawingBoardStore";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDrawingBoardDispatch: () => DrawingBoardDispatch = useDispatch;
export const useDrawingBoardSelector: TypedUseSelectorHook<DrawingBoardState> = useSelector;
