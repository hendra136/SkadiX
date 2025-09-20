import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  button {
    font-family: ${({ theme }) => theme.fonts.primary};
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  /* Leaflet map container must have a defined height */
  .leaflet-container {
    width: 100%;
    height: 100%;
  }

  /* Responsive improvements */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
      line-height: 1.4;
    }

    /* Ensure proper touch targets on mobile */
    button, a, input, select {
      min-height: 44px;
      min-width: 44px;
    }

    /* Prevent horizontal scroll on mobile */
    html, body {
      overflow-x: hidden;
      max-width: 100vw;
    }

    /* Improve text readability on mobile */
    h1, h2, h3, h4, h5, h6 {
      line-height: 1.3;
      margin-bottom: 0.75rem;
    }

    p {
      margin-bottom: 0.75rem;
    }
  }

  @media (max-width: 576px) {
    body {
      font-size: 13px;
    }

    /* Smaller spacing on very small screens */
    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 0.5rem;
    }

    p {
      margin-bottom: 0.5rem;
    }
  }
`;