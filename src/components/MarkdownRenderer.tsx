import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  children: string;
}

const markdownComponents: Components = {
  code: ({ children, ...props }) => (
    <code 
      style={{ 
        backgroundColor: 'var(--pico-code-background-color, #f5f5f5)', 
        padding: '2px 4px', 
        borderRadius: '3px',
        fontSize: '0.9em'
      }} 
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre 
      style={{ 
        backgroundColor: 'var(--pico-code-background-color, #f5f5f5)', 
        padding: '12px', 
        borderRadius: '6px',
        overflow: 'auto',
        fontSize: '0.9em'
      }} 
      {...props}
    >
      {children}
    </pre>
  ),
  h1: ({ children, ...props }) => (
    <h1 style={{ fontSize: '1.5em', marginTop: '1em', marginBottom: '0.5em' }} {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 style={{ fontSize: '1.3em', marginTop: '1em', marginBottom: '0.5em' }} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 style={{ fontSize: '1.1em', marginTop: '1em', marginBottom: '0.5em' }} {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p style={{ marginBottom: '0.8em', lineHeight: '1.5' }} {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul style={{ marginBottom: '0.8em', paddingLeft: '1.5em' }} {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol style={{ marginBottom: '0.8em', paddingLeft: '1.5em' }} {...props}>
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote 
      style={{ 
        borderLeft: '4px solid var(--pico-primary-color, #007bff)', 
        paddingLeft: '1em', 
        margin: '1em 0',
        fontStyle: 'italic',
        color: 'var(--text-muted)'
      }} 
      {...props}
    >
      {children}
    </blockquote>
  )
};

export function MarkdownRenderer({ children }: MarkdownRendererProps) {
  return (
    <ReactMarkdown components={markdownComponents}>
      {children}
    </ReactMarkdown>
  );
} 