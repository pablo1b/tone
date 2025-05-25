import { musicEngine } from '../musicEngine';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onRunCode: () => void;
  onStopCode: () => void;
}

export function CodeEditor({ code, setCode, onRunCode, onStopCode }: CodeEditorProps) {

  return (
    <section>
      <header>
        <div>
          <p>Musical Agent</p>
        </div>
        <div style={{ flexGrow: 0 }}>
          <button onClick={onRunCode}>
            Play
          </button>
          <button
            onClick={onStopCode}
            disabled={!musicEngine.getIsPlaying()}
          >
            Stop
          </button>
          <button onClick={() => setCode('')} className="outline">
            Clear
          </button>
        </div>
      </header>

      <article>
        <CodeMirror
          value={code}
          onChange={(value) => setCode(value)}
          extensions={[javascript()]}
          theme={oneDark}
          placeholder="Write your Tone.js code here..."
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
            dropCursor: false,
            allowMultipleSelections: false,
          }}
          style={{
            fontSize: '14px',
            border: '1px solid var(--pico-border-color)',
            borderRadius: 'var(--pico-border-radius)',
            minHeight: '300px'
          }}
        />
      </article>
    </section>
  );
} 