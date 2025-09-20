import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import ModernSelect from '../common/ModernSelect';
import { useAppContext } from '../../context/AppContext';
import { ports, scenarios } from '../../data/mockData';

const SidebarContainer = styled.div`
  width: 300px;
  height: 100vh;
  padding: 2rem 1.5rem;
  padding-top: 90px; /* Account for navbar height */
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  overflow-y: auto;
  
  /* Modern Glass Morphism Background */
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(248, 250, 252, 0.9) 50%, 
    rgba(241, 245, 249, 0.85) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  /* Enhanced Border and Shadow */
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    8px 0 32px rgba(0, 61, 130, 0.08),
    4px 0 16px rgba(0, 61, 130, 0.04),
    inset -1px 0 0 rgba(255, 255, 255, 0.6);
  
  /* Subtle gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, 
      rgba(0, 61, 130, 0.02) 0%, 
      rgba(0, 119, 182, 0.01) 50%,
      transparent 100%
    );
    pointer-events: none;
  }
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 61, 130, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, 
      rgba(0, 61, 130, 0.3) 0%, 
      rgba(0, 119, 182, 0.2) 100%
    );
    border-radius: 3px;
    
    &:hover {
      background: linear-gradient(135deg, 
        rgba(0, 61, 130, 0.5) 0%, 
        rgba(0, 119, 182, 0.4) 100%
      );
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.lg || '992px'}) {
    width: 270px;
    padding: 1.5rem 1rem;
    padding-top: 80px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.md || '768px'}) {
    width: 240px;
    padding: 1rem 0.75rem;
    padding-top: 80px;
    position: fixed;
    top: 0;
    left: -100%;
    width: 100%;
    max-width: 320px;
    height: 100vh;
    z-index: 1001;
    transition: left 0.3s ease;
    
    &.open {
      left: 0;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.sm || '576px'}) {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding: 1.5rem 1rem;
    padding-top: 76px;
    max-width: 300px;
    box-shadow: 
      0 8px 32px rgba(0, 61, 130, 0.08),
      0 4px 16px rgba(0, 61, 130, 0.04);
  }
`;

const SidebarTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
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
  
  /* Modern border with gradient */
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

const SidebarSection = styled.div`
  margin-bottom: 1.5rem;
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
`;

const ToggleLabel = styled.label`
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors?.text || '#333'};
`;

const ToggleInput = styled.input`
  cursor: pointer;
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
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const {
    selectedPort,
    setSelectedPort,
    selectedScenario,
    setSelectedScenario,
    showCoastalSubmergence,
    setShowCoastalSubmergence,
    runSimulation,
    t
  } = useAppContext();

  // Data layers state
  const [dataLayers, setDataLayers] = React.useState({
    elevation: { enabled: true, weight: 0, transparency: 0 },
    tide: { enabled: false, weight: 0, transparency: 0 },
    infrastructure: { enabled: false, weight: 0, transparency: 0 },
    floodRisk: { enabled: false, weight: 0, transparency: 0 }
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
    <SidebarContainer className={className}>
      <SidebarTitle>{t('dashboard.controlPanel')}</SidebarTitle>
      
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
        
        {/* Elevation Layer */}
        <ToggleContainer>
          <Toggle>
            <ToggleInput
              type="checkbox"
              id="elevation-layer"
              checked={dataLayers.elevation.enabled}
              onChange={(e) => setDataLayers(prev => ({
                ...prev,
                elevation: { ...prev.elevation, enabled: e.target.checked }
              }))}
            />
            <ToggleLabel htmlFor="elevation-layer">{t('dashboard.elevation')}</ToggleLabel>
          </Toggle>
          {dataLayers.elevation.enabled && (
            <>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.weight')}</SliderName>
                  <SliderValue>{dataLayers.elevation.weight}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.elevation.weight}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    elevation: { ...prev.elevation, weight: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.transparency')}</SliderName>
                  <SliderValue>{dataLayers.elevation.transparency}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.elevation.transparency}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    elevation: { ...prev.elevation, transparency: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
            </>
          )}
        </ToggleContainer>

        {/* Tide Layer */}
        <ToggleContainer>
          <Toggle>
            <ToggleInput
              type="checkbox"
              id="tide-layer"
              checked={dataLayers.tide.enabled}
              onChange={(e) => setDataLayers(prev => ({
                ...prev,
                tide: { ...prev.tide, enabled: e.target.checked }
              }))}
            />
            <ToggleLabel htmlFor="tide-layer">{t('dashboard.tide')}</ToggleLabel>
          </Toggle>
          {dataLayers.tide.enabled && (
            <>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.weight')}</SliderName>
                  <SliderValue>{dataLayers.tide.weight}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.tide.weight}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    tide: { ...prev.tide, weight: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.transparency')}</SliderName>
                  <SliderValue>{dataLayers.tide.transparency}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.tide.transparency}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    tide: { ...prev.tide, transparency: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
            </>
          )}
        </ToggleContainer>

        {/* Infrastructure Layer */}
        <ToggleContainer>
          <Toggle>
            <ToggleInput
              type="checkbox"
              id="infrastructure-layer"
              checked={dataLayers.infrastructure.enabled}
              onChange={(e) => setDataLayers(prev => ({
                ...prev,
                infrastructure: { ...prev.infrastructure, enabled: e.target.checked }
              }))}
            />
            <ToggleLabel htmlFor="infrastructure-layer">{t('dashboard.infrastructure')}</ToggleLabel>
          </Toggle>
          {dataLayers.infrastructure.enabled && (
            <>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.weight')}</SliderName>
                  <SliderValue>{dataLayers.infrastructure.weight}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.infrastructure.weight}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    infrastructure: { ...prev.infrastructure, weight: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.transparency')}</SliderName>
                  <SliderValue>{dataLayers.infrastructure.transparency}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.infrastructure.transparency}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    infrastructure: { ...prev.infrastructure, transparency: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
            </>
          )}
        </ToggleContainer>

        {/* Flood Risk Layer */}
        <ToggleContainer>
          <Toggle>
            <ToggleInput
              type="checkbox"
              id="flood-risk-layer"
              checked={dataLayers.floodRisk.enabled}
              onChange={(e) => setDataLayers(prev => ({
                ...prev,
                floodRisk: { ...prev.floodRisk, enabled: e.target.checked }
              }))}
            />
            <ToggleLabel htmlFor="flood-risk-layer">{t('dashboard.floodRisk')}</ToggleLabel>
          </Toggle>
          {dataLayers.floodRisk.enabled && (
            <>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.weight')}</SliderName>
                  <SliderValue>{dataLayers.floodRisk.weight}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.floodRisk.weight}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    floodRisk: { ...prev.floodRisk, weight: parseInt(e.target.value) }
                  }))}
                />
              </SliderContainer>
              <SliderContainer>
                <SliderLabel>
                  <SliderName>{t('dashboard.transparency')}</SliderName>
                  <SliderValue>{dataLayers.floodRisk.transparency}%</SliderValue>
                </SliderLabel>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  value={dataLayers.floodRisk.transparency}
                  onChange={(e) => setDataLayers(prev => ({
                    ...prev,
                    floodRisk: { ...prev.floodRisk, transparency: parseInt(e.target.value) }
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
            <ToggleLabel htmlFor="show-coastal-submergence">{t('dashboard.coastalSubmergenceAnalysis')}</ToggleLabel>
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
    </SidebarContainer>
  );
};

export default Sidebar;