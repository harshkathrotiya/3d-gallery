# 3D Animated Chatbot with OpenRouter API Integration

This component provides an interactive 3D animated chatbot that uses the OpenRouter API to generate responses related to the 3D Gallery website.

## Features

- 3D animated chatbot button with interactive elements
- Real-time chat interface with smooth animations
- Integration with OpenRouter API for AI-powered responses
- Context-aware responses that focus on the website content
- Mobile-responsive design

## Setup

1. Create a `.env.local` file in the root of your project based on the `.env.local.example` file
2. Add your OpenRouter API key to the `.env.local` file:
   ```
   NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
3. Make sure the chatbot component is included in your layout or page component

## Usage

The chatbot is automatically added to the layout and will appear as a floating button in the bottom-right corner of the page. Users can click on it to open the chat interface and start interacting with the AI assistant.

### Customization

You can customize the chatbot by modifying the following files:

- `ChatbotUI.tsx`: UI components and styling
- `chatbotApi.ts`: API integration and context settings
- `Chatbot3D.tsx`: 3D animations and effects
- `globals.css`: Animation and styling

### Context Configuration

To ensure the chatbot only provides responses related to your website, edit the `WEBSITE_CONTEXT` variable in `chatbotApi.ts`. This context is sent with every API request to guide the AI's responses.

## Dependencies

- React Three Fiber/Drei: For 3D rendering
- Framer Motion: For UI animations
- OpenRouter API: For AI responses

## Troubleshooting

If you encounter issues with the chatbot:

1. Check that your API key is correctly set in the `.env.local` file
2. Ensure you have all the required dependencies installed
3. Check the browser console for any error messages
4. Make sure your OpenRouter account has sufficient credits
