import type { Message } from './types';

// Website context to ensure responses are related to the website
const WEBSITE_CONTEXT = `
You are an AI assistant for the 3D Gallery website. This website showcases an immersive 3D gallery experience with interactive elements.
Key features of the website include:
- Interactive 3D experiences and animations
- A carousel of 3D models and images
- Horizontal scrolling sections with 3D elements
- Gallery showcases with interactive elements
- Information about 3D visualization technology

Only answer questions related to this website, its features, 3D technology, or how to use the gallery.
If asked about unrelated topics, politely redirect the conversation back to the 3D Gallery website.
Keep responses concise and helpful, focusing on the website's features and capabilities.
`;

// No mock responses - we'll always use the OpenRouter API

export async function sendChatMessage(userMessage: string, previousMessages: Message[]): Promise<string> {
  try {
    // Format messages for the API
    const formattedMessages = [
      // System message with context
      {
        role: 'system',
        content: WEBSITE_CONTEXT
      },
      // Previous conversation history
      ...previousMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      // New user message
      {
        role: 'user',
        content: userMessage
      }
    ];

    // Check if API key is available
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

    // If no API key, return an error message
    if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
      return "Please set up your OpenRouter API key in the .env.local file to enable AI-generated responses.";
    }

    // Log the request for debugging
    const requestBody = {
      "model": "openai/gpt-3.5-turbo",
      "messages": formattedMessages,
      "temperature": 0.7,
      "max_tokens": 1000
    };
    console.log('API Request:', requestBody);

    // Make API request to OpenRouter using the exact format provided
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "HTTP-Referer": typeof window !== 'undefined' ? window.location.href : "https://3dgallery.example.com", // Site URL for rankings
        "X-Title": "3D Gallery", // Site title for rankings
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    // Log the raw response for debugging
    console.log('API Response Status:', response.status, response.statusText);

    if (!response.ok) {
      let errorMessage = `API error: ${response.status}`;
      try {
        const errorData = await response.json();
        console.error('API error details:', errorData);
        if (errorData.error && errorData.error.message) {
          errorMessage = `API error: ${errorData.error.message}`;
        }
      } catch (e) {
        console.error('Could not parse error response:', e);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('API Response:', data); // Log the full response for debugging

    // Handle different response structures
    let content = '';

    // Check if the response has choices array (OpenAI-like structure)
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      content = data.choices[0].message.content;
    }
    // Check if the response has a direct content field (some API variations)
    else if (data.content) {
      content = data.content;
    }
    // Check if the response is in the OpenRouter format
    else if (data.response) {
      content = typeof data.response === 'string' ? data.response : JSON.stringify(data.response);
    }
    // Check if the response has a message field directly
    else if (data.message && data.message.content) {
      content = data.message.content;
    }
    // Handle empty response object
    else if (Object.keys(data).length === 0) {
      console.error('Empty API response received');
      return 'Sorry, I received an empty response from the API. This might be due to rate limiting or an issue with the API key. Please try again later.';
    }
    // If none of the above, use a default message
    else {
      console.error('Unexpected API response structure:', data);
      return `Sorry, I couldn't generate a response. The API returned an unexpected format. Response: ${JSON.stringify(data)}`;
    }

    // Try to parse the content if it's in JSON format
    try {
      // Check if the content contains JSON
      if (content.includes('```json') || content.includes('\\boxed{```json')) {
        // Extract JSON content
        const jsonMatch = content.match(/```json\s*(\{.*?\})\s*```/s) ||
                         content.match(/\\boxed\{```json\s*(\{.*?\})\s*```\}/s);

        if (jsonMatch && jsonMatch[1]) {
          const jsonContent = JSON.parse(jsonMatch[1]);

          // Extract the response field if it exists
          if (jsonContent.response) {
            if (typeof jsonContent.response === 'string') {
              return jsonContent.response;
            } else if (jsonContent.response.description) {
              return jsonContent.response.description;
            } else if (jsonContent.response.title && jsonContent.response.description) {
              return `${jsonContent.response.title}\n\n${jsonContent.response.description}`;
            }
          }
        }
      }
    } catch (error) {
      console.log('Error parsing JSON response:', error);
      // If parsing fails, return the original content
    }

    // Return the original content if parsing fails or if it's not in JSON format
    return content || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Error in sendChatMessage:', error);

    // Return a friendly error message instead of throwing
    if (error instanceof Error && error.message.includes('API error: 401')) {
      return "Authentication failed. Please check that your OpenRouter API key is valid and has sufficient credits.";
    } else if (error instanceof Error && error.message.includes('API error: 429')) {
      return "Rate limit exceeded. Please try again later or check your OpenRouter API usage limits.";
    } else {
      return "I'm having trouble connecting to my knowledge base right now. Please make sure you've set up the OpenRouter API key correctly in the .env.local file, or try again later.";
    }
  }
}
