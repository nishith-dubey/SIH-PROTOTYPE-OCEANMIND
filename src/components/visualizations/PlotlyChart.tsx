import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';

interface PlotlyChartProps {
  data: any[];
  layout: any;
  config?: any;
  className?: string;
}

export const PlotlyChart: React.FC<PlotlyChartProps> = ({ 
  data, 
  layout, 
  config = {}, 
  className = "" 
}) => {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (plotRef.current) {
      const defaultConfig = {
        responsive: true,
        displayModeBar: true,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d'],
        displaylogo: false,
        ...config
      };

      const defaultLayout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: { color: '#ffffff', family: 'Inter, sans-serif' },
        margin: { l: 60, r: 40, t: 60, b: 60 },
        ...layout
      };

      Plotly.newPlot(plotRef.current, data, defaultLayout, defaultConfig);
    }

    return () => {
      if (plotRef.current) {
        Plotly.purge(plotRef.current);
      }
    };
  }, [data, layout, config]);

  return <div ref={plotRef} className={`w-full h-full ${className}`} />;
};