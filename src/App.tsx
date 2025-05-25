import { 
  Main, Section, Header, Footer, Article, Div, Button, 
  Input, Textarea, Select, Fieldset, Form, Label, 
  P, H1, H2, H3, H4, Ul, Li, Code, Pre, Time, Span 
} from './components';

function App() {
  return (
    <Main flex flexDirection="row" gap="xl" padding="xl" style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Left Panel - Typography & Buttons Test */}
      <Section panel flex flexDirection="column" padding="xl" style={{ flex: 1 }}>
        <Header bordered>
          <H2>Design System Test</H2>
          <P size="small" variant="muted">Testing our boolean prop components</P>
        </Header>
        
        <Div flex flexDirection="column" gap="xl">
          {/* Typography Section */}
          <Div>
            <H3>Typography</H3>
            <H1 size="small">Large Heading</H1>
            <H4 variant="muted">Muted Subheading</H4>
            <P>This is a regular paragraph with <Code inline>inline code</Code> styling.</P>
            <P size="small">Small text paragraph.</P>
            <P size="large" variant="muted">Large muted paragraph.</P>
          </Div>

          {/* Buttons Section */}
          <Div>
            <H4>Buttons</H4>
            <Div flex flexDirection="row" gap="sm" style={{ marginBottom: '1.5rem' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </Div>
            <Div flex flexDirection="row" gap="sm">
              <Button variant="primary" size="small">Small</Button>
              <Button variant="secondary">Medium</Button>
              <Button variant="ghost" size="large">Large</Button>
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
      <Section panel flex flexDirection="column" padding="xl" style={{ flex: 1 }}>
        <Header bordered flex justifyContent="between">
          <H2>Form Elements</H2>
          <Span variant="muted" size="small">Interactive test</Span>
        </Header>

        <Div flex flexDirection="column" gap="xl">
          {/* Form Section */}
          <Form>
            <Div flex flexDirection="column" gap="md">
              <Div>
                <Label htmlFor="test-input">Test Input</Label>
                <Input id="test-input" type="text" placeholder="Type something..." />
              </Div>
              
              <Div>
                <Label htmlFor="test-textarea">Large Textarea</Label>
                <Textarea id="test-textarea" size="large" placeholder="Write your code here..."></Textarea>
              </Div>
              
              <Div flex flexDirection="row" gap="sm">
                <Input size="small" type="text" placeholder="Small input" />
                <Select size="small">
                  <option>Option 1</option>
                  <option>Option 2</option>
                </Select>
              </Div>

              <Fieldset borderless flex flexDirection="row" gap="sm">
                <Button type="submit" variant="primary">Submit</Button>
                <Button type="button" variant="secondary">Cancel</Button>
              </Fieldset>
            </Div>
          </Form>

          {/* Message Cards */}
          <Div>
            <H4>Message Cards</H4>
            <Div flex flexDirection="column" gap="md">
              <Article card>
                <P variant="bold">User Message</P>
                <P size="small">This looks like a chat message card.</P>
                <Time variant="subtle" size="small">2:30 PM</Time>
              </Article>
              
              <Article card elevated>
                <P variant="bold">Agent Response</P>
                <P>This is an elevated card with shadow.</P>
                <P size="small" variant="muted">Try creating a simple synth with <Code inline>new Tone.Synth()</Code></P>
              </Article>
            </Div>
          </Div>

          {/* Lists */}
          <Div>
            <H4>Lists</H4>
            <Ul listStyle="unstyled" gap="xs">
              <Li spaced>✅ Semantic HTML</Li>
              <Li spaced>✅ Boolean props</Li>
              <Li spaced>✅ No className repetition</Li>
            </Ul>
          </Div>
        </Div>

        <Footer bordered style={{ textAlign: 'center' }}>
          <P size="small" variant="muted">Design system ready! 🎨</P>
        </Footer>
      </Section>
    </Main>
  );
}

export default App;
