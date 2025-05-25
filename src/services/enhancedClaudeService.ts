import Anthropic from '@anthropic-ai/sdk';
import { type ChatMessage } from './claudeService';
import { AVAILABLE_ACTIONS, codeActionService, type CodeActionResult } from './codeActionService';

export interface EnhancedChatRequest {
  message: string;
  currentCode?: string;
  messages?: ChatMessage[];
  appState?: {
    isPlaying: boolean;
    executionHistory: unknown[];
  };
}

export interface EnhancedChatResponse {
  success: boolean;
  message?: string;
  error?: string;
  model?: string;
  actionsExecuted?: Array<{
    action: string;
    result: CodeActionResult;
  }>;
  codeUpdated?: boolean;
}

export class EnhancedClaudeService {
  private anthropic: Anthropic | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.updateApiKey(apiKey);
    }
  }

  updateApiKey(apiKey: string) {
    this.anthropic = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async sendMessage({ message, currentCode, messages, appState }: EnhancedChatRequest): Promise<EnhancedChatResponse> {
    if (!this.anthropic) {
      return {
        success: false,
        error: 'API key not configured'
      };
    }

    try {
      const systemPrompt = this.buildSystemPrompt(currentCode, messages, appState);
      const tools = this.buildTools();

      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 3000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        tools: tools
      });

      let responseText = '';
      const actionsExecuted: Array<{ action: string; result: CodeActionResult }> = [];
      let codeUpdated = false;

      for (const content of response.content) {
        if (content.type === 'text') {
          responseText += content.text;
        } else if (content.type === 'tool_use') {
          const actionResult = await codeActionService.executeAction(
            content.name,
            content.input as Record<string, unknown>
          );
          
          actionsExecuted.push({
            action: content.name,
            result: actionResult
          });

          if (actionResult.success && (content.name === 'update_code' || content.name === 'modify_code_section' || content.name === 'add_code_block')) {
            codeUpdated = true;
          }

          if (!actionResult.success) {
            responseText += `\n\nAction "${content.name}" failed: ${actionResult.error}`;
          }
        }
      }

      if (actionsExecuted.length > 0 && responseText.trim() === '') {
        responseText = actionsExecuted
          .filter(ae => ae.result.success)
          .map(ae => ae.result.message)
          .join('\n');
      }

      return {
        success: true,
        message: responseText || 'Action completed successfully',
        model: 'claude-3.5-sonnet',
        actionsExecuted,
        codeUpdated
      };

    } catch (error: unknown) {
      console.error('Enhanced Claude API Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to get response from Claude';
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  private buildSystemPrompt(currentCode?: string, messages?: ChatMessage[], appState?: { isPlaying: boolean; executionHistory: unknown[] }): string {
    return `You are a classically trained electronic music composer and Tone.js expert assistant. You help users create beautiful, nuanced musical compositions with Tone.js.

IMPORTANT: You have access to tools that allow you to directly modify the user's Tone.js code. Use these tools when the user requests code changes, improvements, or new musical ideas.

Current code in editor:
\`\`\`javascript
${currentCode || 'No code yet'}
\`\`\`

Current state:
- Audio playing: ${appState?.isPlaying ? 'Yes' : 'No'}
- Recent executions: ${appState?.executionHistory?.length || 0}

Previous conversation context:
${messages?.slice(-3).map(m => `${m.type}: ${m.content}`).join('\n') || 'No previous context'}

Available tools:
${AVAILABLE_ACTIONS.map(action => `- ${action.name}: ${action.description}`).join('\n')}

Guidelines:
- When users ask for code changes, use the appropriate tools to update their code
- Use update_code for complete code replacements
- Use modify_code_section for targeted changes to specific parts
- Use add_code_block to add new functionality
- Always execute_code after making changes if the user wants to hear the result
- Provide clear explanations of what you're doing
- Suggest creative musical ideas and improvements
- Help debug issues when they arise
- Keep responses focused and practical

Remember: You can directly modify their code through the tools - don't just provide code in text form!`;
  }

  private buildTools() {
    return AVAILABLE_ACTIONS.map(action => ({
      name: action.name,
      description: action.description,
      input_schema: {
        type: 'object' as const,
        properties: Object.entries(action.parameters).reduce((props, [key, param]) => ({
          ...props,
          [key]: {
            type: param.type,
            description: param.description
          }
        }), {}),
        required: Object.entries(action.parameters)
          .filter(([, param]) => param.required)
          .map(([key]) => key)
      }
    }));
  }
}

export const enhancedClaudeService = new EnhancedClaudeService(); 