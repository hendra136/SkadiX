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
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    padding-top: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    height: calc(100vh - 60px);
  }
`;

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isIndicatorExpanded, setIsIndicatorExpanded] = useState(true);
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
      <DashboardContent>
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <Map onIndicatorExpandChange={setIsIndicatorExpanded} />
        <MobileControls 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar}
          isIndicatorExpanded={isIndicatorExpanded}
        />
      </DashboardContent>
    </DashboardContainer>
  );
};

export default DashboardPage;