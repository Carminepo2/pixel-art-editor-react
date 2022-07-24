import CursorStyle from "../types/cursorStyle";

const setCursorStyle = (style: CursorStyle) => {
  document.body.style.cursor = style;
};

export default setCursorStyle;
