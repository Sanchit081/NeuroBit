import React from 'react';

// This component provides a fallback for SVG images that might fail to load
const SVGFallback = ({ src, alt, className, ...props }) => {
  const [error, setError] = React.useState(false);

  // If the SVG fails to load, this will be triggered
  const handleError = () => {
    console.warn(`SVG failed to load: ${src}`);
    setError(true);
  };

  // If there's an error, render a simple placeholder
  if (error) {
    return (
      <div 
        className={`svg-fallback ${className || ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          padding: '20px',
          minHeight: '100px',
          ...props.style
        }}
      >
        <p style={{ color: '#666', textAlign: 'center' }}>
          {alt || 'Image unavailable'}
        </p>
      </div>
    );
  }

  // Otherwise, render the SVG image
  return (
    <img 
      src={src} 
      alt={alt || 'SVG Image'} 
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

export default SVGFallback;