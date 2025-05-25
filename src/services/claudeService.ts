import Anthropic from '@anthropic-ai/sdk';

export interface ChatMessage {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  currentCode?: string;
  messages?: ChatMessage[];
}

export interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
  model?: string;
}

export class ClaudeService {
  private anthropic: Anthropic | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.updateApiKey(apiKey);
    }
  }

  updateApiKey(apiKey: string) {
    console.log('ClaudeService.updateApiKey called with:', apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined/empty');
    this.anthropic = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async sendMessage({ message, currentCode, messages }: ChatRequest): Promise<ChatResponse> {
    if (!this.anthropic) {
      return {
        success: false,
        error: 'API key not configured'
      };
    }

    try {
      const systemPrompt = `You are a Tone.js expert assistant. You help users create amazing audio applications with Tone.js.

Current code in editor:
\`\`\`javascript
${currentCode || 'No code yet'}
\`\`\`

Previous conversation context:
${messages?.slice(-3).map(m => `${m.type}: ${m.content}`).join('\n') || 'No previous context'}

Guidelines:
- Provide clear, executable Tone.js code examples
- Explain audio concepts clearly  
- Suggest creative musical ideas
- Help debug code issues
- Keep responses focused and practical
- Use extended thinking to analyze complex problems thoroughly`;

      const response = await this.anthropic.messages.create({
        model: 'claude-opus-4-20250514',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      });

      const aiResponse = response.content[0];
      
      if (aiResponse.type === 'text') {
        return {
          success: true,
          message: aiResponse.text,
          model: 'claude-opus-4'
        };
      } else {
        return {
          success: false,
          error: 'Unexpected response format from Claude'
        };
      }

    } catch (error: unknown) {
      console.error('Claude API Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to get response from Claude';
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}

export const claudeService = new ClaudeService(); 