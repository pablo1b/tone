# Tone.js Chatbot Architecture

This document outlines the architecture for allowing Claude to directly update and interact with Tone.js code in real-time.

## Architecture Overview

### 1. **Centralized State Management** (`src/context/AppContext.tsx`)

The application state is managed through React Context, providing a single source of truth for:
- Current Tone.js code
- Chat messages
- Audio playback state
- Code execution history
- Loading states

**Key Benefits:**
- Unified state across all components
- Predictable state updates
- Easy state sharing between Claude service and UI components

### 2. **Code Action System** (`src/services/codeActionService.ts`)

A tool-based system that allows Claude to perform specific actions:

#### Available Actions:
- `update_code` - Replace the entire code in the editor
- `modify_code_section` - Update specific sections of existing code
- `add_code_block` - Add new code blocks at specific positions
- `execute_code` - Run the current code
- `stop_audio` - Stop all audio playback
- `get_current_state` - Query application state

**Key Benefits:**
- Structured interaction between Claude and application
- Type-safe action execution
- Extensible tool system

### 3. **Enhanced Claude Integration** (`src/services/enhancedClaudeService.ts`)

An advanced service that:
- Uses Claude's function calling capabilities
- Integrates with the code action system
- Provides rich context about the current application state
- Handles both conversational responses and code modifications

**Key Benefits:**
- Direct code manipulation by Claude
- Context-aware responses
- Seamless integration with existing chat interface

### 4. **Component Architecture**

```
App (with AppProvider)
├── CodeEditor - Displays and allows editing of Tone.js code
├── ChatPanel - Chat interface with Claude
└── Modal - API key configuration
```

## How It Works

### 1. **User Interaction Flow**
```
User types message → ChatPanel → Enhanced Claude Service → Claude API (with tools)
                                                               ↓
Code Actions ← Code Action Service ← Function calls returned by Claude
     ↓
App Context State Updates → UI Updates
```

### 2. **Claude Code Update Flow**
```
User: "Add a bass drum on every beat"
                ↓
Claude receives context: current code, app state, chat history
                ↓
Claude decides to use `modify_code_section` tool
                ↓
Code Action Service updates the code through App Context
                ↓
Claude optionally uses `execute_code` tool to play the result
                ↓
User hears the updated composition
```

### 3. **State Flow**
```
App Context (Centralized State)
├── Code updates → CodeEditor component
├── Message updates → ChatPanel component
├── Execution state → Both components
└── History tracking → Available to Claude for context
```

## Key Features

### 1. **Real-time Code Updates**
- Claude can directly modify code in the editor
- Users can see changes immediately
- Supports both complete rewrites and targeted modifications

### 2. **Context Awareness**
- Claude knows the current code state
- Aware of what's currently playing
- Has access to recent execution history
- Understands the conversation context

### 3. **Bidirectional Communication**
- Users can modify code manually
- Claude can modify code programmatically
- Both changes are tracked and managed consistently

### 4. **Error Handling**
- Action failures are gracefully handled
- Error messages are contextual
- State remains consistent even on failures

## Usage Examples

### Example 1: Code Generation
```
User: "Create a simple drum pattern"
Claude: Uses `update_code` tool to replace editor content with drum pattern
Claude: Uses `execute_code` tool to play the pattern
Claude: Responds with explanation of the pattern
```

### Example 2: Code Modification
```
User: "Make the kick drum louder"
Claude: Uses `modify_code_section` to find and replace volume settings
Claude: Uses `execute_code` to play updated version
Claude: Explains the change made
```

### Example 3: Adding Features
```
User: "Add a filter sweep effect"
Claude: Uses `add_code_block` to append filter code
Claude: Uses `modify_code_section` to connect filter to existing synths
Claude: Uses `execute_code` to demonstrate the effect
```

## Extension Points

### Adding New Actions
1. Define action in `AVAILABLE_ACTIONS` array
2. Implement handler in `CodeActionService`
3. Claude automatically gets access to the new tool

### Enhancing Context
1. Extend `AppState` interface in `AppContext`
2. Update state management logic
3. Enhanced context automatically available to Claude

### Custom Components
1. Use `useAppContext` hook in new components
2. Access centralized state and actions
3. Maintain consistency with existing architecture

## Benefits of This Architecture

1. **Scalability** - Easy to add new tools and capabilities
2. **Maintainability** - Clear separation of concerns
3. **Type Safety** - Full TypeScript support throughout
4. **User Experience** - Seamless interaction between chat and code
5. **Developer Experience** - Well-structured, easy to understand and extend

This architecture enables a truly collaborative experience where users and Claude can work together to create and modify Tone.js compositions in real-time. 