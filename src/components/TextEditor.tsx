
import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const [showButton, setShowButton] = useState<boolean>(true);
  const [actionOptions, setActionOptions] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  // Position button at bottom right of editor initially and when no text is selected
  const positionButtonAtBottomRight = useCallback(() => {
    if (editorRef.current) {
      const editorRect = editorRef.current.getBoundingClientRect();
      setButtonPosition({
        x: editorRect.right - 20,
        y: editorRect.bottom - 20
      });
    }
  }, []);

  // Handle text selection
  const handleSelection = useCallback(() => {
    const selected = getSelectedText();
    setSelectedText(selected);
    
    if (selected) {
      // When text is selected, position button at the end of selection
      const position = getSelectionPosition();
      if (position) {
        setButtonPosition(position);
      }
      setActionOptions(generateActionOptions(selected));
    } else {
      // When no text is selected, reposition to bottom right
      positionButtonAtBottomRight();
    }
  }, [positionButtonAtBottomRight]);

  // Initial positioning and repositioning when editor changes
  useEffect(() => {
    positionButtonAtBottomRight();
  }, [positionButtonAtBottomRight, text]);

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
    window.addEventListener('resize', positionButtonAtBottomRight);
    
    return () => {
      document.removeEventListener('selectionchange', handleSelection);
      window.removeEventListener('resize', positionButtonAtBottomRight);
    };
  }, [handleSelection, positionButtonAtBottomRight]);

  return (
    <div className="relative w-full">
      <Card className="w-full shadow-md">
        <CardContent className="p-6">
          <div 
            ref={editorRef}
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
        className="fixed-bottom-right"
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
