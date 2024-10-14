import store from "@/store";
import { editorSlice } from "@/store/editorSlice";
import { ConfirmMessage } from "./typesVim";
import { VimModeChangeArgs } from "@/package/vim";

// =====Vim end=====
// =====Vim end=====
export const newVimInitAction = () => {
  store.dispatch(editorSlice.actions.newVimInitAction());
}

export const newVimModeChangeAction = (mode: VimModeChangeArgs) => {
  store.dispatch(editorSlice.actions.newVimModeChangeAction(mode));
}

export const newVimDisposeAction = () => {
  store.dispatch(editorSlice.actions.newVimDisposeAction());
}

export const newVimConfirmAction = (confirmMessage: ConfirmMessage) => {
  store.dispatch(editorSlice.actions.newVimConfirmAction(confirmMessage));
}

export const newVimCommandStartAction = (keyBuffer: string) => {
  store.dispatch(editorSlice.actions.newVimCommandStartAction(keyBuffer));
}

export const newVimCommandDoneAction = () => {
  store.dispatch(editorSlice.actions.newVimCommandDoneAction());
}

export const newVimKeyDeleteAction = () => {
  store.dispatch(editorSlice.actions.newVimKeyDeleteAction());
}

export const newVimKeyPressAction = (key: string, replaceContents = false) => {
  store.dispatch(editorSlice.actions.newVimKeyPressAction({ key, replaceContents }));
}
// =====Vim end=====
// =====Vim end=====