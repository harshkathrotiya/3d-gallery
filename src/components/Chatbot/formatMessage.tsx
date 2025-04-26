import React from 'react';

// Function to detect if text looks like information points with bold headers
const isInfoPointsWithBoldHeaders = (text: string): boolean => {
  const lines = text.split('\n');
  let pointCount = 0;

  // Look for patterns like "**Technology**:" or "**Development Team**:"
  for (const line of lines) {
    if (line.match(/^\s*\*\*[A-Za-z\s]+\*\*\s*:/)) {
      pointCount++;
    }
  }

  // If we found at least 2 points, it's likely an information list with bold headers
  return pointCount >= 2;
};

// Function to format information points with bold headers
const formatInfoPointsWithBoldHeaders = (text: string): JSX.Element[] => {
  const lines = text.split('\n');
  const formattedLines: JSX.Element[] = [];

  // First, collect all the info points
  const infoPoints: { title: string; content: string }[] = [];
  let currentPointTitle: string | null = null;
  let currentPointContent: string[] = [];

  // Process each line to collect info points
  lines.forEach((line) => {
    // Check if this is an info point header (e.g., "**Technology**:" or "**Development Team**:")
    const pointMatch = line.match(/^\s*\*\*([A-Za-z\s]+)\*\*\s*:\s*(.+)$/);

    if (pointMatch) {
      // If we were already collecting a point, save it
      if (currentPointTitle !== null) {
        infoPoints.push({
          title: currentPointTitle,
          content: currentPointContent.join('\n')
        });
      }

      // Start a new info point
      currentPointTitle = pointMatch[1];
      currentPointContent = [pointMatch[2]];
    } else if (currentPointTitle !== null) {
      // Add this line to the current info point's content
      if (line.trim()) {
        currentPointContent.push(line);
      }
    } else if (line.trim()) {
      // This is a non-point line before any points
      formattedLines.push(<p key={`intro-${formattedLines.length}`} className="mb-2">{line}</p>);
    }
  });

  // Add the last info point if there is one
  if (currentPointTitle !== null) {
    infoPoints.push({
      title: currentPointTitle,
      content: currentPointContent.join('\n')
    });
  }

  // Now render all the info points with proper styling
  infoPoints.forEach((point, index) => {
    formattedLines.push(
      <div key={`info-point-${index}`} className="info-point-item">
        <div className="info-point-number">{index + 1}</div>
        <div className="info-point-content">
          <div className="info-point-title">{point.title}</div>
          <div>{point.content}</div>
        </div>
      </div>
    );
  });

  return formattedLines;
};

// Function to format step-by-step instructions with proper numbering
const formatStepByStepInstructions = (text: string): JSX.Element[] => {
  const lines = text.split('\n');
  const formattedLines: JSX.Element[] = [];

  // First, collect all the steps
  const steps: { title: string; content: string }[] = [];
  let currentStepTitle: string | null = null;
  let currentStepContent: string[] = [];

  // Process each line to collect steps
  lines.forEach((line) => {
    // Check if this is a step header (e.g., "**Sign Up**:" or "**Create a Gallery**:")
    const stepMatch = line.match(/^\s*\*\*([A-Za-z\s]+)\*\*\s*:\s*(.+)$/);

    if (stepMatch) {
      // If we were already collecting a step, save it
      if (currentStepTitle !== null) {
        steps.push({
          title: currentStepTitle,
          content: currentStepContent.join('\n')
        });
      }

      // Start a new step
      currentStepTitle = stepMatch[1];
      currentStepContent = [stepMatch[2]];
    } else if (currentStepTitle !== null) {
      // Add this line to the current step's content
      if (line.trim()) {
        currentStepContent.push(line);
      }
    } else if (line.trim()) {
      // This is a non-step line before any steps
      formattedLines.push(<p key={`intro-${formattedLines.length}`} className="mb-2">{line}</p>);
    }
  });

  // Add the last step if there is one
  if (currentStepTitle !== null) {
    steps.push({
      title: currentStepTitle,
      content: currentStepContent.join('\n')
    });
  }

  // Now render all the steps with proper numbering
  steps.forEach((step, index) => {
    formattedLines.push(
      <div key={`step-${index}`} className="step-item">
        <div className="step-number">{index + 1}</div>
        <div className="step-content">
          <div className="step-title">{step.title}</div>
          <div>{step.content}</div>
        </div>
      </div>
    );
  });

  return formattedLines;
};

// Function to detect if text looks like step-by-step instructions
const isStepByStepInstructions = (text: string): boolean => {
  const lines = text.split('\n');
  let stepCount = 0;

  // Look for patterns like "**Sign Up**:" or "**Create a Gallery**:"
  for (const line of lines) {
    if (line.match(/^\s*\*\*([A-Za-z\s]+)\*\*\s*:/)) {
      const title = line.match(/^\s*\*\*([A-Za-z\s]+)\*\*\s*:/)?.[1] || "";
      // Check if the title contains action words typically found in instructions
      if (title.match(/Sign|Create|Customize|Add|Upload|Configure|Set|Choose|Select|Install|Build|Design|Start|Begin/i)) {
        stepCount++;
      }
    }
  }

  // If we found at least 3 steps with action words, it's likely a step-by-step guide
  return stepCount >= 3;
};

// Function to format numbered lists in the message
const formatNumberedList = (text: string): JSX.Element[] => {
  // Check if this looks like information points with bold headers
  if (isInfoPointsWithBoldHeaders(text)) {
    // Check if it's specifically a step-by-step guide
    if (isStepByStepInstructions(text)) {
      return formatStepByStepInstructions(text);
    } else {
      // Otherwise, format as info points
      return formatInfoPointsWithBoldHeaders(text);
    }
  }

  // Split the text by lines
  const lines = text.split('\n');
  const formattedLines: JSX.Element[] = [];

  let inNumberedList = false;
  let listItems: string[] = [];
  let currentListNumber = 1;

  // Process each line
  lines.forEach((line, index) => {
    // Check if this is a numbered list item (e.g., "1. Item" or "1) Item")
    const numberedListMatch = line.match(/^\s*(\d+)[\.\)]\s+(.+)$/);

    if (numberedListMatch) {
      // If we're not already in a list, start a new one
      if (!inNumberedList) {
        inNumberedList = true;
        listItems = [];
        currentListNumber = parseInt(numberedListMatch[1], 10);
      }

      // Add the item to the current list
      listItems.push(numberedListMatch[2]);
    } else {
      // If we were in a list and now we're not, add the list to the formatted lines
      if (inNumberedList) {
        formattedLines.push(
          <ol key={`list-${index}`} className="list-decimal pl-6 my-2 space-y-1">
            {listItems.map((item, i) => (
              <li key={`item-${i}`} className="text-left">{item}</li>
            ))}
          </ol>
        );
        inNumberedList = false;
        listItems = [];
      }

      // Add the non-list line
      if (line.trim()) {
        formattedLines.push(<p key={`line-${index}`} className="mb-2">{line}</p>);
      } else {
        // Empty line
        formattedLines.push(<div key={`space-${index}`} className="h-2"></div>);
      }
    }
  });

  // If we ended while still in a list, add the list
  if (inNumberedList) {
    formattedLines.push(
      <ol key="list-end" className="list-decimal pl-6 my-2 space-y-1">
        {listItems.map((item, i) => (
          <li key={`item-${i}`} className="text-left">{item}</li>
        ))}
      </ol>
    );
  }

  return formattedLines;
};

// Function to format bullet points in the message
const formatBulletPoints = (elements: JSX.Element[]): JSX.Element[] => {
  const result: JSX.Element[] = [];
  let inBulletList = false;
  let listItems: string[] = [];

  elements.forEach((element, index) => {
    if (element.type === 'p') {
      const content = element.props.children as string;
      // Check if this is a bullet point (e.g., "- Item" or "• Item")
      const bulletMatch = content.match(/^\s*[\-\•]\s+(.+)$/);

      if (bulletMatch) {
        // If we're not already in a list, start a new one
        if (!inBulletList) {
          inBulletList = true;
          listItems = [];
        }

        // Add the item to the current list
        listItems.push(bulletMatch[1]);
      } else {
        // If we were in a list and now we're not, add the list to the result
        if (inBulletList) {
          result.push(
            <ul key={`bullet-list-${index}`} className="list-disc pl-6 my-2 space-y-1">
              {listItems.map((item, i) => (
                <li key={`bullet-item-${i}`} className="text-left">{item}</li>
              ))}
            </ul>
          );
          inBulletList = false;
          listItems = [];
        }

        // Add the non-list element
        result.push(element);
      }
    } else {
      // If we were in a list and now we're not, add the list to the result
      if (inBulletList) {
        result.push(
          <ul key={`bullet-list-${index}`} className="list-disc pl-6 my-2 space-y-1">
            {listItems.map((item, i) => (
              <li key={`bullet-item-${i}`} className="text-left">{item}</li>
            ))}
          </ul>
        );
        inBulletList = false;
        listItems = [];
      }

      // Add the non-paragraph element
      result.push(element);
    }
  });

  // If we ended while still in a list, add the list
  if (inBulletList) {
    result.push(
      <ul key="bullet-list-end" className="list-disc pl-6 my-2 space-y-1">
        {listItems.map((item, i) => (
          <li key={`bullet-item-${i}`} className="text-left">{item}</li>
        ))}
      </ul>
    );
  }

  return result;
};

// Function to format headings in the message
const formatHeadings = (elements: JSX.Element[]): JSX.Element[] => {
  return elements.map((element, index) => {
    if (element.type === 'p') {
      const content = element.props.children as string;

      // Check for heading patterns (e.g., "# Heading" or "## Subheading")
      if (content.startsWith('# ')) {
        return <h3 key={`heading-${index}`} className="font-bold text-lg mt-3 mb-2">{content.substring(2)}</h3>;
      } else if (content.startsWith('## ')) {
        return <h4 key={`subheading-${index}`} className="font-bold text-md mt-2 mb-1">{content.substring(3)}</h4>;
      }
    }

    return element;
  });
};

// Function to format bold and italic text
const formatInlineStyles = (elements: JSX.Element[]): JSX.Element[] => {
  return elements.map((element, index) => {
    if (element.type === 'p' || element.type === 'li') {
      const content = element.props.children as string;

      // Replace **bold** with <strong>bold</strong>
      // Replace *italic* with <em>italic</em>
      let formattedContent = content;
      let parts: React.ReactNode[] = [formattedContent];

      // Process bold text
      parts = parts.flatMap(part => {
        if (typeof part !== 'string') return [part];

        const segments = part.split(/(\*\*.*?\*\*)/g);
        return segments.map(segment => {
          const boldMatch = segment.match(/^\*\*(.*?)\*\*$/);
          return boldMatch ? <strong key={`bold-${Math.random()}`}>{boldMatch[1]}</strong> : segment;
        });
      });

      // Process italic text
      parts = parts.flatMap(part => {
        if (typeof part !== 'string') return [part];

        const segments = part.split(/(\*.*?\*)/g);
        return segments.map(segment => {
          const italicMatch = segment.match(/^\*(.*?)\*$/);
          return italicMatch ? <em key={`italic-${Math.random()}`}>{italicMatch[1]}</em> : segment;
        });
      });

      // Create a new element with the formatted content
      return React.cloneElement(element, { children: parts });
    }

    return element;
  });
};

// Main function to format the message content
export const formatMessageContent = (content: string): JSX.Element => {
  // First, format numbered lists
  let elements = formatNumberedList(content);

  // Then, format bullet points
  elements = formatBulletPoints(elements);

  // Then, format headings
  elements = formatHeadings(elements);

  // Finally, format inline styles (bold, italic)
  elements = formatInlineStyles(elements);

  return <div className="chatbot-formatted-message">{elements}</div>;
};
