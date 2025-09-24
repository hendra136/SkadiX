import React from 'react';
import styled from 'styled-components';
import { FiSliders } from 'react-icons/fi';

const FABContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1001;
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const FAB = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors?.primary || '#0077b6'} 0%, 
    ${({ theme }) => theme.colors?.secondary || '#005f73'} 100%
  );
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 8px 24px rgba(0, 119, 182, 0.3),
    0 4px 12px rgba(0, 119, 182, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 
      0 12px 32px rgba(0, 119, 182, 0.4),
      0 6px 16px rgba(0, 119, 182, 0.3);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:focus {
    outline: none;
    box-shadow: 
      0 8px 24px rgba(0, 119, 182, 0.3),
      0 4px 12px rgba(0, 119, 182, 0.2),
      0 0 0 3px rgba(0, 123, 255, 0.3);
  }
`;

interface MobileControlsProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const MobileControls: React.FC<MobileControlsProps> = ({ 
  isSidebarOpen, 
  toggleSidebar 
}) => {
  return (
    <FABContainer>
      <FAB
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? 'Close settings' : 'Open settings'}
      >
        {(FiSliders as any)({ size: 24 })}
      </FAB>
    </FABContainer>
  );
};

export default MobileControls;