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
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
  `,
  small: 'padding: 8px 32px 8px 12px; font-size: 13px;',
  medium: 'padding: 12px 36px 12px 14px; font-size: 14px;',
  large: 'padding: 16px 40px 16px 16px; font-size: 16px;'
};

const StyledSelect = styled.select`
  ${selectStyles.base}
  ${(props: any) => selectStyles[props['data-size'] as keyof typeof selectStyles] || selectStyles.medium}

  &:hover {
    border-color: #3b82f6;
    background: #f8fafc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #f3f4f6;
    border-color: #d1d5db;

    &:hover {
      background: #f3f4f6;
      border-color: #d1d5db;
      box-shadow: none;
    }
  }

  option {
    background: #ffffff;
    color: #333333;
    padding: 8px 12px;
    font-weight: 500;

    &:hover {
      background: #f3f4f6;
    }

    &:checked,
    &:selected {
      background: #3b82f6;
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