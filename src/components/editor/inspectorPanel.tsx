'use client';

import { Box } from "@mui/system"
import { Resizable } from 're-resizable'
import { DEFAULT_PANEL_HEIGHT, DEFAULT_PANEL_WIDTH_PERCENT, LayoutType, MIN_HEIGHT, MIN_WIDTH, SizeChanges, handleClasses } from "./constants"
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import clsx from "clsx"
import { Language } from "./editor"
import { codeDb } from "@/package/code-db"
import { useLiveQuery } from 'dexie-react-hooks';

export interface Props {
  language: Language
  maxHeight?: string
  /**
   * Panel layout
   */
  layout?: LayoutType

  /**
   * Hide or show panel contents
   */
  collapsed?: boolean

  /**
   * Absolute height in pixels.
   *
   * Right now, resize in percent is buggy.
   */
  height?: number

  /**
   * Width in percents.
   */
  widthPercent?: number

  /**
   * Resize handler
   * @param size
   */
  onResize: (size: SizeChanges) => void

  /**
   * Panel orientation change handler.
   * @param layout
   */
  onLayoutChange: (layout: LayoutType) => void

  /**
   * Panel collapse/expand handler.
   * @param collapsed
   */
  onCollapsed: (collapsed: boolean) => void

  path: string
}

export interface InspectorPanelRef {
  runCode: () => void;
  clearLog: () => void;
}

export const InspectorPanel = forwardRef<InspectorPanelRef, Props>(function InspectorPanel(props, ref) {
  const {
    language,
    maxHeight,
    layout = LayoutType.Horizontal,
    height = DEFAULT_PANEL_HEIGHT,
    widthPercent = DEFAULT_PANEL_WIDTH_PERCENT,
    collapsed,
    onResize,
    path,
  } = props

  const isCollapsed = collapsed && layout === LayoutType.Vertical
  const [logContent, setLogContent] = useState<string>("");
  const eventSourceRef = useRef<EventSource | null>(null);

  // const currentCode = useAppSelector(currentCodeState)
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const parentBoxRef = useRef<HTMLDivElement | null>(null);

  const [iframeSize, setIframeSize] = useState<{
    width: string, height: string
  }>({ width: '100%', height: '100%' });

  const code = useLiveQuery(async () => {
    try {
      return await codeDb.code.get(path);
    } catch (error) {
      console.error('getCode error', error);
      return undefined;
    }
  }, [path]);

  const currentCode = useMemo(() => {
    if (code) {

      return code.code
    } else {
      return ''
    }
  }, [code])

  const handleResize = useCallback(
    (e: any, direction: any, ref: any, delta: any) => {
      const { height, width } = ref.getBoundingClientRect()
      switch (layout) {
        case LayoutType.Vertical:
          onResize?.({ height })
          return
        case LayoutType.Horizontal:
          onResize?.({ width })
          break
        default:
      }
    },
    [layout, onResize],
  )

  const size = {
    // FIXME: Percent height flickers during resize. Use pixels for now.
    height: layout === LayoutType.Vertical ? height : 'auto',
    width: layout === LayoutType.Horizontal ? `${widthPercent}%` : '100%',
  }

  const enabledCorners = {
    top: !collapsed && layout === LayoutType.Vertical,
    right: false,
    bottom: false,
    left: !collapsed && layout === LayoutType.Horizontal,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
  }

  useEffect(() => {
    const { offsetHeight, offsetWidth } = parentBoxRef?.current ? parentBoxRef.current : {
      offsetHeight: '100%',
      offsetWidth: '100%'
    };

    setIframeSize({
      height: offsetHeight as string,
      width: offsetWidth as string
    })

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [])

  useEffect(() => {
    if (language === 'html' && currentCode !== '') {
      runhtml()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCode, language])

  const runhtml = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(currentCode);
        iframeDocument.close();
      }
    }
  }

  const runCode = () => {
    if (language === 'html') {
      runhtml();
      return;
    }

    // 保存原始的 console.log
    const originalLog = console.log;

    try {
      console.log = (...args: any[]) => {
        const logMessage = args.map(arg => {
          if (arg instanceof Map) {
            // 如果是 Map，手动将其转换为键值对的字符串表示
            // return `Map(${arg.size}) { ${[...arg.entries()].map(([k, v]) => `${String(k)} => ${String(v)}`).join(', ')} }`;
            return `Map(${arg.size}) ${JSON.stringify(Array.from(arg), null, 2)}`;
          } else if (typeof arg === 'object') {
            return JSON.stringify(arg, null, 2); // 对象和数组格式化为 JSON 字符串
          } else {
            return String(arg); // 其他类型直接转换为字符串
          }
        }).join(' ');

        // 更新 logContent 显示 log
        setLogContent(prev => prev + logMessage + '\n');
      };

      // eslint-disable-next-line no-new-func
      new Function(currentCode)();
    } catch (error) {
      console.log(`Error: ${String(error)}`);
    } finally {
      // 恢复 console.log 到原始状态
      console.log = originalLog;
    }
  };

  useImperativeHandle(ref, () => ({
    runCode: () => {
      runCode()
    },
    clearLog: () => {
      setLogContent('')
    }
  }));

  // console.log('%c=logContent','color:red',logContent)

  return <Resizable
    className={clsx('InspectorPanel', isCollapsed && 'InspectorPanel--collapsed', `InspectorPanel--${layout}`)}
    handleClasses={handleClasses}
    size={size}
    enable={enabledCorners}
    onResizeStop={handleResize}
    minHeight={MIN_HEIGHT}
    minWidth={MIN_WIDTH}
  >
    <Box
      ref={parentBoxRef}
      sx={{
        background: '#313131',
        height: '100%',
        overflowY: 'auto',
        maxHeight: maxHeight,
      }}>
      <Box
        sx={{
          overflowY: 'auto',
          minHeight: '100%',
          boxSizing: 'border-box',
          pl: '10px',
          pb: '200px',
        }}>

        {language === 'html' ?
          <iframe
            ref={iframeRef}
            title="Code Output"
            style={{ width: iframeSize.width, height: iframeSize.height, border: 'none' }}
          />
          :
          <pre className="white-c">
            {logContent}
          </pre>
        }
      </Box>
    </Box>
  </Resizable>
});
