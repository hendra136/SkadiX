export const theme = {
  colors: {
    primary: '#003d82',
    secondary: '#002752',
    accent: '#90e0ef',
    background: '#ffffff',
    text: '#333333',
    lightText: '#666666',
    success: '#2ecc71',
    warning: '#f39c12',
    danger: '#e74c3c',
    white: '#ffffff',
    black: '#000000',
    gray: '#f5f5f5',
    darkGray: '#dddddd',
    // Risk color scale (from low to high)
    riskScale: [
      '#003d82', // Dark blue - Very Low (updated)
      '#00b4d8', // Light blue - Low
      '#90e0ef', // Cyan - Moderate Low
      '#ade8f4', // Light cyan - Moderate
      '#48cae4', // Teal - Moderate High
      '#ffd166', // Yellow - Medium
      '#ffb703', // Gold - Medium High
      '#fb8500', // Orange - High
      '#fd7e14', // Dark orange - Very High
      '#dc2f02', // Red - Extreme
    ],
  },
  fonts: {
    primary: '"Roboto", "Helvetica Neue", sans-serif',
    heading: '"Montserrat", "Helvetica Neue", sans-serif',
    monospace: '"Roboto Mono", monospace',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
};

export type ThemeType = typeof theme;