import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import Map from '../components/dashboard/Map';
import MobileControls from '../components/dashboard/MobileControls';
import { useAppContext } from '../context/AppContext';
import { ports } from '../data/mockData';

const DashboardContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DashboardContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
  
  /* Desktop: Add padding-left to push content away from sidebar */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: 320px; /* Match sidebar width */
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-left: 300px; /* Match smaller sidebar width on lg screens */
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    padding-left: 0; /* No padding on mobile - sidebar is overlay */
    padding-top: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    height: calc(100vh - 60px);
    padding-left: 0;
  }
`;

const Overlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setSelectedPort, setSelectedScenario } = useAppContext();
  
  // Set default port when dashboard is opened
  useEffect(() => {
    // Set Rotterdam as default port
    const defaultPort = ports.find(port => port.id === 'port-001'); // Rotterdam
    if (defaultPort) {
      setSelectedPort(defaultPort);
      
      // Set default scenario (Low Emission 2050)
      setSelectedScenario({
        id: 'scenario-001',
        name: 'Low Emission',
        year: 2050,
        description: 'Assumes significant reduction in greenhouse gas emissions globally.'
      });
    }
  }, [setSelectedPort, setSelectedScenario]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <DashboardContainer>
      <Navbar />
      <Overlay isVisible={isSidebarOpen} onClick={toggleSidebar} />
      <DashboardContent>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Map />
        <MobileControls 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar}
        />
      </DashboardContent>
    </DashboardContainer>
  );
};

export default DashboardPage;