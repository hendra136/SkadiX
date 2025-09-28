import React, { useState } from 'react';
import styled from 'styled-components';
import { useFloating, autoUpdate, offset, flip, shift, size as sizeMiddleware } from '@floating-ui/react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface ModernSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SelectTrigger = styled.button<{ 
  size: 'small' | 'medium' | 'large'; 
  error?: boolean; 
  isOpen?: boolean;
  disabled?: boolean;
}>`
  width: 100%;
  padding: ${({ size }) => {
    switch (size) {
      case 'small': return '0.5rem 2rem 0.5rem 0.75rem';
      case 'large': return '0.875rem 2.5rem 0.875rem 1rem';
      default: return '0.75rem 2.25rem 0.75rem 0.875rem';
    }
  }};
  border: 2px solid ${({ error, theme }) => 
    error ? '#ef4444' : 'rgba(0, 119, 182, 0.2)'
  };
  border-radius: 8px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 250, 252, 0.9) 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.colors?.text || '#333'};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small': return '0.875rem';
      case 'large': return '1rem';
      default: return '0.9rem';
    }
  }};
  font-weight: 500;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  text-align: left;
  position: relative;
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};
  
  /* Arrow icon */
  &::after {
    content: '';
    position: absolute;
    right: ${({ size }) => {
      switch (size) {
        case 'small': return '0.75rem';
        case 'large': return '1rem';
        default: return '0.875rem';
      }
    }};
    top: 50%;
    transform: translateY(-50%) ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid ${({ theme }) => theme.colors?.primary || '#0077b6'};
    transition: transform 0.2s ease;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors?.primary || '#0077b6'};
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 1) 0%, 
      rgba(248, 250, 252, 0.95) 100%
    );
    box-shadow: 0 4px 12px rgba(0, 119, 182, 0.15);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors?.primary || '#0077b6'};
    box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ size }) => {
      switch (size) {
        case 'small': return '0.5rem 1.75rem 0.5rem 0.625rem';
        case 'large': return '0.75rem 2rem 0.75rem 0.875rem';
        default: return '0.625rem 2rem 0.625rem 0.75rem';
      }
    }};
    font-size: ${({ size }) => {
      switch (size) {
        case 'small': return '0.8rem';
        case 'large': return '0.95rem';
        default: return '0.85rem';
      }
    }};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ size }) => {
      switch (size) {
        case 'small': return '0.5rem 1.5rem 0.5rem 0.5rem';
        case 'large': return '0.625rem 1.75rem 0.625rem 0.75rem';
        default: return '0.5rem 1.75rem 0.5rem 0.625rem';
      }
    }};
    font-size: ${({ size }) => {
      switch (size) {
        case 'small': return '0.75rem';
        case 'large': return '0.9rem';
        default: return '0.8rem';
      }
    }};
  }
`;

const DropdownMenu = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.98) 0%, 
    rgba(248, 250, 252, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 119, 182, 0.2);
  border-radius: 8px;
  box-shadow: 
    0 10px 25px rgba(0, 61, 130, 0.15),
    0 4px 12px rgba(0, 61, 130, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  min-width: 100%;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(241, 245, 249, 0.3);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, 
      rgba(0, 119, 182, 0.6) 0%, 
      rgba(0, 95, 115, 0.4) 100%
    );
    border-radius: 2px;
  }
`;

const DropdownOption = styled.div<{ 
  size: 'small' | 'medium' | 'large';
  isSelected?: boolean;
  isHighlighted?: boolean;
}>`
  padding: ${({ size }) => {
    switch (size) {
      case 'small': return '0.5rem 0.75rem';
      case 'large': return '0.875rem 1rem';
      default: return '0.75rem 0.875rem';
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case 'small': return '0.875rem';
      case 'large': return '1rem';
      default: return '0.9rem';
    }
  }};
  color: ${({ theme, isSelected }) => 
    isSelected ? (theme.colors?.primary || '#0077b6') : (theme.colors?.text || '#333')
  };
  background: ${({ isHighlighted, isSelected }) => {
    if (isSelected) return 'rgba(0, 119, 182, 0.1)';
    if (isHighlighted) return 'rgba(0, 119, 182, 0.05)';
    return 'transparent';
  }};
  cursor: pointer;
  transition: all 0.15s ease;
  font-weight: ${({ isSelected }) => isSelected ? '600' : '500'};
  border-left: ${({ isSelected, theme }) => 
    isSelected ? `3px solid ${theme.colors?.primary || '#0077b6'}` : '3px solid transparent'
  };

  &:hover {
    background: rgba(0, 119, 182, 0.08);
    color: ${({ theme }) => theme.colors?.primary || '#0077b6'};
  }

  &:first-child {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }

  &:last-child {
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ size }) => {
      switch (size) {
        case 'small': return '0.5rem 0.625rem';
        case 'large': return '0.75rem 0.875rem';
        default: return '0.625rem 0.75rem';
      }
    }};
    font-size: ${({ size }) => {
      switch (size) {
        case 'small': return '0.8rem';
        case 'large': return '0.95rem';
        default: return '0.85rem';
      }
    }};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ size }) => {
      switch (size) {
        case 'small': return '0.5rem 0.5rem';
        case 'large': return '0.625rem 0.75rem';
        default: return '0.5rem 0.625rem';
      }
    }};
    font-size: ${({ size }) => {
      switch (size) {
        case 'small': return '0.75rem';
        case 'large': return '0.9rem';
        default: return '0.8rem';
      }
    }};
  }
`;

const PlaceholderText = styled.span`
  color: #9ca3af;
  font-style: italic;
`;

const ModernSelect: React.FC<ModernSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  size = 'medium',
  disabled = false,
  error = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const { refs, floatingStyles, update } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
       offset(4),
       flip(),
       shift({ padding: 8 }),
       sizeMiddleware({
         apply({ rects, elements }) {
           Object.assign(elements.floating.style, {
             minWidth: `${rects.reference.width}px`,
           });
         },
       }),
     ],
    whileElementsMounted: autoUpdate,
  });

  const selectedOption = options.find(option => option.value === value);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setHighlightedIndex(-1);
      // Force update positioning when opening
      if (!isOpen) {
        setTimeout(() => update(), 0);
      }
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          handleOptionClick(options[highlightedIndex].value);
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          );
        }
        break;
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Ensure event target is a valid Node
      if (!event.target || !(event.target instanceof Node)) {
        return;
      }
      
      const target = event.target;
      const floatingEl = refs.floating.current;
      const referenceEl = refs.reference.current;
      
      // Check if floating/reference elements are HTMLElements with contains method
      if (floatingEl && floatingEl instanceof HTMLElement &&
          referenceEl && referenceEl instanceof HTMLElement &&
          !floatingEl.contains(target) &&
          !referenceEl.contains(target)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, refs.floating, refs.reference]);

  return (
    <SelectContainer className={className}>
      <SelectTrigger
        ref={refs.setReference}
        size={size}
        error={error}
        isOpen={isOpen}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={placeholder}
      >
        {selectedOption ? (
          selectedOption.label
        ) : (
          <PlaceholderText>{placeholder}</PlaceholderText>
        )}
      </SelectTrigger>

      {isOpen && (
        <DropdownMenu
          ref={refs.setFloating}
          style={floatingStyles}
          size={size}
          role="listbox"
        >
          {options.map((option, index) => (
            <DropdownOption
              key={option.value}
              size={size}
              isSelected={option.value === value}
              isHighlighted={index === highlightedIndex}
              onClick={() => handleOptionClick(option.value)}
              onMouseEnter={() => setHighlightedIndex(index)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </SelectContainer>
  );
};

export default ModernSelect;