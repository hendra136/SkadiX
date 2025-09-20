import React from 'react';
import styled from 'styled-components';

const MobileControlsContainer = styled.div<{ isIndicatorExpanded?: boolean }>`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    position: fixed;
    top: ${({ isIndicatorExpanded }) => isIndicatorExpanded ? '520px' : '140px'};
    right: 20px;
    z-index: 450;
    gap: 10px;
    flex-direction: column;
    transition: top 0.3s ease;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: ${({ isIndicatorExpanded }) => isIndicatorExpanded ? '500px' : '130px'};
    right: 15px;
    gap: 8px;
   }
`;

const ControlButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) => active 
    ? 'linear-gradient(135deg, #003d82 0%, #002752 100%)' 
    : 'linear-gradient(135deg, #6c757d 0%, #495057 100%)'};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  min-height: 44px;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ active }) => active 
    ? '0px 4px 12px rgba(0, 61, 130, 0.3)' 
    : '0px 4px 12px rgba(108, 117, 125, 0.3)'};
  
  &:hover {
    background: ${({ active }) => active 
      ? 'linear-gradient(135deg, #002752 0%, #001a3d 100%)' 
      : 'linear-gradient(135deg, #5a6268 0%, #343a40 100%)'};
    transform: scale(1.03);
    box-shadow: ${({ active }) => active 
      ? '0px 6px 16px rgba(0, 61, 130, 0.4)' 
      : '0px 6px 16px rgba(108, 117, 125, 0.4)'};
  }
  
  &:focus {
    box-shadow: ${({ active }) => active 
      ? '0px 6px 16px rgba(0, 61, 130, 0.4), 0 0 0 3px rgba(0, 61, 130, 0.3)' 
      : '0px 6px 16px rgba(108, 117, 125, 0.4), 0 0 0 3px rgba(108, 117, 125, 0.3)'};
    outline: none;
  }
  
  &:active {
    background: ${({ active }) => active 
      ? 'linear-gradient(135deg, #001a3d 0%, #000f26 100%)' 
      : 'linear-gradient(135deg, #343a40 0%, #212529 100%)'};
    transform: scale(1);
    box-shadow: ${({ active }) => active 
      ? '0px 4px 12px rgba(0, 61, 130, 0.3)' 
      : '0px 4px 12px rgba(108, 117, 125, 0.3)'};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 10px 16px;
    font-size: 0.8rem;
    min-height: 40px;
    min-width: 100px;
    border-radius: 6px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    padding: 8px 12px;
    font-size: 0.75rem;
    min-height: 36px;
    min-width: 90px;
    border-radius: 6px;
  }
`;

interface MobileControlsProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isIndicatorExpanded?: boolean;
}

const MobileControls: React.FC<MobileControlsProps> = ({ isSidebarOpen, toggleSidebar, isIndicatorExpanded }) => {
  return (
    <MobileControlsContainer isIndicatorExpanded={isIndicatorExpanded}>
      <ControlButton 
        active={isSidebarOpen} 
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? 'Hide Settings' : 'Show Settings'}
      </ControlButton>
    </MobileControlsContainer>
  );
};

export default MobileControls;