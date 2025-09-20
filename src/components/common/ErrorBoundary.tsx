import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin: 1rem;
`;

const ErrorTitle = styled.h2`
  color: ${({ theme }) => theme.colors.danger};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  max-width: 600px;
  line-height: 1.6;
`;

const ErrorDetails = styled.details`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  max-width: 800px;
  width: 100%;
`;

const ErrorStack = styled.pre`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 300px;
  overflow-y: auto;
`;

const RefreshButton = styled.button`
  padding: 14px 28px;
  background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  min-height: 48px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 4px 12px rgba(0, 123, 182, 0.3);

  &:hover {
    background: linear-gradient(135deg, #004085 0%, #002752 100%);
    transform: scale(1.03);
    box-shadow: 0px 6px 16px rgba(0, 123, 182, 0.4);
  }

  &:focus {
    box-shadow: 0px 6px 16px rgba(0, 123, 182, 0.4), 0 0 0 3px rgba(0, 123, 255, 0.3);
    outline: none;
  }

  &:active {
    transform: scale(1);
    box-shadow: 0px 4px 12px rgba(0, 123, 182, 0.3);
  }
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleRefresh = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>🚨 Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but something unexpected happened. This error has been logged and we're working to fix it.
            You can try refreshing the page or contact support if the problem persists.
          </ErrorMessage>
          
          <RefreshButton onClick={this.handleRefresh}>
            Refresh Page
          </RefreshButton>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <ErrorDetails>
              <summary>Error Details (Development Mode)</summary>
              <ErrorStack>
                <strong>Error:</strong> {this.state.error.message}
                {this.state.error.stack && (
                  <>
                    <br /><br />
                    <strong>Stack Trace:</strong>
                    <br />
                    {this.state.error.stack}
                  </>
                )}
                {this.state.errorInfo && (
                  <>
                    <br /><br />
                    <strong>Component Stack:</strong>
                    <br />
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </ErrorStack>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;