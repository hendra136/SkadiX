import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import ModernSelect from '../common/ModernSelect';
import Button from '../common/Button';
import Navbar from '../common/Navbar';
import {
  StudioContainer,
  LeftPanel,
  RightPanel,
  Header,
  Title,
  Subtitle,
  Section,
  SectionTitle,
  WeightSlider,
  SliderLabel,
  Label,
  Value,
  Slider,
  ComparisonGrid,
  ComparisonCard,
  CardHeader,
  CardTitle,
  ScenarioBadge,
  ResultsGrid,
  ResultItem,
  ResultValue,
  ResultLabel,
  ActionButtons,
  ScenarioList,
  ScenarioItem,
  ScenarioName,
  ScenarioMeta,
  Icon
} from './index.styles';

interface ScenarioWeights {
  infrastructure: number;
  energy: number;
  risk: number;
  socioeconomic: number;
  connectivity: number;
}

interface EDITOScenario {
  id: string;
  name: string;
  rcp: string;
  description: string;
  year: number;
}

interface CustomScenario {
  id: string;
  name: string;
  weights: ScenarioWeights;
  editosScenario: EDITOScenario;
  planningHorizon: number;
  createdAt: Date;
  description?: string;
}

// Mock EDITO scenarios
const editosScenarios: EDITOScenario[] = [
  {
    id: 'rcp-26',
    name: 'RCP 2.6',
    rcp: '2.6',
    description: 'Low emissions scenario with strong mitigation',
    year: 2100
  },
  {
    id: 'rcp-45',
    name: 'RCP 4.5',
    rcp: '4.5',
    description: 'Intermediate emissions scenario',
    year: 2100
  },
  {
    id: 'rcp-85',
    name: 'RCP 8.5',
    rcp: '8.5',
    description: 'High emissions scenario with minimal mitigation',
    year: 2100
  }
];

const ScenarioStudio: React.FC = () => {
  const { t } = useAppContext();
 
  const [currentWeights, setCurrentWeights] = useState<ScenarioWeights>({
    infrastructure: 30,
    energy: 25,
    risk: 20,
    socioeconomic: 15,
    connectivity: 10
  });
  
  const [selectedEDITOScenario, setSelectedEDITOScenario] = useState<EDITOScenario>(editosScenarios[0]);
  const [planningHorizon, setPlanningHorizon] = useState(2050);
  const [savedScenarios, setSavedScenarios] = useState<CustomScenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<CustomScenario | null>(null);
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioDescription, setScenarioDescription] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('skadix-scenarios');
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt)
        }));
        setSavedScenarios(parsed);
      } catch (error) {
        console.error('Error loading saved scenarios:', error);
      }
    }
  }, []);

  // Save scenarios to localStorage
  const saveScenarios = (scenarios: CustomScenario[]) => {
    localStorage.setItem('skadix-scenarios', JSON.stringify(scenarios));
    setSavedScenarios(scenarios);
  };

  const handleWeightChange = (factor: keyof ScenarioWeights, value: number) => {
    setCurrentWeights(prev => ({
      ...prev,
      [factor]: value
    }));
  };

  const normalizeWeights = (weights: ScenarioWeights): ScenarioWeights => {
    const total = Object.values(weights).reduce((sum, val) => sum + val, 0);
    const normalized: ScenarioWeights = {} as ScenarioWeights;
    
    Object.keys(weights).forEach(key => {
      normalized[key as keyof ScenarioWeights] = Math.round((weights[key as keyof ScenarioWeights] / total) * 100);
    });
    
    return normalized;
  };

  const saveScenario = () => {
    if (!scenarioName.trim()) return;
    
    const newScenario: CustomScenario = {
      id: `scenario-${Date.now()}`,
      name: scenarioName,
      weights: normalizeWeights(currentWeights),
      editosScenario: selectedEDITOScenario,
      planningHorizon,
      description: scenarioDescription,
      createdAt: new Date()
    };
    
    const updated = [...savedScenarios, newScenario];
    saveScenarios(updated);
    setScenarioName('');
    setScenarioDescription('');
  };

  const loadScenario = (scenario: CustomScenario) => {
    setSelectedScenario(scenario);
    setCurrentWeights(scenario.weights);
    setSelectedEDITOScenario(scenario.editosScenario);
    setPlanningHorizon(scenario.planningHorizon);
  };

  const deleteScenario = (scenarioId: string) => {
    const updated = savedScenarios.filter(s => s.id !== scenarioId);
    saveScenarios(updated);
    if (selectedScenario?.id === scenarioId) {
      setSelectedScenario(null);
    }
  };

  const generateShareURL = () => {
    const scenarioData = {
      weights: normalizeWeights(currentWeights),
      editosScenario: selectedEDITOScenario.id,
      planningHorizon
    };
    
    const encoded = btoa(JSON.stringify(scenarioData));
    const url = `${window.location.origin}/scenario-studio?data=${encoded}`;
    
    navigator.clipboard.writeText(url);
    alert('Scenario URL copied to clipboard!');
  };


  const calculateResults = (weights: ScenarioWeights, editosScenario: EDITOScenario) => {
    const baseScore = 75;
    const weightImpact = (weights.infrastructure * 0.3 + weights.energy * 0.25 + weights.risk * 0.2 + weights.socioeconomic * 0.15 + weights.connectivity * 0.1) / 100;
    const scenarioMultiplier = editosScenario.rcp === '2.6' ? 1.1 : editosScenario.rcp === '4.5' ? 1.0 : 0.9;
    

    const infrastructureScore = (weights.infrastructure + weights.energy + weights.connectivity) / 3;
    const riskScore = (100 - infrastructureScore) + (editosScenario.rcp === '8.5' ? 20 : editosScenario.rcp === '4.5' ? 10 : 0);
    
    let riskLevel = 'Low';
    if (riskScore > 80) riskLevel = 'High';
    else if (riskScore > 65) riskLevel = 'Medium';
    
    return {
      overallScore: Math.round(baseScore * weightImpact * scenarioMultiplier),
      riskLevel,
      energyEfficiency: Math.round(85 * (weights.energy / 100)),
      infrastructureReadiness: Math.round(80 * (weights.infrastructure / 100))
    };
  };

  const baselineResults = calculateResults(
    { infrastructure: 30, energy: 25, risk: 20, socioeconomic: 15, connectivity: 10 },
    editosScenarios[0]
  );
  
  const currentResults = calculateResults(normalizeWeights(currentWeights), selectedEDITOScenario);

  return (
    <>
      <Navbar />
      <StudioContainer>
      <LeftPanel>
        <Header>
          <Title>{t('scenarioStudio.title')}</Title>
          <Subtitle>{t('scenarioStudio.subtitle')}</Subtitle>
        </Header>

        <Section>
          <SectionTitle>
            <Icon>⚖️</Icon>
            {t('scenarioStudio.factorWeights')}
          </SectionTitle>
          
          <WeightSlider>
            <SliderLabel>
              <Label>{t('scenarioStudio.infrastructure')}</Label>
              <Value>{currentWeights.infrastructure}%</Value>
            </SliderLabel>
            <Slider
              type="range"
              min="0"
              max="100"
              value={currentWeights.infrastructure}
              onChange={(e) => handleWeightChange('infrastructure', parseInt(e.target.value))}
            />
          </WeightSlider>

          <WeightSlider>
            <SliderLabel>
              <Label>{t('scenarioStudio.energy')}</Label>
              <Value>{currentWeights.energy}%</Value>
            </SliderLabel>
            <Slider
              type="range"
              min="0"
              max="100"
              value={currentWeights.energy}
              onChange={(e) => handleWeightChange('energy', parseInt(e.target.value))}
            />
          </WeightSlider>

          <WeightSlider>
            <SliderLabel>
              <Label>{t('scenarioStudio.risk')}</Label>
              <Value>{currentWeights.risk}%</Value>
            </SliderLabel>
            <Slider
              type="range"
              min="0"
              max="100"
              value={currentWeights.risk}
              onChange={(e) => handleWeightChange('risk', parseInt(e.target.value))}
            />
          </WeightSlider>

          <WeightSlider>
            <SliderLabel>
              <Label>{t('scenarioStudio.socioeconomic')}</Label>
              <Value>{currentWeights.socioeconomic}%</Value>
            </SliderLabel>
            <Slider
              type="range"
              min="0"
              max="100"
              value={currentWeights.socioeconomic}
              onChange={(e) => handleWeightChange('socioeconomic', parseInt(e.target.value))}
            />
          </WeightSlider>

          <WeightSlider>
            <SliderLabel>
              <Label>{t('scenarioStudio.connectivity')}</Label>
              <Value>{currentWeights.connectivity}%</Value>
            </SliderLabel>
            <Slider
              type="range"
              min="0"
              max="100"
              value={currentWeights.connectivity}
              onChange={(e) => handleWeightChange('connectivity', parseInt(e.target.value))}
            />
          </WeightSlider>
        </Section>

        <Section>
          <SectionTitle>
            <Icon>🌊</Icon>
            {t('scenarioStudio.editosScenario')}
          </SectionTitle>
          
          <ModernSelect
            value={selectedEDITOScenario.id}
            onChange={(value) => {
              const scenario = editosScenarios.find(s => s.id === value);
              if (scenario) setSelectedEDITOScenario(scenario);
            }}
            options={editosScenarios.map(s => ({
              value: s.id,
              label: `${s.name} (${s.description})`
            }))}
          />
          
          <div style={{ marginTop: '15px' }}>
            <Label>{t('scenarioStudio.planningHorizon')}</Label>
            <ModernSelect
              value={planningHorizon.toString()}
              onChange={(value) => setPlanningHorizon(parseInt(value))}
              options={[
                { value: '2030', label: '2030' },
                { value: '2050', label: '2050' },
                { value: '2100', label: '2100' }
              ]}
            />
          </div>
        </Section>
        
        <Section>
          <SectionTitle>
            <Icon>💾</Icon>
            {t('scenarioStudio.saveScenario')}
          </SectionTitle>
          
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder={t('scenarioStudio.scenarioName')}
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <textarea
              placeholder={t('scenarioStudio.scenarioDescription')}
              value={scenarioDescription}
              onChange={(e) => setScenarioDescription(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>
          
          <ActionButtons>
            <Button onClick={saveScenario} disabled={!scenarioName.trim()}>
              {t('scenarioStudio.saveScenario')}
            </Button>
            <Button onClick={generateShareURL}>
              {t('scenarioStudio.shareUrl')}
            </Button>
          </ActionButtons>
        </Section>

        {savedScenarios.length > 0 && (
          <Section>
            <SectionTitle>
              <Icon>📁</Icon>
              {t('scenarioStudio.savedScenarios')}
            </SectionTitle>
            
            <ScenarioList>
              {savedScenarios.map(scenario => (
                <ScenarioItem
                  key={scenario.id}
                  active={selectedScenario?.id === scenario.id}
                  onClick={() => loadScenario(scenario)}
                >
                  <ScenarioName>{scenario.name}</ScenarioName>
                  <ScenarioMeta>
                    {scenario.editosScenario.name} • {scenario.planningHorizon}
                  </ScenarioMeta>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteScenario(scenario.id);
                    }}
                    style={{
                      marginTop: '8px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      background: '#fed7d7',
                      color: '#c53030',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {t('scenarioStudio.delete')}
                  </button>
                </ScenarioItem>
              ))}
            </ScenarioList>
          </Section>
        )}
      </LeftPanel>

      <RightPanel>
        <ComparisonGrid>
          <ComparisonCard>
            <CardHeader>
              <CardTitle>{t('scenarioStudio.baselineScenario')}</CardTitle>
              <ScenarioBadge type="baseline">{t('scenarioStudio.default')}</ScenarioBadge>
            </CardHeader>
            
            <ResultsGrid>
              <ResultItem>
                <ResultValue>{baselineResults.overallScore}</ResultValue>
                <ResultLabel>{t('scenarioStudio.overallScore')}</ResultLabel>
              </ResultItem>
              <ResultItem>
                <ResultValue>{baselineResults.riskLevel}</ResultValue>
                <ResultLabel>{t('scenarioStudio.riskLevel')}</ResultLabel>
              </ResultItem>
              <ResultItem>
                <ResultValue>{baselineResults.energyEfficiency}%</ResultValue>
                <ResultLabel>{t('scenarioStudio.energyEfficiency')}</ResultLabel>
              </ResultItem>
              <ResultItem>
                <ResultValue>{baselineResults.infrastructureReadiness}%</ResultValue>
                <ResultLabel>{t('scenarioStudio.infrastructureReadiness')}</ResultLabel>
              </ResultItem>
            </ResultsGrid>
          </ComparisonCard>

          <ComparisonCard>
            <CardHeader>
              <CardTitle>{t('scenarioStudio.currentScenario')}</CardTitle>
              <ScenarioBadge type="custom">{t('scenarioStudio.custom')}</ScenarioBadge>
            </CardHeader>
            
            <ResultsGrid>
              <ResultItem>
                <ResultValue>{currentResults.overallScore}</ResultValue>
                <ResultLabel>{t('scenarioStudio.overallScore')}</ResultLabel>
              </ResultItem>
              <ResultItem>
                <ResultValue>{currentResults.riskLevel}</ResultValue>
                <ResultLabel>{t('scenarioStudio.riskLevel')}</ResultLabel>
              </ResultItem>
              <ResultItem>
                <ResultValue>{currentResults.energyEfficiency}%</ResultValue>
                <ResultLabel>{t('scenarioStudio.energyEfficiency')}</ResultLabel>
              </ResultItem>
              <ResultItem>
                <ResultValue>{currentResults.infrastructureReadiness}%</ResultValue>
                <ResultLabel>{t('scenarioStudio.infrastructureReadiness')}</ResultLabel>
              </ResultItem>
            </ResultsGrid>
          </ComparisonCard>
        </ComparisonGrid>
      </RightPanel>
    </StudioContainer>
    </>
  );
};

export default ScenarioStudio;
