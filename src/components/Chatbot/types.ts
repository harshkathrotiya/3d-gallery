export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type ChatbotProps = {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  initialMessage?: string;
  theme?: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
};
