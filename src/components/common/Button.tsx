import React, { ButtonHTMLAttributes, ElementType, ReactNode } from "react";
import styled, { css } from "styled-components";
import { darken } from "polished";

type ButtonVariant = "primary" | "secondary" | "outline" | "text" | "inverse" | "striped" | "primaryOutline" | "transparentOutline" | "generateReport";
type ButtonSize = "small" | "medium" | "large";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  as?: ElementType;
  to?: string;
};

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonContainer = styled.button.withConfig({
  shouldForwardProp: (prop) => !["fullWidth", "iconPosition"].includes(prop),
})<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  iconPosition: "left" | "right";
  as?: ElementType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.medium};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  ${({ iconPosition }) =>
    iconPosition === "right"
      ? css`
          flex-direction: row-reverse;
          .icon {
            margin-left: 0.5rem;
            margin-right: 0;
          }
        `
      : css`
          flex-direction: row;
          .icon {
            margin-right: 0.5rem;
            margin-left: 0;
          }
        `}

  /* Size styles */
  ${({ size }) =>
    size === "small" &&
    css`
      padding: 10px 20px;
      font-size: 0.85rem;
      min-height: 40px;
      border-radius: 6px;
    `}
  
  ${({ size }) =>
    size === "medium" &&
    css`
      padding: 14px 28px;
      font-size: 0.95rem;
      min-height: 48px;
      border-radius: 8px;
    `}
  /* button view all case CTA */
  ${({ size }) =>
    size === "large" &&
    css`
      padding: 16px 32px;
      font-size: 1.1rem;
      min-height: 56px;
      border-radius: 10px;
    `}
  
  /* Variant styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case "primary":
        return css`
          background: linear-gradient(135deg, #003d82 0%, #002752 100%);
          color: #ffffff;
          border: 2px solid #003d82;
          box-shadow: 0px 4px 12px rgba(0, 61, 130, 0.3);

          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #002752 0%, #001a3d 100%);
            transform: scale(1.03);
            box-shadow: 0px 6px 16px rgba(0, 61, 130, 0.4);
          }

          &:focus:not(:disabled) {
            outline: 3px solid rgba(0, 123, 255, 0.3);
            outline-offset: 2px;
            box-shadow: 0px 6px 16px rgba(0, 61, 130, 0.4);
          }

          &:active:not(:disabled) {
            transform: scale(0.98);
            box-shadow: 0px 2px 8px rgba(0, 61, 130, 0.2);
          }

          &:disabled {
            background: ${theme.colors.gray};
            color: ${theme.colors.lightGray};
            border-color: ${theme.colors.gray};
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
        `;

      case "secondary":
        return css`
          background: ${theme.colors.secondary};
          color: ${theme.colors.white};
          border: 2px solid ${theme.colors.secondary};

          &:hover:not(:disabled) {
            background: ${darken(0.1, theme.colors.secondary)};
            border-color: ${darken(0.1, theme.colors.secondary)};
          }

          &:disabled {
            background: ${theme.colors.gray};
            color: ${theme.colors.lightGray};
            border-color: ${theme.colors.gray};
            cursor: not-allowed;
          }
        `;

      case "outline":
        return css`
          background: linear-gradient(135deg, #003d82 0%, #002752 100%);
          color: #ffffff;
          border: 2px solid #003d82;
          box-shadow: 0px 4px 12px rgba(0, 61, 130, 0.3);

          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
            transform: scale(1.03);
            box-shadow: 0px 6px 16px rgba(0, 86, 179, 0.4);
          }

          &:focus:not(:disabled) {
            outline: 3px solid rgba(0, 123, 255, 0.3);
            outline-offset: 2px;
            box-shadow: 0px 6px 16px rgba(0, 61, 130, 0.4);
          }

          &:active:not(:disabled) {
            transform: scale(0.98);
            box-shadow: 0px 2px 8px rgba(0, 61, 130, 0.2);
          }

          &:disabled {
            background: transparent;
            color: ${theme.colors.gray};
            border-color: ${theme.colors.gray};
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
        `;

      case "transparentOutline":
        return css`
          background: transparent;
          color: #ffffff;
          border: 2px solid #ffffff;
          box-shadow: none;

          &:hover:not(:disabled) {
            background: rgba(255, 255, 255, 0.1);
            border-color: #ffffff;
            transform: scale(1.03);
            box-shadow: 0px 4px 12px rgba(255, 255, 255, 0.2);
          }

          &:focus:not(:disabled) {
            outline: 3px solid rgba(255, 255, 255, 0.3);
            outline-offset: 2px;
            box-shadow: 0px 4px 12px rgba(255, 255, 255, 0.2);
          }

          &:active:not(:disabled) {
            transform: scale(0.98);
            background: rgba(255, 255, 255, 0.15);
          }

          &:disabled {
            background: transparent;
            color: rgba(255, 255, 255, 0.5);
            border-color: rgba(255, 255, 255, 0.5);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
        `;

      case "generateReport":
        return css`
          background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
          color: #ffffff;
          border: none;
          box-shadow: 0px 4px 12px rgba(0, 123, 182, 0.3);
          font-weight: 600;
          position: relative;

          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
            color: #ffffff;
            transform: scale(1.03);
            box-shadow: 0px 6px 16px rgba(0, 123, 182, 0.4);
          }

          &:focus:not(:disabled) {
            outline: 3px solid rgba(0, 123, 255, 0.3);
            outline-offset: 2px;
            box-shadow: 0px 6px 16px rgba(0, 123, 182, 0.4);
            color: #ffffff;
          }

          &:active:not(:disabled) {
            transform: scale(0.98);
            box-shadow: 0px 2px 8px rgba(0, 123, 182, 0.2);
            color: #ffffff;
          }

          &:disabled {
            background: ${theme.colors.gray};
            color: ${theme.colors.lightGray};
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
        `;

      case "text":
        return css`
          background: transparent;
          color: #ffffff;
          border: none;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          font-weight: 600;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            background: rgba(0, 0, 0, 0.8);
            color: #ffffff;
            text-decoration: none;
            transform: scale(1.05);
            border-radius: 8px;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
          }

          &:focus {
            outline: 2px solid #ffffff;
            outline-offset: 2px;
          }

          &:active {
            background: rgba(0, 0, 0, 0.9);
            color: #ffffff;
            transform: scale(1);
          }

          &:disabled {
            color: #adb5bd;
            cursor: not-allowed;
            text-decoration: none;
            transform: none;
          }
        `;

      case "inverse":
        return css`
          background: transparent;
          color: #ffffff;
          border: 2px solid #ffffff;
          font-weight: 600;
          box-shadow: 0px 4px 12px rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            background: rgba(0, 0, 0, 0.8);
            color: #ffffff;
            border-color: #ffffff;
            transform: scale(1.03);
            box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.4);
          }

          &:focus {
            box-shadow: 0px 6px 16px rgba(255, 255, 255, 0.4), 0 0 0 3px rgba(255, 255, 255, 0.3);
            outline: none;
          }

          &:active {
            background: rgba(0, 0, 0, 0.9);
            color: #ffffff;
            transform: scale(1);
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
          }

          &:disabled {
            background: #adb5bd;
            color: #ffffff;
            border-color: #adb5bd;
            cursor: not-allowed;
            transform: none;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
          }
        `;

      case "striped":
        return css`
          background-color: transparent;
          color: ${theme.colors.white};
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 2px solid ${theme.colors.white};
            border-radius: ${theme.borderRadius.medium};
            background: repeating-linear-gradient(45deg, transparent, transparent 5px, ${theme.colors.white} 5px, ${theme.colors.white} 10px);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
          }

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.medium};
          }

          &:active {
            background-color: rgba(255, 255, 255, 0.2);
            transform: translateY(0);
          }

          &:disabled {
            color: ${theme.colors.gray};
            cursor: not-allowed;
            transform: none;
            box-shadow: none;

            &::before {
              border-color: ${theme.colors.gray};
              background: repeating-linear-gradient(45deg, transparent, transparent 5px, ${theme.colors.gray} 5px, ${theme.colors.gray} 10px);
            }
          }
        `;

      case "primaryOutline":
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 2px solid ${theme.colors.primary};

          &:hover {
            background-color: ${theme.colors.white};
            color: ${theme.colors.primary};
            border-color: ${theme.colors.primary};
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.medium};
          }

          &:active {
            background-color: ${darken(0.05, theme.colors.white)};
            transform: translateY(0);
          }

          &:disabled {
            color: ${theme.colors.gray};
            border-color: ${theme.colors.gray};
            cursor: not-allowed;
            transform: none;
            box-shadow: none;

            &:hover {
              background-color: transparent;
              color: ${theme.colors.gray};
              transform: none;
              box-shadow: none;
            }
          }
        `;

      default:
        return css`
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          border: 2px solid ${theme.colors.primary};
        `;
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", size = "medium", fullWidth = false, icon, iconPosition = "left", as, ...props }) => {
  return (
    <ButtonContainer variant={variant} size={size} fullWidth={fullWidth} iconPosition={iconPosition} as={as} {...props}>
      {icon && <span className="icon">{icon}</span>}
      {children}
    </ButtonContainer>
  );
};

export default Button;
