'use client';

import { Box } from "@mui/system";
import { useAtom } from "jotai";
import { useRef } from "react";
import { editorAtom, changePanelLayout, setCurrentCode, panelState } from "@/store-jotai";
import { updateCodeDb } from "@/package/code-db";
import { InspectorPanel, InspectorPanelRef } from "./inspectorPanel";
import { computeSizePercentage, LayoutType } from "./constants";
import { CodeEditor, Language } from "./editor";
import './inspectorPanel.css';

interface Props {
  code: string;
  path: string;
  language: Language;
  height?: string;
}

const Editor = (prop: Props) => {
  const { path, code, height, language } = prop;
  const editorcontainerRef = useRef<HTMLDivElement>(null);
  const inspectorPanelRef = useRef<InspectorPanelRef>(null);

  // Replace useAppSelector with useAtom to get the state from Jotai atoms
  const [panel] = useAtom(panelState);
  const [, setEditorState] = useAtom(editorAtom);  // Use atom for editor state

  // Replace dispatching actions with Jotai atom updates
  const foceUpdate = () => {
    updateCodeDb(path, {
      id: path,
      code,
      title: '',
      updated_at: new Date(),
    });

    setEditorState((prev) => ({
      ...prev,
      currentCode: code,
    }));
  };

  const onRunCode = () => {
    inspectorPanelRef.current && inspectorPanelRef.current.runCode();
  };

  const onClearLog = () => {
    inspectorPanelRef.current && inspectorPanelRef.current.clearLog();
  };

  return (
    <div>
      <Box>
        <button onClick={() => onRunCode()}>Run code</button>
        <Box component={"button"} onClick={() => foceUpdate()} sx={{ mx: "8px" }}>
          Force update c
        </Box>
        <button onClick={() => onClearLog()}>Clear log</button>
      </Box>
      <Box
        ref={editorcontainerRef}
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "row",
          height: "auto",
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            flex: "1",
            display: "flex",
            width: "100%",
            height: "auto",
          }}
        >
          <CodeEditor code={code} path={path} height={height} language={language} />
        </Box>

        <InspectorPanel
          ref={inspectorPanelRef}
          maxHeight={height}
          language={language}
          {...panel}
          layout={LayoutType.Horizontal}
          onLayoutChange={(layout) => {
            // const result = computeSizePercentage({}, editorcontainerRef.current!);
            // setEditorState((prev) => ({
            //   ...prev,
            //   panel: { ...prev.panel, layout },
            // }));
          }}
          onCollapsed={(collapsed) => {
            // setEditorState((prev) => ({
            //   ...prev,
            //   panel: { ...prev.panel, collapsed },
            // }));
          }}
          onResize={(changes) => {
            const result = computeSizePercentage(changes, editorcontainerRef.current!);
            setEditorState((prev) => ({
              ...prev,
              panel: { ...prev.panel, ...result },
            }));
          }}
          path={path}
        />
      </Box>
    </div>
  );
};

export default Editor