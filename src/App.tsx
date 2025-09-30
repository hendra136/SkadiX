import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { AppContextProvider } from './context/AppContext';
import ErrorBoundary from './components/common/ErrorBoundary';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ScenarioStudio from './components/scenario/ScenarioStudio';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContextProvider>
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/scenario-studio" element={<ScenarioStudio />} />
              <Route path="/features" element={<Navigate to="/#features" replace />} />
              <Route path="/how-it-works" element={<Navigate to="/#how-it-works" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </AppContextProvider>
    </ThemeProvider>
  );
};

export default App;