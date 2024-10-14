import { editorAtom } from '@/store-jotai'
import { VimMode, VimState } from '@/store-jotai/types/typesVim'
import { getDefaultStore } from 'jotai'
import { type editor, type IKeyboardEvent, KeyCode } from 'monaco-editor'
import VimModeKeymap from 'monaco-vim/lib/cm/keymap_vim'

const registryOutputPrefix = '----------Registers----------'
const isPrintableKey = (key: string) => /^.$/.test(key)

export type Nullable<T> = T | null

/**
 * VimModeChangeArgs represents current selected mode and sub-mode.
 *
 * @see monaco-vim/lib/statusbar.js
 */
export type VimModeChangeArgs = Pick<VimState, 'mode' | 'subMode'>

interface CommandInputOpts {
  bottom?: boolean
  selectValueOnOpen?: boolean
  closeOnEnter?: boolean
  onKeyDown?: (e: KeyboardEvent, input: HTMLInputElement, closeFn: Function) => void
  onKeyUp?: (e: KeyboardEvent, input: HTMLInputElement, closeFn: Function) => void
  value: string
}

// customCommands is list of custom VIM commands that trigger
// different store actions.
/*
// TODO:
const customCommands = [
  {
    name: 'write',
    short: 'w',
    action: runFileDispatcher,
  },
  {
    name: 'share',
    action: dispatchShareSnippet,
  },
]
*/

class VimModeKeymapAdapter extends VimModeKeymap {
  private commandsAttached = false

  constructor(editorInstance: editor.IStandaloneCodeEditor) {
    super(editorInstance)
    this.commandsAttached = false;
  }

  attach() {
    if (!this.commandsAttached) {
      // this.attachCommands()
      this.commandsAttached = true
    }

    // newVimInitAction()
    console.log('%c=newVimInitAction-todo','color:red',)
    super.attach()
  }

  /*
  private attachCommands() {
    customCommands.forEach(({ name, short, action }) => {
      VimMode.Vim.defineEx(name, short, () => {
        this.dispatchFunc(action)
      })
    })
  }
  */
}

export { VimModeKeymap }

export class StatusBarAdapter {
  private commandResultCallback?: Nullable<(val: string) => void>
  private currentOpts?: Nullable<CommandInputOpts>

  constructor(
    private readonly editor: editor.IStandaloneCodeEditor,
  ) { }

  /**
   * Method called on command result, usually an error.
   *
   * Library passes pre-formated styled HTML element for display.
   * @param result
   */
  showNotification(result: HTMLElement) {
    // When registry command appears, library just sends
    // the same HTML element with error red color and
    // as a result, registry prompt is unreadable and displayed as error.
    //
    // This dirty hack tries to resolve this issue at least partially.
    this.commandResultCallback = null
    const message = result.textContent!
    if (message.startsWith(registryOutputPrefix)) {
      // TODO: implement proper registries display
      /*
      newVimConfirmAction({
        type: 'default',
        message: message
          .split('\n')
          .map((v) => v.trim())
          .join(' '),
      })
      */
      return
    }

    const isError = result.style.color === 'red'
    // TODO: 
    /*
    newVimConfirmAction({
      type: isError ? 'error' : 'default',
      message: result.textContent!,
    })
    */
  }

  /**
   * Called by VimModeKeymap on command start
   * @param text DocumentFragment which contains info about command character
   * @param callback Callback to submit command
   * @param options Command handle arguments (unused)
   */
  setSec(text: DocumentFragment, callback: (val: string) => void, options: CommandInputOpts) {
    this.currentOpts = options
    this.commandResultCallback = callback

    // Initial character is hidden inside an array of 2 spans as content of 1 span.
    // Idk who thought that this is a good idea, but we have to deal with it.
    const commandChar = text.firstChild?.textContent
    // newVimCommandStartAction(commandChar ?? '')
    console.log('%c=newVimCommandStartAction-test','color:red',)
  }

  onPromptClose(value: string) {
    this.commandResultCallback?.(value.substring(1))
    this.commandResultCallback = null
  }

  /**
   * Submits input event to VIM command handler
   * @param e
   * @param currentData
   */
  handleKeyDownEvent(e: IKeyboardEvent, currentData: string) {
    e.preventDefault()
    e.stopPropagation()
    console.log('%c=handleKeyDownEvent-->','color:red',)

    const defaultStore = getDefaultStore()

    switch (e.keyCode) {
      case KeyCode.Enter:
        // newVimCommandDoneAction()
        this.onPromptClose(currentData)

        defaultStore.set(editorAtom, (prev) => ({
          ...prev,
          vim: {
            mode: prev.vim.mode,
            subMode: prev.vim.subMode
          }
        }));
        return
      case KeyCode.Escape:
        // newVimCommandDoneAction()
        defaultStore.set(editorAtom, (prev) => ({
          ...prev,
          vim: {
            mode: prev.vim.mode,
            subMode: prev.vim.subMode
          }
        }));
        break
      case KeyCode.Backspace:
        // newVimKeyDeleteAction()
        return
      default:
        break
    }

    if (isPrintableKey(e.browserEvent.key)) {
      console.log('%c=newVimKeyPressAction-test','color:red',)
      // newVimKeyPressAction(e.browserEvent.key)
    }
  }

  private closeInput() {
    this?.editor?.focus()
    this.currentOpts = null
  }
}

/**
 * Creates a vim-mode adapter attached to state dispatcher and editor instance
 * @param dispatch State dispatch function
 * @param editorInstance Monaco editor instance
 */
export const createVimModeAdapter = (
  editorInstance: editor.IStandaloneCodeEditor,
): [VimModeKeymap, StatusBarAdapter] => {
  const vimAdapter: VimModeKeymap = new VimModeKeymapAdapter(editorInstance)
  const statusAdapter = new StatusBarAdapter(editorInstance)

  vimAdapter.setStatusBar(statusAdapter)

  const defaultStore = getDefaultStore()

  vimAdapter.on('vim-mode-change', (mode: VimMode) => {
    console.log('%c=newVimModeChangeAction-test', 'color:yellow',)
    defaultStore.set(editorAtom, (prev) => ({
      ...prev,
      vim: {
        ...prev.vim,
        mode,
        // subMode,
      },
      monaco: {
        ...prev.monaco,
        cursorStyle: mode === VimMode.Insert ? 'line' : 'block',
      },
    }));
  })

  vimAdapter.on('vim-keypress', (key: string) => {
    // newVimKeyPressAction(key)
    // console.log('%c=newVimKeyPressAction-test', 'color:red',)
    defaultStore.set(editorAtom, (prev) => ({
      ...prev,
      vim: {
        ...prev.vim,
        commandStarted: true,
        keyBuffer: false ? key : (prev.vim.keyBuffer + key)
      }
    }));
  })

  vimAdapter.on('vim-command-done', () => {
    // newVimCommandDoneAction()
    // console.log('%c=newVimCommandDoneAction-test', 'color:red',)
    defaultStore.set(editorAtom, (prev) => ({
      ...prev,
      vim: {
        mode: prev.vim.mode,
        subMode: prev.vim.subMode
      }
    }));
  })

  vimAdapter.on('dispose', () => {
    // newVimDisposeAction()
    // console.log('%c=newVimDisposeAction-test', 'color:red',)
    defaultStore.set(editorAtom, (prev) => ({
      ...prev,
      vim: {} as any,
    }));
  })

  return [vimAdapter, statusAdapter]
}
