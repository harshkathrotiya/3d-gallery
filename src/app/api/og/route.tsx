import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get title from query params or use default
    const title = searchParams.get('title') || '3D Gallery';
    
    // Get description from query params or use default
    const description = searchParams.get('description') || 
      'Create and explore stunning 3D galleries with our immersive platform';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            backgroundImage: 'linear-gradient(to bottom right, #1a1a2e, #16213e, #0f3460)',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              style={{ marginRight: '20px' }}
            >
              <path
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                stroke="#4F8EF7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h1
              style={{
                fontSize: '60px',
                fontWeight: 'bold',
                color: 'white',
                margin: '0',
              }}
            >
              3D Gallery
            </h1>
          </div>
          
          <h2
            style={{
              fontSize: '40px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              margin: '0 0 20px 0',
              maxWidth: '80%',
            }}
          >
            {title}
          </h2>
          
          <p
            style={{
              fontSize: '24px',
              color: '#E0E0E0',
              textAlign: 'center',
              margin: '0',
              maxWidth: '80%',
            }}
          >
            {description}
          </p>
          
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                fontSize: '20px',
                color: '#A0A0A0',
              }}
            >
              3d-gallery-mauve.vercel.app
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.log(`Error generating OG image: ${e}`);
    return new Response(`Error generating image`, {
      status: 500,
    });
  }
}
