import './styles/index.css';
import { 
  Main, Section, Header, Footer, Article, Div, Button, 
  Input, Textarea, Select, Fieldset, Form, Label, 
  P, H1, H2, H3, H4, Ul, Li, Code, Pre, Time, Span 
} from './styles/styled';

function App() {
  return (
    <Main flexRow gap4 p4 style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Left Panel - Typography & Buttons Test */}
      <Section panel flexCol p4 style={{ flex: 1 }}>
        <Header bordered>
          <H2>Design System Test</H2>
          <P small muted>Testing our boolean prop components</P>
        </Header>
        
        <Div flexCol gap4>
          {/* Typography Section */}
          <Div>
            <H3>Typography</H3>
            <H1 small>Large Heading</H1>
            <H4 muted>Muted Subheading</H4>
            <P>This is a regular paragraph with <Code inline>inline code</Code> styling.</P>
            <P small>Small text paragraph.</P>
            <P large textMuted>Large muted paragraph.</P>
          </Div>

          {/* Buttons Section */}
          <Div>
            <H4>Buttons</H4>
            <Div flexRow gap2 style={{ marginBottom: 'var(--space-3)' }}>
              <Button primary>Primary</Button>
              <Button secondary>Secondary</Button>
              <Button ghost>Ghost</Button>
              <Button danger>Danger</Button>
            </Div>
            <Div flexRow gap2>
              <Button primary small>Small</Button>
              <Button secondary>Medium</Button>
              <Button ghost large>Large</Button>
            </Div>
          </Div>

          {/* Code Block */}
          <Div>
            <H4>Code Example</H4>
            <Pre>{`// Example ToneJS code
const synth = new Tone.Synth().toDestination();
synth.triggerAttackRelease("C4", "8n");`}</Pre>
          </Div>
        </Div>
      </Section>

      {/* Right Panel - Forms & Layout Test */}
      <Section panel flexCol p4 style={{ flex: 1 }}>
        <Header bordered flexBetween>
          <H2>Form Elements</H2>
          <Span textMuted small>Interactive test</Span>
        </Header>

        <Div flexCol gap4>
          {/* Form Section */}
          <Form>
            <Div flexCol gap3>
              <Div>
                <Label htmlFor="test-input">Test Input</Label>
                <Input id="test-input" type="text" placeholder="Type something..." />
              </Div>
              
              <Div>
                <Label htmlFor="test-textarea">Large Textarea</Label>
                <Textarea id="test-textarea" large placeholder="Write your code here..."></Textarea>
              </Div>
              
              <Div flexRow gap2>
                <Input small type="text" placeholder="Small input" />
                <Select small>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </Select>
              </Div>

              <Fieldset borderless flexRow gap2>
                <Button type="submit" primary>Submit</Button>
                <Button type="button" secondary>Cancel</Button>
              </Fieldset>
            </Div>
          </Form>

          {/* Message Cards */}
          <Div>
            <H4>Message Cards</H4>
            <Div flexCol gap3>
              <Article card>
                <P textBold>User Message</P>
                <P small>This looks like a chat message card.</P>
                <Time textSubtle small>2:30 PM</Time>
              </Article>
              
              <Article card elevated>
                <P textBold>Agent Response</P>
                <P>This is an elevated card with shadow.</P>
                <P small textMuted>Try creating a simple synth with <Code inline>new Tone.Synth()</Code></P>
              </Article>
            </Div>
          </Div>

          {/* Lists */}
          <Div>
            <H4>Lists</H4>
            <Ul unstyled flexCol gap1>
              <Li spaced>✅ Semantic HTML</Li>
              <Li spaced>✅ Boolean props</Li>
              <Li spaced>✅ No className repetition</Li>
            </Ul>
          </Div>
        </Div>

        <Footer bordered textCenter>
          <P small textMuted>Design system ready! 🎨</P>
        </Footer>
      </Section>
    </Main>
  );
}

export default App;
