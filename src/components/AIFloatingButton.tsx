
import React from 'react';
import { BotMessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIFloatingButtonProps {
  position: { x: number; y: number };
  onClick: () => void;
  className?: string;
  isVisible: boolean;
}

const AIFloatingButton: React.FC<AIFloatingButtonProps> = ({
  position,
  onClick,
  className,
  isVisible
}) => {
  if (!isVisible) return null;
  
  // Adjust position to account for scroll
  const adjustedX = position.x + window.scrollX;
  const adjustedY = position.y + window.scrollY;
  
  return (
    <button
      className={cn(
        "fixed z-50 p-2.5 rounded-full ai-glass ai-gradient shadow-lg transition-all duration-200 ai-fade-in",
        "hover:shadow-ai-primary/20 hover:scale-105",
        className
      )}
      style={{
        left: `${adjustedX}px`,
        top: `${adjustedY}px`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={onClick}
      aria-label="AI Assistant"
    >
      <BotMessageSquare className="w-4 h-4 text-white ai-pulse" />
    </button>
  );
};

export default AIFloatingButton;
