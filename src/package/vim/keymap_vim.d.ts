declare module 'monaco-vim/lib/cm/keymap_vim' {
  import CodeMirror from "../cm_adapter";

  const Pos: typeof CodeMirror.Pos;

  function transformCursor(cm: CodeMirror.Editor, range: CodeMirror.Range): CodeMirror.Position;

  interface VimCommand {
    name: string;
    shortName?: string;
  }

  const defaultExCommandMap: VimCommand[];

  interface VimKeyMapping {
    keys: string;
    type: "keyToKey";
    toKeys: string;
  }

  const defaultKeymap: VimKeyMapping[];

  const Vim: {
    (): {
      enterVimMode(cm: CodeMirror.Editor): void;
    };
  };

  export { Vim };
  export default CodeMirror;
}