# 3D Gallery with Interactive Chatbot

This is a [Next.js](https://nextjs.org) project featuring an immersive 3D gallery with an interactive animated chatbot powered by  AI.

## Features

- Interactive 3D elements and animations
- Responsive design for all devices
- Animated real-time chatbot with AI responses
- Horizontal scrolling sections with 3D elements
- Dynamic image gallery with 3D effects

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, set up your  API key:

1. Create a `.env.local` file in the root directory (or use the existing one)
2. Add your  API key:
   ```
   API_KEY=your_api_key_here
   ```

> **Note:** You must set up an  API key for the chatbot to generate responses.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using the Chatbot

The chatbot appears as a floating button in the bottom-right corner of the page. Click on it to open the chat interface and start interacting with the AI assistant.

The chatbot is designed to answer questions related to the 3D Gallery website and its features.

## Chatbot Implementation Details

The chatbot is implemented using the following components:

- **ChatbotUI.tsx**: The main chat interface with message display and input
- **Chatbot3D.tsx**: 3D animated elements using Three.js and React Three Fiber
- **ChatbotProvider.tsx**: Client-side wrapper to handle dynamic loading
- **chatbotApi.ts**: API integration 


### Customizing the Chatbot

You can customize the chatbot by:

1. **Changing the appearance**:
   - Edit the CSS classes in `globals.css`
   - Modify the 3D elements in `Chatbot3D.tsx`

2. **Adjusting the context**:
   - Edit the `WEBSITE_CONTEXT` variable in `chatbotApi.ts` to change what the AI knows about your website

3. **Changing the model**:
   - You can switch to a different AI model by changing the `model` parameter in the API request

## Technologies Used

- **Next.js**: React framework for the frontend
- **React Three Fiber/Drei**: For 3D rendering
- **Framer Motion**: For UI animations
- **Tailwind CSS**: For styling
- ** API**: For AI-powered chat responses

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)


## Deployment

You can deploy this application on Vercel or any other hosting platform that supports Next.js applications.
