import { configureStore } from "@reduxjs/toolkit";
import drawingBoardReducer from "@/store/drawing-board/slices/drawingBoardSlice";
import createSagaMiddleware from "redux-saga";
import historySaga from "@/store/drawing-board/sagas/historySaga";
import { saveState } from "@/utils/browserStorage";
import debounce from "lodash.debounce";

const saga = createSagaMiddleware();
export const drawingBoardStore = configureStore({
  reducer: {
    drawingBoard: drawingBoardReducer,
  },
  middleware: [saga],
});

// Save PixelGrid state to local storage whenever it changes
const debouncedSaveState = debounce(() => {
  saveState(drawingBoardStore.getState().drawingBoard.pixelGrid);
}, 200);

drawingBoardStore.subscribe(debouncedSaveState);

saga.run(historySaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type DrawingBoardState = ReturnType<typeof drawingBoardStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type DrawingBoardDispatch = typeof drawingBoardStore.dispatch;
