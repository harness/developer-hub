import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface OptimizationData {
  instanceCount: number;
  instanceType: string;
  instanceCost: number;
  cpuUtil: number;
  memUtil: number;
  currentCost: number;
  optimizedCost: number;
  savings: number;
  savingsPercent: number;
  annualSavings: number;
}

const ComputeOptimizationSlider: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [data, setData] = useState<OptimizationData>({
    instanceCount: 10,
    instanceType: 'm5.2xlarge',
    instanceCost: 280,
    cpuUtil: 15,
    memUtil: 25,
    currentCost: 2800,
    optimizedCost: 2800,
    savings: 0,
    savingsPercent: 0,
    annualSavings: 0
  });

  useEffect(() => {
    // Calculate optimization based on slider value (0-100)
    const progress = sliderValue / 100;
    
    // Interpolate between current and optimized state
    const optimizedInstanceCost = 112; // m5.large cost
    const interpolatedCost = data.instanceCost - (data.instanceCost - optimizedInstanceCost) * progress;
    const currentTotalCost = data.instanceCount * data.instanceCost;
    const optimizedTotalCost = data.instanceCount * interpolatedCost;
    
    const savings = currentTotalCost - optimizedTotalCost;
    const savingsPercent = (savings / currentTotalCost) * 100;
    const annualSavings = savings * 12;
    
    // Interpolate utilization improvements
    const targetCpuUtil = 15 + (60 - 15) * progress;
    const targetMemUtil = 25 + (80 - 25) * progress;
    
    setData(prev => ({
      ...prev,
      optimizedCost: Math.round(optimizedTotalCost),
      savings: Math.round(savings),
      savingsPercent: Math.round(savingsPercent),
      annualSavings: Math.round(annualSavings),
      cpuUtil: Math.round(targetCpuUtil),
      memUtil: Math.round(targetMemUtil)
    }));
  }, [sliderValue, data.instanceCount, data.instanceCost]);

  const getInstanceType = () => {
    if (sliderValue < 25) return 'm5.2xlarge';
    if (sliderValue < 50) return 'm5.xlarge';
    if (sliderValue < 75) return 'm5.large';
    return 'm5.large (optimized)';
  };

  const getOptimizationStage = () => {
    if (sliderValue < 20) return 'Current State - Over-provisioned';
    if (sliderValue < 40) return 'Analysis Phase - Identifying Waste';
    if (sliderValue < 60) return 'Optimization Phase - Right-sizing';
    if (sliderValue < 80) return 'Implementation Phase - Applying Changes';
    return 'Optimized State - Maximum Efficiency';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Interactive Compute Optimization</h3>
        <p>Slide to see the transformation from over-provisioned to optimized infrastructure</p>
      </div>

      {/* Slider Control */}
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack}>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className={styles.slider}
          />
          <div className={styles.sliderLabels}>
            <span>Current State</span>
            <span>Optimized State</span>
          </div>
        </div>
        <div className={styles.stageIndicator}>
          <strong>{getOptimizationStage()}</strong>
        </div>
      </div>

      {/* Visual Comparison */}
      <div className={styles.comparison}>
        <div className={styles.beforeAfter}>
          {/* Before State */}
          <div className={`${styles.state} ${styles.before}`} style={{opacity: 1 - sliderValue/100}}>
            <h4>Before Optimization</h4>
            <div className={styles.instanceBox}>
              <div className={styles.instanceType}>m5.2xlarge</div>
              <div className={styles.specs}>8 vCPU, 32GB RAM</div>
              <div className={styles.cost}>${data.instanceCost}/month</div>
            </div>
            <div className={styles.utilization}>
              <div className={styles.utilizationBar}>
                <div className={styles.cpuBar} style={{width: '15%'}}></div>
                <span>CPU: 15%</span>
              </div>
              <div className={styles.utilizationBar}>
                <div className={styles.memBar} style={{width: '25%'}}></div>
                <span>Memory: 25%</span>
              </div>
            </div>
          </div>

          {/* After State */}
          <div className={`${styles.state} ${styles.after}`} style={{opacity: sliderValue/100}}>
            <h4>After Optimization</h4>
            <div className={styles.instanceBox}>
              <div className={styles.instanceType}>{getInstanceType()}</div>
              <div className={styles.specs}>2 vCPU, 8GB RAM</div>
              <div className={styles.cost}>$112/month</div>
            </div>
            <div className={styles.utilization}>
              <div className={styles.utilizationBar}>
                <div className={styles.cpuBar} style={{width: `${data.cpuUtil}%`}}></div>
                <span>CPU: {data.cpuUtil}%</span>
              </div>
              <div className={styles.utilizationBar}>
                <div className={styles.memBar} style={{width: `${data.memUtil}%`}}></div>
                <span>Memory: {data.memUtil}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Impact */}
        <div className={styles.costImpact}>
          <div className={styles.costCard}>
            <h5>Monthly Cost</h5>
            <div className={styles.costComparison}>
              <span className={styles.currentCost}>${data.currentCost.toLocaleString()}</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.optimizedCost}>${data.optimizedCost.toLocaleString()}</span>
            </div>
          </div>
          
          <div className={styles.savingsCard}>
            <h5>Monthly Savings</h5>
            <div className={styles.savings}>
              <span className={styles.savingsAmount}>${data.savings.toLocaleString()}</span>
              <span className={styles.savingsPercent}>({data.savingsPercent}%)</span>
            </div>
          </div>

          <div className={styles.annualCard}>
            <h5>Annual Impact</h5>
            <div className={styles.annualSavings}>
              <span className={styles.annualAmount}>${data.annualSavings.toLocaleString()}</span>
              <span className={styles.annualLabel}>saved per year</span>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className={styles.progressIndicators}>
          <div className={styles.progressItem}>
            <span>Cost Efficiency</span>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{width: `${sliderValue}%`}}
              ></div>
            </div>
            <span>{Math.round(sliderValue)}%</span>
          </div>
          
          <div className={styles.progressItem}>
            <span>Resource Utilization</span>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{width: `${Math.min(data.cpuUtil + data.memUtil, 100)}%`}}
              ></div>
            </div>
            <span>{Math.min(Math.round((data.cpuUtil + data.memUtil) / 2), 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputeOptimizationSlider;
