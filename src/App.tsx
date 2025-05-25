
import './styles/index.css';

function App() {
  return (
    <main flexRow gap4 p4 style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Left Panel - Typography & Buttons Test */}
      <section panel flexCol p4 style={{ flex: 1 }}>
        <header bordered>
          <h2>Design System Test</h2>
          <p small muted>Testing our boolean prop components</p>
        </header>
        
        <div flexCol gap4>
          {/* Typography Section */}
          <div>
            <h3>Typography</h3>
            <h1 small>Large Heading</h1>
            <h4 muted>Muted Subheading</h4>
            <p>This is a regular paragraph with <code inline>inline code</code> styling.</p>
            <p small>Small text paragraph.</p>
            <p large textMuted>Large muted paragraph.</p>
          </div>

          {/* Buttons Section */}
          <div>
            <h4>Buttons</h4>
            <div flexRow gap2 style={{ marginBottom: 'var(--space-3)' }}>
              <button primary>Primary</button>
              <button secondary>Secondary</button>
              <button ghost>Ghost</button>
              <button danger>Danger</button>
            </div>
            <div flexRow gap2>
              <button primary small>Small</button>
              <button secondary>Medium</button>
              <button ghost large>Large</button>
            </div>
          </div>

          {/* Code Block */}
          <div>
            <h4>Code Example</h4>
            <pre>{`// Example ToneJS code
const synth = new Tone.Synth().toDestination();
synth.triggerAttackRelease("C4", "8n");`}</pre>
          </div>
        </div>
      </section>

      {/* Right Panel - Forms & Layout Test */}
      <section panel flexCol p4 style={{ flex: 1 }}>
        <header bordered flexBetween>
          <h2>Form Elements</h2>
          <span textMuted small>Interactive test</span>
        </header>

        <div flexCol gap4>
          {/* Form Section */}
          <form>
            <div flexCol gap3>
              <div>
                <label htmlFor="test-input">Test Input</label>
                <input id="test-input" type="text" placeholder="Type something..." />
              </div>
              
              <div>
                <label htmlFor="test-textarea">Large Textarea</label>
                <textarea id="test-textarea" large placeholder="Write your code here..."></textarea>
              </div>
              
              <div flexRow gap2>
                <input small type="text" placeholder="Small input" />
                <select small>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>

              <fieldset borderless flexRow gap2>
                <button type="submit" primary>Submit</button>
                <button type="button" secondary>Cancel</button>
              </fieldset>
            </div>
          </form>

          {/* Message Cards */}
          <div>
            <h4>Message Cards</h4>
            <div flexCol gap3>
              <article card>
                <p textBold>User Message</p>
                <p small>This looks like a chat message card.</p>
                <time textSubtle small>2:30 PM</time>
              </article>
              
              <article card elevated>
                <p textBold>Agent Response</p>
                <p>This is an elevated card with shadow.</p>
                <p small textMuted>Try creating a simple synth with <code inline>new Tone.Synth()</code></p>
              </article>
            </div>
          </div>

          {/* Lists */}
          <div>
            <h4>Lists</h4>
            <ul unstyled flexCol gap1>
              <li spaced>✅ Semantic HTML</li>
              <li spaced>✅ Boolean props</li>
              <li spaced>✅ No className repetition</li>
            </ul>
          </div>
        </div>

        <footer bordered textCenter>
          <p small textMuted>Design system ready! 🎨</p>
        </footer>
      </section>
    </main>
  );
}

export default App;
