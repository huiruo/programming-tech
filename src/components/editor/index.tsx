import { Box, useMediaQuery } from "@mui/system"
import { useRef } from "react"
import { AppDispatch, useAppSelector } from "@/store"
import { editorSlice, panelState } from "@/store/editorSlice"
import { useDispatch } from "react-redux"
import { updateCodeDb } from "@/package/code-db"
import { InspectorPanel, InspectorPanelRef } from "./inspectorPanel"
import { computeSizePercentage, LayoutType } from "./constants"
import { CodeEditor, Language } from "./editor"
import './inspectorPanel.css'

interface Props {
  code: string
  path: string
  language: Language
  height?: string
}

export const Editor = (prop: Props) => {
  const { path, code, height, language } = prop
  const editorcontainerRef = useRef<HTMLDivElement>(null)
  const inspectorPanelRef = useRef<InspectorPanelRef>(null);
  const panel = useAppSelector(panelState)
  const dispatch: AppDispatch = useDispatch();

  // const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('tablet'));
  const isMobile = false;

  const foceUpdate = () => {
    updateCodeDb(path, {
      id: path,
      code,
      title: '',
      updated_at: new Date()
    })

    dispatch(editorSlice.actions.setCurrentCode({ code, path }))
  }

  const onRunCode = () => {
    inspectorPanelRef.current && inspectorPanelRef.current.runCode();
  }

  const onClearLog = () => {
    inspectorPanelRef.current && inspectorPanelRef.current.clearLog();
  }

  return <div>
    <Box >
      <button onClick={() => onRunCode()}>
        Run code
      </button>

      <Box component={'button'} onClick={() => foceUpdate()} sx={{ mx: '8px' }}>
        Force update c
      </Box>

      <button onClick={() => onClearLog()}>
        Clear log
      </button>
    </Box>
    <Box ref={editorcontainerRef} sx={{
      display: 'flex',
      flexGrow: 1,
      flexDirection: isMobile ? 'column' : 'row',
      height: 'auto',
    }}>
      <Box sx={{
        overflow: 'hidden',
        flex: '1',
        display: 'flex',
        width: '100%',
        height: 'auto',
      }}>
        <CodeEditor
          code={code}
          path={path}
          height={height}
          language={language}
        />
      </Box>

      <InspectorPanel
        ref={inspectorPanelRef}
        maxHeight={height}
        language={language}
        {...panel}
        layout={!isMobile ? LayoutType.Horizontal : LayoutType.Vertical}
        onLayoutChange={(layout) => {
          // dispatch(dispatchPanelLayoutChange({ layout }))
          // console.log('%c=onLayoutChange=>', 'color:green', layout)
        }}
        onCollapsed={(collapsed) => {
          // console.log('%c=onCollapsed=>', 'color:green', collapsed)
          // dispatch(dispatchPanelLayoutChange({ collapsed }))
        }}
        onResize={(changes) => {
          if ('height' in changes) {
            // console.log('%c=onResize A 1=>', 'color:green', changes)
            return
          }

          const result = computeSizePercentage(changes, editorcontainerRef.current!)

          // console.log('%c=onResize A 2=>', 'color:green', { changes, result })
          dispatch(editorSlice.actions.changePanelLayout(result))
        }}
        path={path}
      />
    </Box>
  </div>
}