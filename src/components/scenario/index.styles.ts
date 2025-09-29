import styled from 'styled-components';

// Styled components for Scenario Studio
export const StudioContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', sans-serif;
`;

export const LeftPanel = styled.div`
  width: 400px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 0 20px 20px 0;
  padding: 30px;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

export const RightPanel = styled.div`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #2d3748;
  margin: 0;
`;

export const Section = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
`;

export const SectionTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const WeightSlider = styled.div`
  margin-bottom: 20px;
`;

export const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Label = styled.span`
  font-weight: 500;
  color: #4a5568;
`;

export const Value = styled.span`
  font-weight: 600;
  color: #2d3748;
  background: #e2e8f0;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.9rem;
`;

export const Slider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #e2e8f0;
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #667eea;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #667eea;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
  }
`;

export const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  flex: 1;
`;

export const ComparisonCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e2e8f0;
`;

export const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

export const ScenarioBadge = styled.div<{ type: 'baseline' | 'custom' }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background: ${props => props.type === 'baseline' ? '#e6fffa' : '#fef5e7'};
  color: ${props => props.type === 'baseline' ? '#065f46' : '#92400e'};
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

export const ResultItem = styled.div`
  text-align: center;
  padding: 15px;
  background: #f7fafc;
  border-radius: 10px;
`;

export const ResultValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 5px;
`;

export const ResultLabel = styled.div`
  font-size: 0.9rem;
  color: #718096;
  font-weight: 500;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

export const ScenarioList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
`;

export const ScenarioItem = styled.div<{ active: boolean }>`
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  background: ${props => props.active ? '#e6fffa' : 'transparent'};
  border: 1px solid ${props => props.active ? '#38b2ac' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    background: #f7fafc;
  }
`;

export const ScenarioName = styled.div`
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
`;

export const ScenarioMeta = styled.div`
  font-size: 0.8rem;
  color: #718096;
`;

export const Icon = styled.span`
  font-size: 1.2rem;
`;
