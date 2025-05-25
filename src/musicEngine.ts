import * as Tone from 'tone';

export interface ExecutionResult {
  success: boolean;
  error?: string;
}

/**
 * Music engine for handling Tone.js code execution and audio management
 */
export class MusicEngine {
  private executionContext: Record<string, unknown> = {};
  private isPlaying = false;

  /**
   * Get the default example code for the editor
   */
  getDefaultCode(): string {
    return `// Welcome to Tone.js playground!
// Try creating a simple synth:

const synth = new Tone.Synth().toDestination();

// Play a note
synth.triggerAttackRelease("C4", "8n");

// Create a sequence
const seq = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
}, ["C4", "E4", "G4", "B4"]).start(0);

// Start the transport
Tone.Transport.start();`;
  }

  /**
   * Execute Tone.js code safely
   */
  async executeCode(code: string): Promise<ExecutionResult> {
    try {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }

      Tone.Transport.stop();
      Tone.Transport.cancel();

      this.disposeAll();

      const executeCode = new Function('Tone', 'context', `
        ${code}
        return { Tone, context };
      `);

      const result = executeCode(Tone, this.executionContext);
      this.executionContext = result.context || {};
      this.isPlaying = true;

      return { success: true };
    } catch (error) {
      console.error('Error executing code:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Stop all audio and dispose of Tone.js objects
   */
  stopAudio(): void {
    try {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      this.disposeAll();
      this.isPlaying = false;
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  }

  /**
   * Get current playing state
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Dispose of all created Tone.js objects
   */
  private disposeAll(): void {
    Object.values(this.executionContext).forEach((item: unknown) => {
      if (item && typeof item === 'object' && 'dispose' in item && typeof item.dispose === 'function') {
        item.dispose();
      }
    });
    this.executionContext = {};
  }
}

export const musicEngine = new MusicEngine(); 