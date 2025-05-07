
import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AIFloatingButton from './AIFloatingButton';
import AIContextMenu from './AIContextMenu';
import { 
  getSelectedText, 
  getSelectionPosition,
  generateActionOptions
} from '@/lib/aiHelpers';

const TextEditor: React.FC = () => {
  const [text, setText] = useState<string>(
    "Welcome to the AI-powered text editor! Try selecting some text to see the AI assistant button appear.\n\nHere are some examples you can try:\n\n1. Select this text and use the AI assistant to generate a response.\n\n2. Hello AI, can you help me understand how this works?\n\n3. Summarize this paragraph for a quick overview."
  );
  const [selectedText, setSelectedText] = useState<string>('');
  const [buttonPosition, setButtonPosition] = useState<{ x: number; y: number }>({ x: 20, y: 20 });
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [showButton, setShowButton] = useState<boolean>(true); // Always show the button
  const [actionOptions, setActionOptions] = useState<string[]>([]);

  // Handle text selection
  const handleSelection = useCallback(() => {
    const selected = getSelectedText();
    setSelectedText(selected);
    
    if (selected) {
      const position = getSelectionPosition();
      if (position) {
        setButtonPosition(position);
      }
      setActionOptions(generateActionOptions(selected));
    }
  }, []);

  // Handle button click
  const handleButtonClick = () => {
    setMenuPosition(buttonPosition);
  };

  // Handle closing the menu
  const handleCloseMenu = () => {
    setMenuPosition(null);
  };

  // Set up selection event listeners
  useEffect(() => {
    document.addEventListener('selectionchange', handleSelection);
    window.addEventListener('resize', handleSelection);
    
    return () => {
      document.removeEventListener('selectionchange', handleSelection);
      window.removeEventListener('resize', handleSelection);
    };
  }, [handleSelection]);

  return (
    <div className="relative w-full">
      <Card className="w-full shadow-md">
        <CardContent className="p-6">
          <div 
            className="min-h-[300px] p-4 border rounded-md focus-within:ring-2 focus-within:ring-ai-primary/40 focus-within:border-ai-primary/40"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setText(e.currentTarget.textContent || '')}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </CardContent>
      </Card>
      
      <AIFloatingButton 
        position={buttonPosition}
        onClick={handleButtonClick}
        isVisible={showButton}
      />
      
      {menuPosition && (
        <AIContextMenu
          position={menuPosition}
          onClose={handleCloseMenu}
          selectedText={selectedText}
          actionOptions={actionOptions}
        />
      )}
    </div>
  );
};

export default TextEditor;
