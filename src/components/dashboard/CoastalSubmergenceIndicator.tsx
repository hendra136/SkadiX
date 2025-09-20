import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../context/AppContext";

const IndicatorContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 20px;
  z-index: 500;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.12), 0px 2px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  min-width: 320px;
  max-width: 400px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95);

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-width: 300px;
    max-width: 370px;
    padding: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 70px;
    right: 10px;
    min-width: 280px;
    max-width: 340px;
    padding: 18px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    top: 65px;
    right: 8px;
    left: 8px;
    min-width: auto;
    max-width: none;
    width: calc(100% - 16px);
    padding: 16px;
  }
`;

const IndicatorTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding-bottom: 8px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
    flex-wrap: wrap;
    margin-bottom: 14px;
    padding-bottom: 6px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.95rem;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    margin-bottom: 12px;
    padding-bottom: 4px;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  margin-left: auto;
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.gray};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.75rem;
    padding: 0.2rem;
  }
`;

const IndicatorContent = styled.div<{ isExpanded: boolean }>`
  display: ${({ isExpanded }) => (isExpanded ? "block" : "none")};
`;

const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  gap: 16px;
  min-height: 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 10px;
    padding: 10px;
    gap: 12px;
    min-height: 44px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 8px;
    padding: 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    min-height: auto;
  }
`;

const StatusLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;
  flex: 1;
  max-width: 65%;
  padding-right: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.85rem;
    max-width: 60%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.8rem;
    max-width: 100%;
    padding-right: 0;
    margin-bottom: 4px;
  }
`;

const StatusValue = styled.span<{ status: "safe" | "warning" | "danger" }>`
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.4;
  text-align: right;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: fit-content;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  color: ${({ status }) => {
    switch (status) {
      case "safe":
        return "#155724";
      case "warning":
        return "#856404";
      case "danger":
        return "#721c24";
      default:
        return "#495057";
    }
  }};
  border: 1px solid ${({ status }) => {
    switch (status) {
      case "safe":
        return "#c3e6cb";
      case "warning":
        return "#ffeaa7";
      case "danger":
        return "#f5c6cb";
      default:
        return "#dee2e6";
    }
  }};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.8rem;
    padding: 3px 6px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.75rem;
    text-align: left;
    align-self: flex-end;
    padding: 2px 6px;
  }
`;

const RiskMeter = styled.div`
  margin: 18px 0;
  padding: 4px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 16px 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 14px 0;
  }
`;

const RiskMeterLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  font-size: 0.85rem;
  line-height: 1.4;
  gap: 16px;
  min-height: 24px;
  
  span:first-child {
    flex: 1;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 70%;
    padding-right: 8px;
  }
  
  span:last-child {
    flex-shrink: 0;
    font-weight: 600;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(255, 255, 255, 0.9);
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    min-width: fit-content;
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 12px;
    
    span:first-child {
      max-width: 65%;
    }
    
    span:last-child {
      font-size: 0.85rem;
      padding: 1px 6px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 4px;
    margin-bottom: 10px;
    
    span:first-child {
      max-width: 100%;
      padding-right: 0;
    }
    
    span:last-child {
      align-self: flex-end;
      font-size: 0.8rem;
      padding: 2px 6px;
    }
  }
`;

const RiskMeterBar = styled.div`
  height: 10px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 9px;
    border-radius: 5px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 8px;
    border-radius: 4px;
  }
`;

const RiskMeterFill = styled.div<{ percentage: number; riskLevel: "low" | "medium" | "high" }>`
  height: 100%;
  width: ${({ percentage }) => percentage}%;
  background-color: ${({ riskLevel }) => {
    switch (riskLevel) {
      case "low":
        return "#2ecc71";
      case "medium":
        return "#f39c12";
      case "high":
        return "#e74c3c";
      default:
        return "#333";
    }
  }};
  transition: width 0.3s ease;
`;

const DummyNote = styled.div`
  margin-top: 20px;
  padding: 14px;
  background: linear-gradient(135deg, #fff3cd 0%, #fef9e7 100%);
  border: 1px solid #ffeaa7;
  border-left: 4px solid #f39c12;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.8rem;
  color: #856404;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 18px;
    padding: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 0.75rem;
    padding: 10px;
    margin-top: 16px;
  }
`;

const RefreshButton = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #003d82 0%, #002752 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  min-height: 48px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 4px 12px rgba(0, 61, 130, 0.3);

  &:hover {
    background: linear-gradient(135deg, #002752 0%, #001a3d 100%);
    transform: scale(1.03);
    box-shadow: 0px 6px 16px rgba(0, 61, 130, 0.4);
  }

  &:focus {
    box-shadow: 0px 6px 16px rgba(0, 61, 130, 0.4), 0 0 0 3px rgba(0, 61, 130, 0.3);
    outline: none;
  }

  &:active {
    background: linear-gradient(135deg, #001a3d 0%, #000f26 100%);
    transform: scale(1);
    box-shadow: 0px 4px 12px rgba(0, 61, 130, 0.3);
  }

  &:disabled {
    background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 14px;
    padding: 12px 24px;
    font-size: 0.9rem;
    min-height: 44px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 12px;
    padding: 10px 20px;
    font-size: 0.85rem;
    min-height: 40px;
    border-radius: 6px;
  }
`;

interface SubmergenceData {
  portArea: {
    currentLevel: number;
    projectedLevel: number;
    status: "safe" | "warning" | "danger";
  };
  coastalZone: {
    erosionRate: number;
    floodRisk: number;
    status: "safe" | "warning" | "danger";
  };
  infrastructure: {
    vulnerabilityIndex: number;
    adaptationLevel: number;
    status: "safe" | "warning" | "danger";
  };
}

interface CoastalSubmergenceIndicatorProps {
  onExpandChange?: (isExpanded: boolean) => void;
}

const CoastalSubmergenceIndicator: React.FC<CoastalSubmergenceIndicatorProps> = ({ onExpandChange }) => {
  const { t } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [data, setData] = useState<SubmergenceData>({
    portArea: {
      currentLevel: 2.3,
      projectedLevel: 4.7,
      status: "warning",
    },
    coastalZone: {
      erosionRate: 1.2,
      floodRisk: 65,
      status: "warning",
    },
    infrastructure: {
      vulnerabilityIndex: 72,
      adaptationLevel: 45,
      status: "danger",
    },
  });

  const generateRandomData = (): SubmergenceData => {
    const getRandomStatus = (): "safe" | "warning" | "danger" => {
      const rand = Math.random();
      if (rand < 0.4) return "safe";
      if (rand < 0.8) return "warning";
      return "danger";
    };

    return {
      portArea: {
        currentLevel: Math.round((Math.random() * 5 + 1) * 10) / 10,
        projectedLevel: Math.round((Math.random() * 8 + 2) * 10) / 10,
        status: getRandomStatus(),
      },
      coastalZone: {
        erosionRate: Math.round((Math.random() * 3 + 0.5) * 10) / 10,
        floodRisk: Math.round(Math.random() * 100),
        status: getRandomStatus(),
      },
      infrastructure: {
        vulnerabilityIndex: Math.round(Math.random() * 100),
        adaptationLevel: Math.round(Math.random() * 100),
        status: getRandomStatus(),
      },
    };
  };

  const handleRefresh = () => {
    setData(generateRandomData());
  };

  const getRiskLevel = (value: number): "low" | "medium" | "high" => {
    if (value < 40) return "low";
    if (value < 70) return "medium";
    return "high";
  };

  return (
    <IndicatorContainer>
      <IndicatorTitle>
        🌊 {t("dashboard.coastalSubmergence.title")}
        <ToggleButton
          onClick={() => {
            const newExpanded = !isExpanded;
            setIsExpanded(newExpanded);
            onExpandChange?.(newExpanded);
          }}
        >
          {isExpanded ? "▼" : "▶"}
        </ToggleButton>
      </IndicatorTitle>

      <IndicatorContent isExpanded={isExpanded}>
        <StatusItem>
          <StatusLabel>{t("dashboard.coastalSubmergence.portAreaWaterLevel")}</StatusLabel>
          <StatusValue status={data.portArea.status}>
            {data.portArea.currentLevel}m → {data.portArea.projectedLevel}m
          </StatusValue>
        </StatusItem>

        <StatusItem>
          <StatusLabel>{t("dashboard.coastalSubmergence.coastalErosionRate")}</StatusLabel>
          <StatusValue status={data.coastalZone.status}>{data.coastalZone.erosionRate}m/year</StatusValue>
        </StatusItem>

        <RiskMeter>
          <RiskMeterLabel>
            <span>{t("dashboard.coastalSubmergence.floodRisk")}</span>
            <span>{data.coastalZone.floodRisk}%</span>
          </RiskMeterLabel>
          <RiskMeterBar>
            <RiskMeterFill percentage={data.coastalZone.floodRisk} riskLevel={getRiskLevel(data.coastalZone.floodRisk)} />
          </RiskMeterBar>
        </RiskMeter>

        <RiskMeter>
          <RiskMeterLabel>
            <span>{t("dashboard.coastalSubmergence.infrastructureVulnerability")}</span>
            <span>{data.infrastructure.vulnerabilityIndex}%</span>
          </RiskMeterLabel>
          <RiskMeterBar>
            <RiskMeterFill percentage={data.infrastructure.vulnerabilityIndex} riskLevel={getRiskLevel(data.infrastructure.vulnerabilityIndex)} />
          </RiskMeterBar>
        </RiskMeter>

        <RiskMeter>
          <RiskMeterLabel>
            <span>{t("dashboard.coastalSubmergence.adaptationLevel")}</span>
            <span>{data.infrastructure.adaptationLevel}%</span>
          </RiskMeterLabel>
          <RiskMeterBar>
            <RiskMeterFill percentage={data.infrastructure.adaptationLevel} riskLevel={getRiskLevel(100 - data.infrastructure.adaptationLevel)} />
          </RiskMeterBar>
        </RiskMeter>

        <DummyNote>
          ⚠️ {t("dashboard.coastalSubmergence.dummyNote")}
        </DummyNote>

        <RefreshButton onClick={handleRefresh}>🔄 {t("dashboard.coastalSubmergence.refreshAnalysis")}</RefreshButton>
      </IndicatorContent>
    </IndicatorContainer>
  );
};

export default CoastalSubmergenceIndicator;
