import React from 'react';
import styled from 'styled-components';
import { useMap } from 'react-leaflet';

interface ModernZoomControlProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

const ZoomControlContainer = styled.div<{ position: string }>`
  position: absolute;
  z-index: 1000;
  display: none; /* Hide zoom controls completely */
  flex-direction: column;
  gap: 2px;
  
  ${({ position }) => {
    switch (position) {
      case 'top-left':
        return `
          top: 20px;
          left: 20px;
        `;
      case 'top-right':
        return `
          top: 20px;
          right: 20px;
        `;
      case 'bottom-left':
        return `
          bottom: 20px;
          left: 20px;
        `;
      case 'bottom-right':
        return `
          bottom: 20px;
          right: 20px;
        `;
      default:
        return `
          top: 20px;
          left: 20px;
        `;
    }
  }}

  @media (max-width: 992px) {
    gap: 8px;
    ${({ position }) => {
      switch (position) {
        case 'top-left':
          return `
            top: 18px;
            left: 18px;
          `;
        case 'top-right':
          return `
            top: 18px;
            right: 18px;
          `;
        case 'bottom-left':
          return `
            bottom: 18px;
            left: 18px;
          `;
        case 'bottom-right':
          return `
            bottom: 18px;
            right: 18px;
          `;
        default:
          return `
            top: 18px;
            left: 18px;
          `;
      }
    }}
  }

  @media (max-width: 768px) {
    gap: 6px;
    ${({ position }) => {
      switch (position) {
        case 'top-left':
          return `
            top: 15px;
            left: 15px;
          `;
        case 'top-right':
          return `
            top: 15px;
            right: 15px;
          `;
        case 'bottom-left':
          return `
            bottom: 15px;
            left: 15px;
          `;
        case 'bottom-right':
          return `
            bottom: 15px;
            right: 15px;
          `;
        default:
          return `
            top: 15px;
            left: 15px;
          `;
      }
    }}
  }

  @media (max-width: 576px) {
    gap: 4px;
    padding: 8px;
    ${({ position }) => {
      switch (position) {
        case 'top-left':
          return `
            top: 12px;
            left: 12px;
          `;
        case 'top-right':
          return `
            top: 12px;
            right: 12px;
          `;
        case 'bottom-left':
          return `
            bottom: 12px;
            left: 12px;
          `;
        case 'bottom-right':
          return `
            bottom: 12px;
            right: 12px;
          `;
        default:
          return `
            top: 12px;
            left: 12px;
          `;
      }
    }}
  }

  @media (max-width: 480px) {
    gap: 3px;
    padding: 6px;
    ${({ position }) => {
      switch (position) {
        case 'top-left':
          return `
            top: 10px;
            left: 10px;
          `;
        case 'top-right':
          return `
            top: 10px;
            right: 10px;
          `;
        case 'bottom-left':
          return `
            bottom: 10px;
            left: 10px;
          `;
        case 'bottom-right':
          return `
            bottom: 10px;
            right: 10px;
          `;
        default:
          return `
            top: 10px;
            left: 10px;
          `;
      }
    }}
  }
`;

const ZoomButton = styled.button`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.9) 0%, 
    rgba(147, 51, 234, 0.9) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  position: relative;
  overflow: hidden;
  
  /* Glass morphism overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      rgba(255, 255, 255, 0.05) 50%,
      transparent 100%
    );
    border-radius: 12px;
    pointer-events: none;
  }

  /* Icon styling */
  &::after {
    position: relative;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-2px) scale(1.05);
    background: linear-gradient(135deg, 
      rgba(59, 130, 246, 1) 0%, 
      rgba(147, 51, 234, 1) 100%
    );
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 
      0 12px 32px rgba(59, 130, 246, 0.3),
      0 6px 16px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 
      0 8px 24px rgba(59, 130, 246, 0.25),
      0 4px 12px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:focus {
    box-shadow: 
      0 0 0 3px rgba(59, 130, 246, 0.3),
      0 12px 32px rgba(59, 130, 246, 0.3),
      0 6px 16px rgba(0, 0, 0, 0.15);
  }

  /* Keyboard navigation support */
  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
      background: linear-gradient(135deg, 
        rgba(59, 130, 246, 0.9) 0%, 
        rgba(147, 51, 234, 0.9) 100%
      );
    }
  }

  /* Responsive sizing */
  @media (max-width: 992px) {
    width: 42px;
    height: 42px;
    font-size: 17px;
    border-radius: 11px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
    border-radius: 10px;
  }

  @media (max-width: 576px) {
    width: 38px;
    height: 38px;
    font-size: 15px;
    border-radius: 9px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
    border-radius: 8px;
  }
`;

const ZoomInButton = styled(ZoomButton)`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  
  @media (max-width: 768px) {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  
  @media (max-width: 480px) {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }
`;

const ZoomOutButton = styled(ZoomButton)`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  
  @media (max-width: 768px) {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  
  @media (max-width: 480px) {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }
`;

const ModernZoomControl: React.FC<ModernZoomControlProps> = ({
  position = 'top-left',
  className
}) => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const currentZoom = map.getZoom();
  const maxZoom = map.getMaxZoom();
  const minZoom = map.getMinZoom();

  return (
    <ZoomControlContainer 
      position={position} 
      className={className}
      role="group"
      aria-label="Map zoom controls"
    >
      <ZoomInButton
        onClick={handleZoomIn}
        disabled={currentZoom >= maxZoom}
        title="Zoom in"
        aria-label="Zoom in"
      >
        +
      </ZoomInButton>
      <ZoomOutButton
        onClick={handleZoomOut}
        disabled={currentZoom <= minZoom}
        title="Zoom out"
        aria-label="Zoom out"
      >
        −
      </ZoomOutButton>
    </ZoomControlContainer>
  );
};

export default ModernZoomControl;