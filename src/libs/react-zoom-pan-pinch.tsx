import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import React from "react";
import setCursorStyle from "@/utils/setCursorStyle";
import CursorStyle from "@/types/cursorStyle";

interface Props {
  children: React.ReactNode;
}

const ReactZoomPanPinch: React.FC<Props> = ({ children }) => {
  const [isDisabled, setIsDisabled] = React.useState(true);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        setIsDisabled(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setIsDisabled(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleZoomStart = React.useCallback(() => {
    setCursorStyle(CursorStyle.NsResize);
  }, []);

  const handlePanningStart = React.useCallback(() => {
    if (isDisabled) return;
    setCursorStyle(CursorStyle.Grabbing);
  }, [isDisabled]);

  const handleZoomPanningStop = React.useCallback(() => {
    setCursorStyle(CursorStyle.Default);
  }, []);

  return (
    <TransformWrapper
      onZoomStart={handleZoomStart}
      onPanningStart={handlePanningStart}
      onZoomStop={handleZoomPanningStop}
      onPanningStop={handleZoomPanningStop}
      wheel={{ disabled: isDisabled }}
      panning={{ disabled: isDisabled }}
    >
      <TransformComponent>{children}</TransformComponent>
    </TransformWrapper>
  );
};

export default ReactZoomPanPinch;
