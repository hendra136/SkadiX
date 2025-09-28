import React from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import Button from '../common/Button';
import ModernSelect from '../common/ModernSelect';
import { useAppContext } from '../../context/AppContext';
import { ports, scenarios } from '../../data/mockData';

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: 320px;
  height: 100vh;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 250, 252, 0.9) 50%, 
    rgba(241, 245, 249, 0.85) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 61, 130, 0.12),
    0 4px 16px rgba(0, 61, 130, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  padding: 1.5rem;
  overflow-y: auto;
  position: relative;
  
  /* Desktop: Lower z-index than navbar, fixed position with proper padding-top */
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900; /* Lower than navbar (1000) */
    padding-top: calc(70px + 1.5rem); /* Navbar height + original padding */
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(241, 245, 249, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, 
      rgba(0, 119, 182, 0.6) 0%, 
      rgba(0, 95, 115, 0.4) 100%
    );
    border-radius: 3px;
    transition: background 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, 
      rgba(0, 119, 182, 0.8) 0%, 
      rgba(0, 95, 115, 0.6) 100%
    );
  }

  /* Glass effect enhancement */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(0, 61, 130, 0.02) 0%, 
      rgba(0, 119, 182, 0.01) 50%,
      transparent 100%
    );
    pointer-events: none;
    z-index: -1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 280px;
    padding: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    z-index: 1001; /* Higher than navbar for mobile overlay */
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
    transition: transform 0.3s ease;
    padding: 0.875rem;
    box-shadow: ${({ isOpen }) => isOpen ? `
      0 16px 64px rgba(0, 61, 130, 0.2),
      0 8px 32px rgba(0, 61, 130, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.6)
    ` : 'none'};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 240px;
    padding: 0.75rem;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      ${({ theme }) => theme.colors?.primary || '#0077b6'} 0%, 
      ${({ theme }) => theme.colors?.secondary || '#005f73'} 50%,
      transparent 100%
    );
    border-radius: 1px;
  }
`;

const SidebarTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  position: relative;
  z-index: 2;
  
  /* Modern gradient text */
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors?.primary || '#0077b6'} 0%, 
    ${({ theme }) => theme.colors?.secondary || '#005f73'} 50%,
    #003d82 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Enhanced typography */
  font-family: ${({ theme }) => theme.fonts?.heading || 'Arial, sans-serif'};
  letter-spacing: -0.02em;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors?.text || '#333'};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 119, 182, 0.1);
    color: ${({ theme }) => theme.colors?.primary || '#0077b6'};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const GenerateReportSection = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 119, 182, 0.1);
`;

const SidebarSection = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 1.25rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 1rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.colors?.text || '#333'};
  position: relative;
  z-index: 2;
  
  /* Enhanced typography */
  font-family: ${({ theme }) => theme.fonts?.heading || 'Arial, sans-serif'};
  letter-spacing: -0.01em;
  
  /* Subtle accent */
  &::before {
    content: "";
    position: absolute;
    left: -0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 1.2rem;
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors?.primary || '#0077b6'} 0%, 
      ${({ theme }) => theme.colors?.secondary || '#005f73'} 100%
    );
    border-radius: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
    margin-bottom: 1rem;
    
    &::before {
      width: 2px;
      height: 1rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.95rem;
    margin-bottom: 0.875rem;
    
    &::before {
      width: 2px;
      height: 0.875rem;
    }
  }
`;

const SelectContainer = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors?.text || '#333'};
  font-size: 0.9rem;
`;



const ToggleContainer = styled.div`
  margin-bottom: 0.75rem;
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  padding: 0.25rem 0;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  
  /* Better touch target for mobile */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0.5rem 0.25rem;
    margin-bottom: 0.5rem;
    
    &:hover {
      background-color: rgba(0, 119, 182, 0.05);
    }
  }
`;

const ToggleLabel = styled.label`
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors?.text || '#333'};
  flex: 1;
  user-select: none;
  transition: color 0.2s ease;
  
  /* Better mobile typography */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.95rem;
    line-height: 1.4;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.9rem;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors?.primary || '#0077b6'};
  }
`;

const ToggleInput = styled.input`
  margin-right: 0.5rem;
  /* Proper proportional size - 1rem/16px */
  width: 1rem;
  height: 1rem;
  /* Prevent shrinking in flex container */
  flex-shrink: 0;
  accent-color: ${({ theme }) => theme.colors?.primary || '#0077b6'};
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.2s ease;
  
  /* Enhanced styling for better visual feedback */
  &:hover {
    transform: scale(1.1);
  }
  
  &:focus {
    outline: 2px solid rgba(0, 119, 182, 0.3);
    outline-offset: 2px;
  }
  
  /* Mobile: Smaller 12px size as requested */
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 12px;
    height: 12px;
    margin-right: 0.5rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 12px;
    height: 12px;
    margin-right: 0.5rem;
  }
`;

const SliderContainer = styled.div`
  margin-bottom: 0.75rem;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

const SliderName = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
`;

const SliderValue = styled.span`
  color: ${({ theme }) => theme.colors?.primary || '#0077b6'};
  font-weight: 500;
  font-size: 0.9rem;
`;

const Slider = styled.input`
  width: 100%;
  cursor: pointer;
  height: 0.75rem;
`;

const ButtonsContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;



interface SidebarProps {
  isOpen?: boolean;
  toggleSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, toggleSidebar }) => {
  const {
    selectedPort,
    setSelectedPort,
    selectedScenario,
    setSelectedScenario,
    showCoastalSubmergence,
    setShowCoastalSubmergence,
    runSimulation,
    generateReport,
    t
  } = useAppContext();

  // Data layers state - Updated with new slider configuration
  const [dataLayers, setDataLayers] = React.useState({
    portInfrastructure: { enabled: true, weight: 50, transparency: 0 },
    oceanClimate: { enabled: false, weight: 30, transparency: 0 },
    riskResilience: { enabled: false, weight: 40, transparency: 0 },
    energyCost: { enabled: false, weight: 20, transparency: 0 },
    socioeconomic: { enabled: false, weight: 25, transparency: 0 }
  });

  const handlePortChange = (value: string) => {
    const port = ports.find(p => p.id === value) || null;
    setSelectedPort(port);
  };

  const handleScenarioChange = (value: string) => {
    const scenario = scenarios.find(s => s.id === value) || null;
    setSelectedScenario(scenario);
  };



  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarHeader>
        <SidebarTitle>{t('dashboard.controlPanel')}</SidebarTitle>
        <CloseButton onClick={toggleSidebar} aria-label="Close sidebar">
          {(FiX as any)({ size: 20 })}
        </CloseButton>
      </SidebarHeader>
      
      <SidebarSection>
        <SectionTitle>{t('dashboard.portSelection')}</SectionTitle>
        <SelectContainer>
          <Label>{t('dashboard.selectPort')}</Label>
          <ModernSelect
            value={selectedPort?.id || ''}
            onChange={handlePortChange}
            options={ports.map(port => ({
              value: port.id,
              label: `${port.name}, ${port.country}`
            }))}
            placeholder={t('dashboard.selectPort')}
            size="medium"
          />
        </SelectContainer>
      </SidebarSection>
      
      <SidebarSection>
        <SectionTitle>{t('dashboard.scenarioSelection')}</SectionTitle>
        <SelectContainer>
          <Label>{t('dashboard.selectScenario')}</Label>
          <ModernSelect
            value={selectedScenario?.id || ''}
            onChange={handleScenarioChange}
            options={scenarios.map(scenario => ({
              value: scenario.id,
              label: `${scenario.year} - ${scenario.name}`
            }))}
            placeholder={t('dashboard.selectScenario')}
            size="medium"
          />
        </SelectContainer>
      </SidebarSection>
      

      
      <SidebarSection>
        <SectionTitle>{t('dashboard.dataLayers')}</SectionTitle>
        
        {/* Port Infrastructure & Connectivity */}
        <ToggleContainer>
          <Toggle>
            <ToggleInput
              type="checkbox"
              id="port-infrastructure-layer"
              checked={dataLayers.portInfrastructure.enabled}
              onChange={(e) => setDataLayers(prev => ({
                ...prev,
                portInfrastructure: { ...prev.portInfrastructure, enabled: e.target.checked }
              }))}
            />
            <ToggleLabel htmlFor="port-infrastructure-layer">{t('dashboard.portInfrastructure')}</ToggleLabel>
          </Toggle>
          {dataLayers.portInfrastructure.enabled && (
            <>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.weight')}</SliderName>
                  <SliderValue>{dataLayers.portInfrastructure.weight}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.portInfrastructure.weight}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    portInfrastructure: { ...prev.portInfrastructure, weight: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.transparency')}</SliderName>
                  <SliderValue>{dataLayers.portInfrastructure.transparency}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.portInfrastructure.transparency}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    portInfrastructure: { ...prev.portInfrastructure, transparency: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
            </>
          )}
        </ToggleContainer>

        {/* Ocean & Climate Exposure */}
        <ToggleContainer>
          <Toggle>
            <ToggleInput
              type="checkbox"
              id="ocean-climate-layer"
              checked={dataLayers.oceanClimate.enabled}
              onChange={(e) => setDataLayers(prev => ({
                ...prev,
                oceanClimate: { ...prev.oceanClimate, enabled: e.target.checked }
              }))}
            />
            <ToggleLabel htmlFor="ocean-climate-layer">{t('dashboard.oceanClimate')}</ToggleLabel>
          </Toggle>
          {dataLayers.oceanClimate.enabled && (
            <>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.weight')}</SliderName>
                  <SliderValue>{dataLayers.oceanClimate.weight}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.oceanClimate.weight}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    oceanClimate: { ...prev.oceanClimate, weight: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.transparency')}</SliderName>
                  <SliderValue>{dataLayers.oceanClimate.transparency}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.oceanClimate.transparency}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    oceanClimate: { ...prev.oceanClimate, transparency: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
            </>
          )}
        </ToggleContainer>

        {/* Risk & Resilience */}
        <ToggleContainer>
          <Toggle>
            <ToggleInput
              type="checkbox"
              id="risk-resilience-layer"
              checked={dataLayers.riskResilience.enabled}
              onChange={(e) => setDataLayers(prev => ({
                ...prev,
                riskResilience: { ...prev.riskResilience, enabled: e.target.checked }
              }))}
            />
            <ToggleLabel htmlFor="risk-resilience-layer">{t('dashboard.riskResilience')}</ToggleLabel>
          </Toggle>
          {dataLayers.riskResilience.enabled && (
            <>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.weight')}</SliderName>
                  <SliderValue>{dataLayers.riskResilience.weight}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.riskResilience.weight}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    riskResilience: { ...prev.riskResilience, weight: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.transparency')}</SliderName>
                  <SliderValue>{dataLayers.riskResilience.transparency}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.riskResilience.transparency}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    riskResilience: { ...prev.riskResilience, transparency: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
            </>
          )}
        </ToggleContainer>

        {/* Energy Cost */}
        <ToggleContainer>
          <Toggle>
            <ToggleInput
              type="checkbox"
              id="energy-cost-layer"
              checked={dataLayers.energyCost.enabled}
              onChange={(e) => setDataLayers(prev => ({
                ...prev,
                energyCost: { ...prev.energyCost, enabled: e.target.checked }
              }))}
            />
            <ToggleLabel htmlFor="energy-cost-layer">{t('dashboard.energyCost')}</ToggleLabel>
          </Toggle>
          {dataLayers.energyCost.enabled && (
            <>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.weight')}</SliderName>
                  <SliderValue>{dataLayers.energyCost.weight}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.energyCost.weight}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    energyCost: { ...prev.energyCost, weight: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.transparency')}</SliderName>
                  <SliderValue>{dataLayers.energyCost.transparency}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.energyCost.transparency}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    energyCost: { ...prev.energyCost, transparency: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
            </>
          )}
        </ToggleContainer>

        {/* Socioeconomic Factors */}
        <ToggleContainer>
          <Toggle>
            <ToggleInput
              type="checkbox"
              id="socioeconomic-layer"
              checked={dataLayers.socioeconomic.enabled}
              onChange={(e) => setDataLayers(prev => ({
                ...prev,
                socioeconomic: { ...prev.socioeconomic, enabled: e.target.checked }
              }))}
            />
            <ToggleLabel htmlFor="socioeconomic-layer">{t('dashboard.socioeconomic')}</ToggleLabel>
          </Toggle>
          {dataLayers.socioeconomic.enabled && (
            <>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.weight')}</SliderName>
                  <SliderValue>{dataLayers.socioeconomic.weight}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.socioeconomic.weight}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    socioeconomic: { ...prev.socioeconomic, weight: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.transparency')}</SliderName>
                  <SliderValue>{dataLayers.socioeconomic.transparency}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.socioeconomic.transparency}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    socioeconomic: { ...prev.socioeconomic, transparency: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
            </>
          )}
        </ToggleContainer>
      </SidebarSection>
      
      <SidebarSection>
        <SectionTitle>{t('dashboard.filters')}</SectionTitle>
        <ToggleContainer>
          <Toggle>
            <ToggleInput
              type="checkbox"
              id="show-coastal-submergence"
              checked={showCoastalSubmergence}
              onChange={(e) => setShowCoastalSubmergence(e.target.checked)}
            />
            <ToggleLabel htmlFor="show-coastal-submergence">{t('dashboard.portSuitabilityAnalysis')}</ToggleLabel>
          </Toggle>
        </ToggleContainer>
      </SidebarSection>


      
      <ButtonsContainer>
        <Button 
          variant="primary"
          size="medium"
          fullWidth
          onClick={runSimulation}
        >
          {t('dashboard.runSimulation')}
        </Button>
      </ButtonsContainer>
      
      <GenerateReportSection>
        <Button 
          variant="secondary"
          size="medium"
          fullWidth
          onClick={generateReport}
        >
          {t('dashboard.generateReport')}
        </Button>
      </GenerateReportSection>
    </SidebarContainer>
  );
};

export default Sidebar;