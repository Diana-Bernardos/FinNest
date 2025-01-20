import React from 'react';

const Loading: React.FC = () => {
  console.log('Renderizando Loading'); // Debug

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo border-t-transparent" />
    </div>
  );
};

export default Loading;