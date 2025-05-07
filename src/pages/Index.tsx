
import { useState } from 'react';
import TextEditor from '@/components/TextEditor';

const Index = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            AI-Powered Text Editor
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Select text to see the AI assistant in action
          </p>
        </div>
        
        <TextEditor />
        
        <div className="mt-8 p-4 bg-ai-light/50 dark:bg-ai-dark/30 rounded-lg text-sm text-gray-600 dark:text-gray-300">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">How to use:</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Select some text in the editor above</li>
            <li>Click on the AI button that appears</li>
            <li>Choose an action from the context menu</li>
            <li>View the AI-generated response</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Index;
