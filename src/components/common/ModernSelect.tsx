import React from 'react';
import styled from 'styled-components';

interface ModernSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}

const SelectContainer = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  position: relative;
  width: 100%;
  min-width: ${props => {
    switch (props.size) {
      case 'small': return '120px';
      case 'large': return '200px';
      default: return '160px';
    }
  }};
`;

const selectStyles = {
  base: `
    width: 100%;
    font-weight: 500;
    color: #333333;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230077b6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
    box-shadow: 0 2px 8px rgba(0, 61, 130, 0.08);
  `,
  small: 'padding: 8px 32px 8px 12px; font-size: 13px;',
  medium: 'padding: 12px 36px 12px 14px; font-size: 14px;',
  large: 'padding: 16px 40px 16px 16px; font-size: 16px;'
};

const StyledSelect = styled.select`
  ${selectStyles.base}
  ${(props: any) => selectStyles[props['data-size'] as keyof typeof selectStyles] || selectStyles.medium}

  &:hover {
    border-color: rgba(0, 119, 182, 0.5);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%);
    box-shadow: 0 4px 16px rgba(0, 61, 130, 0.12);
    transform: translateY(-1px);
  }

  &:focus {
    border-color: rgba(0, 119, 182, 0.7);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%);
    box-shadow: 0 0 0 3px rgba(0, 119, 182, 0.1), 0 4px 16px rgba(0, 61, 130, 0.15);
  }

  &:focus-visible {
    outline: 2px solid rgba(0, 119, 182, 0.5);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(243, 244, 246, 0.8);
    border-color: rgba(209, 213, 219, 0.5);

    &:hover {
      background: rgba(243, 244, 246, 0.8);
      border-color: rgba(209, 213, 219, 0.5);
      box-shadow: none;
      transform: none;
    }
  }

  option {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
    color: #333333;
    padding: 10px 14px;
    font-weight: 500;
    border: none;
    margin: 2px 0;

    &:hover {
      background: linear-gradient(135deg, rgba(0, 119, 182, 0.1) 0%, rgba(0, 61, 130, 0.05) 100%);
      color: #0077b6;
    }

    &:checked,
    &:selected {
      background: linear-gradient(135deg, #0077b6 0%, #005f73 100%);
      color: #ffffff;
      font-weight: 600;
    }

    &:disabled {
      opacity: 0.5;
      color: #9ca3af;
    }
  }
`;

const ModernSelect: React.FC<ModernSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  className,
  size = 'medium',
  style
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <SelectContainer size={size} className={className}>
      <StyledSelect
        value={value}
        onChange={handleChange}
        disabled={disabled}
        data-size={size}
        style={style}
        aria-label={placeholder || 'Select an option'}
        role="combobox"
        aria-expanded="false"
        aria-haspopup="listbox"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

export default ModernSelect;