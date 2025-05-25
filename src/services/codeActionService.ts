export interface CodeAction {
  name: string;
  description: string;
  parameters: Record<string, {
    type: string;
    description: string;
    required?: boolean;
  }>;
}

export interface CodeActionResult {
  success: boolean;
  message: string;
  updatedCode?: string;
  error?: string;
}

export const AVAILABLE_ACTIONS: CodeAction[] = [
  {
    name: 'update_code',
    description: 'Replace the current Tone.js code in the editor with new code',
    parameters: {
      code: {
        type: 'string',
        description: 'The complete Tone.js code to replace in the editor',
        required: true
      },
      explanation: {
        type: 'string', 
        description: 'Brief explanation of what the code does',
        required: false
      }
    }
  },
  {
    name: 'modify_code_section',
    description: 'Modify a specific section of the existing code',
    parameters: {
      targetSection: {
        type: 'string',
        description: 'The existing code section to find and replace',
        required: true
      },
      newSection: {
        type: 'string',
        description: 'The new code to replace the target section with',
        required: true
      },
      explanation: {
        type: 'string',
        description: 'Brief explanation of the modification',
        required: false
      }
    }
  },
  {
    name: 'add_code_block',
    description: 'Add a new code block to the existing code',
    parameters: {
      codeBlock: {
        type: 'string',
        description: 'The new code block to add',
        required: true
      },
      position: {
        type: 'string',
        description: 'Where to add the code: "before", "after", or "replace"',
        required: false
      },
      explanation: {
        type: 'string',
        description: 'Brief explanation of what the new code does',
        required: false
      }
    }
  },
  {
    name: 'execute_code',
    description: 'Execute the current code in the editor',
    parameters: {}
  },
  {
    name: 'stop_audio',
    description: 'Stop all currently playing audio',
    parameters: {}
  },
  {
    name: 'get_current_state',
    description: 'Get information about the current application state',
    parameters: {}
  }
];

export class CodeActionService {
  private updateCodeCallback?: (code: string, source: 'claude') => void;
  private executeCodeCallback?: () => Promise<void>;
  private stopAudioCallback?: () => void;
  private getCurrentCodeCallback?: () => string;
  private getAppStateCallback?: () => { isPlaying: boolean; executionHistory: unknown[] };

  setCallbacks({
    updateCode,
    executeCode, 
    stopAudio,
    getCurrentCode,
    getAppState
  }: {
    updateCode: (code: string, source: 'claude') => void;
    executeCode: () => Promise<void>;
    stopAudio: () => void;
    getCurrentCode: () => string;
    getAppState: () => { isPlaying: boolean; executionHistory: unknown[] };
  }) {
    this.updateCodeCallback = updateCode;
    this.executeCodeCallback = executeCode;
    this.stopAudioCallback = stopAudio;
    this.getCurrentCodeCallback = getCurrentCode;
    this.getAppStateCallback = getAppState;
  }

  async executeAction(actionName: string, parameters: Record<string, unknown>): Promise<CodeActionResult> {
    try {
      switch (actionName) {
        case 'update_code':
          return this.handleUpdateCode(parameters);
        
        case 'modify_code_section':
          return this.handleModifyCodeSection(parameters);
        
        case 'add_code_block':
          return this.handleAddCodeBlock(parameters);
        
        case 'execute_code':
          return this.handleExecuteCode();
        
        case 'stop_audio':
          return this.handleStopAudio();
        
        case 'get_current_state':
          return this.handleGetCurrentState();
        
        default:
          return {
            success: false,
            message: `Unknown action: ${actionName}`,
            error: 'Action not found'
          };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error executing action',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private handleUpdateCode(parameters: Record<string, unknown>): CodeActionResult {
    if (!this.updateCodeCallback) {
      return { success: false, message: 'Update code callback not set', error: 'Missing callback' };
    }

    const code = parameters.code as string;
    const explanation = parameters.explanation as string | undefined;
    if (!code) {
      return { success: false, message: 'Code parameter is required', error: 'Missing parameter' };
    }

    this.updateCodeCallback(code, 'claude');
    
    return {
      success: true,
      message: explanation ? `Code updated: ${explanation}` : 'Code updated successfully',
      updatedCode: code
    };
  }

  private handleModifyCodeSection(parameters: Record<string, unknown>): CodeActionResult {
    if (!this.updateCodeCallback || !this.getCurrentCodeCallback) {
      return { success: false, message: 'Required callbacks not set', error: 'Missing callbacks' };
    }

    const targetSection = parameters.targetSection as string;
    const newSection = parameters.newSection as string;
    const explanation = parameters.explanation as string | undefined;
    
    if (!targetSection || !newSection) {
      return { success: false, message: 'targetSection and newSection parameters are required', error: 'Missing parameters' };
    }

    const currentCode = this.getCurrentCodeCallback();
    const updatedCode = currentCode.replace(targetSection, newSection);
    
    if (updatedCode === currentCode) {
      return { 
        success: false, 
        message: 'Target section not found in current code', 
        error: 'Section not found' 
      };
    }

    this.updateCodeCallback(updatedCode, 'claude');
    
    return {
      success: true,
      message: explanation ? `Code modified: ${explanation}` : 'Code section modified successfully',
      updatedCode
    };
  }

  private handleAddCodeBlock(parameters: Record<string, unknown>): CodeActionResult {
    if (!this.updateCodeCallback || !this.getCurrentCodeCallback) {
      return { success: false, message: 'Required callbacks not set', error: 'Missing callbacks' };
    }

    const codeBlock = parameters.codeBlock as string;
    const position = (parameters.position as string) || 'after';
    const explanation = parameters.explanation as string | undefined;
    
    if (!codeBlock) {
      return { success: false, message: 'codeBlock parameter is required', error: 'Missing parameter' };
    }

    const currentCode = this.getCurrentCodeCallback();
    let updatedCode: string;

    switch (position) {
      case 'before':
        updatedCode = `${codeBlock}\n\n${currentCode}`;
        break;
      case 'replace':
        updatedCode = codeBlock;
        break;
      case 'after':
      default:
        updatedCode = `${currentCode}\n\n${codeBlock}`;
    }

    this.updateCodeCallback(updatedCode, 'claude');
    
    return {
      success: true,
      message: explanation ? `Code block added: ${explanation}` : 'Code block added successfully',
      updatedCode
    };
  }

  private async handleExecuteCode(): Promise<CodeActionResult> {
    if (!this.executeCodeCallback) {
      return { success: false, message: 'Execute code callback not set', error: 'Missing callback' };
    }

    try {
      await this.executeCodeCallback();
      return {
        success: true,
        message: 'Code executed successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error executing code',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private handleStopAudio(): CodeActionResult {
    if (!this.stopAudioCallback) {
      return { success: false, message: 'Stop audio callback not set', error: 'Missing callback' };
    }

    this.stopAudioCallback();
    return {
      success: true,
      message: 'Audio stopped successfully'
    };
  }

  private handleGetCurrentState(): CodeActionResult {
    if (!this.getCurrentCodeCallback || !this.getAppStateCallback) {
      return { success: false, message: 'Required callbacks not set', error: 'Missing callbacks' };
    }

    const currentCode = this.getCurrentCodeCallback();
    const appState = this.getAppStateCallback();
    
    return {
      success: true,
      message: 'Current state retrieved',
      updatedCode: currentCode,
      error: JSON.stringify({
        code: currentCode,
        isPlaying: appState.isPlaying,
        executionHistory: appState.executionHistory?.slice(-3) // Last 3 executions
      }, null, 2)
    };
  }
}

export const codeActionService = new CodeActionService(); 