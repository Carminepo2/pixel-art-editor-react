import Tool from "@/types/tool";
import { useCallback, useEffect } from "react";
import { useDrawingBoardDispatch } from "@/store/drawing-board/hooks";
import { redo, setActiveTool, undo } from "@/store/drawing-board/slices/drawingBoardSlice";
import { KEYBINDINGS } from "@/config/keybindings";

function useSetKeybindings() {
  const dispatch = useDrawingBoardDispatch();

  const keydownListener = useCallback((e: KeyboardEvent) => {
    if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
      if (e.shiftKey) {
        dispatch(redo());
      } else {
        dispatch(undo());
      }
      return;
    }

    if (KEYBINDINGS.hasOwnProperty(e.key)) {
      dispatch(setActiveTool(KEYBINDINGS[e.key as keyof typeof KEYBINDINGS]));
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
