import { all, debounce, put, takeEvery } from "redux-saga/effects";
import { addSnapshot } from "@/store/drawing-board/slices/drawingBoardSlice";

function* takeSnapshot() {
  yield put(addSnapshot());
}

function* historySaga() {
  yield all([debounce(250, "drawingBoard/changePixel", takeSnapshot), takeEvery("drawingBoard/clear", takeSnapshot)]);
}

export default historySaga;
