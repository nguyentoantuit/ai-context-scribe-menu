
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateResponse } from '@/lib/aiHelpers';

interface AIContextMenuProps {
  position: { x: number; y: number } | null;
  onClose: () => void;
  selectedText: string;
  actionOptions: string[];
  className?: string;
}

const AIContextMenu: React.FC<AIContextMenuProps> = ({
  position,
  onClose,
  selectedText,
  actionOptions,
  className
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  if (!position) return null;
  
  // Adjust position to account for scroll
  const adjustedX = position.x + window.scrollX;
  const adjustedY = position.y + window.scrollY;

  const handleActionClick = async (action: string) => {
    setIsLoading(true);
    try {
      const result = await generateResponse(selectedText);
      setResponse(result);
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Sorry, I couldn't generate a response at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  // Determine position to avoid going off-screen
  const menuStyle: React.CSSProperties = {
    left: `${adjustedX}px`,
    top: `${adjustedY}px`,
  };

  // Check if we need to flip the menu to the left if too close to right edge
  const menuWidth = 320; // approximate width of the menu
  if (adjustedX + menuWidth > window.innerWidth) {
    menuStyle.left = 'auto';
    menuStyle.right = `${window.innerWidth - adjustedX}px`;
  }

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-transparent" 
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed z-50 w-80 p-4 rounded-lg ai-glass ai-fade-in",
          "border border-ai-primary/20 shadow-xl",
          className
        )}
        style={menuStyle}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-gradient-to-br from-ai-primary to-ai-secondary p-1.5 rounded-md">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-sm font-medium">AI Assistant</h3>
        </div>

        {!response ? (
          <>
            <p className="text-xs text-gray-500 mb-3">
              {selectedText.length > 50
                ? `"${selectedText.substring(0, 50)}..."`
                : `"${selectedText}"`}
            </p>
            <div className="space-y-1">
              {actionOptions.map((action) => (
                <button
                  key={action}
                  className="w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-ai-light dark:hover:bg-ai-dark/50 transition-colors"
                  onClick={() => handleActionClick(action)}
                  disabled={isLoading}
                >
                  {action}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="p-3 bg-ai-light/50 dark:bg-ai-dark/30 rounded-md text-sm">
            {response}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center my-2">
            <div className="w-5 h-5 border-2 border-ai-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </>
  );
};

export default AIContextMenu;
