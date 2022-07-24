import { useCallback, useEffect } from "react";
import { useDrawingBoardDispatch } from "../store/drawing-board/hooks";
import { redo, undo } from "../store/drawing-board/slices/drawingBoardSlice";

function useSetKeybindings() {
  const dispatch = useDrawingBoardDispatch();

  const keydownListener = useCallback((e: KeyboardEvent) => {
    if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
      if (e.shiftKey) {
        dispatch(redo());
      } else {
        dispatch(undo());
      }
    }
  }, []);

  const keyupListener = useCallback((e: KeyboardEvent) => {}, []);

  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true);
    window.addEventListener("keyup", keyupListener, true);

    return () => {
      window.removeEventListener("keydown", keydownListener, true);
      window.removeEventListener("keyup", keyupListener, true);
    };
  }, [keyupListener, keydownListener]);
}

export default useSetKeybindings;
