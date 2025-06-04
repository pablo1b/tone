# tone.ai, a tone.js AI Playground

An interactive web-based musical coding environment powered by Tone.js with AI assistance from Claude. Create, experiment, and learn music programming with real-time feedback and intelligent code suggestions.

## 🎵 Features

- **Live Code Editor**: Write and execute Tone.js code with syntax highlighting and auto-completion
- **Real-time Audio**: Instant audio feedback with play/stop controls
- **AI Assistant**: Get help with music programming from Claude AI
- **Safe Execution**: Secure code execution environment with proper resource management
- **Interactive Chat**: Conversational interface for learning and troubleshooting
- **Dark Theme**: Beautiful coding environment with the One Dark theme

## Note: Not Internet Safe

Run this app locally, it is not secured and not ready to be run on an open server.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### API Configuration

To use the AI assistant features, you'll need to configure your Anthropic API key:

1. Click the "Configure API Key" button when prompted
2. Enter your Anthropic API key (starts with `sk-ant-`)
3. The key is stored locally in your browser for future sessions

## 🎯 Usage

### Basic Code Execution

Write Tone.js code in the editor and click **Play** to execute it. Here's a simple example:

```javascript
// Create a simple synth
const synth = new Tone.Synth().toDestination();

// Play a note
synth.triggerAttackRelease("C4", "8n");
```

### AI Assistant

Use the chat panel to:
- Ask for help with Tone.js concepts
- Request code examples and explanations  
- Get debugging assistance
- Learn music theory and synthesis techniques

Example prompts:
- "Create a drum pattern with kick and snare"
- "How do I make a reverb effect?"
- "Generate a pentatonic scale melody"

### Advanced Features

- **Transport Control**: Use `Tone.Transport` for sequencing and timing
- **Effects Processing**: Add reverb, delay, distortion and other effects
- **Synthesis**: Explore different synthesizer types (FM, AM, Additive)
- **Sampling**: Load and manipulate audio samples
- **MIDI**: Connect external MIDI controllers (browser permitting)

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Audio Engine**: Tone.js
- **Code Editor**: CodeMirror 6
- **AI Integration**: Anthropic Claude API
- **Styling**: Pico CSS framework
- **Browser Automation**: Playwright (for enhanced features)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── CodeEditor.tsx   # Main code editor interface  
│   ├── ChatPanel.tsx    # AI chat interface
│   └── ...
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── services/            # API and business logic
│   ├── enhancedClaudeService.ts  # Claude AI integration
│   └── codeActionService.ts      # Code execution service
├── musicEngine.ts       # Core Tone.js execution engine
└── App.tsx             # Main application component
```

## 🎹 Example Projects

The playground comes with built-in examples to get you started:

- **Basic Synthesis**: Simple oscillator and envelope controls
- **Drum Machines**: Pattern-based percussion programming  
- **Melodic Sequences**: Scale-based melody generation
- **Effects Chains**: Audio processing and signal routing
- **Interactive Instruments**: Mouse/keyboard controlled synths

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Resources

- [Tone.js Documentation](https://tonejs.github.io/)
- [Web Audio API Reference](https://developer.mozilla.org/docs/Web/API/Web_Audio_API)
- [Music Theory Basics](https://musictheory.net/)
- [Anthropic Claude API](https://docs.anthropic.com/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎶 Happy Music Making!

Whether you're a beginner learning the basics of computer music or an experienced developer exploring new sonic territories, this playground provides the tools and AI guidance to bring your musical ideas to life.
