import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Thermometer, 
  Droplets, 
  Wind, 
  BarChart3, 
  TrendingUp,
  Globe,
  Activity
} from 'lucide-react';

interface QuickQuestionCardProps {
  onQuestionSelect: (question: string) => void;
}

export const QuickQuestionCard: React.FC<QuickQuestionCardProps> = ({ onQuestionSelect }) => {
  const quickQuestions = [
    {
      question: "Show me temperature profiles for float 13857",
      category: "Temperature Analysis",
      icon: Thermometer,
      color: "from-red-500 to-orange-600",
      description: "Analyze temperature distribution with depth"
    },
    {
      question: "Compare salinity between Arabian Sea floats",
      category: "Regional Comparison",
      icon: Droplets,
      color: "from-blue-500 to-cyan-600",
      description: "Compare salinity patterns across regions"
    },
    {
      question: "What are oxygen levels at 100m depth?",
      category: "Depth Analysis",
      icon: Wind,
      color: "from-green-500 to-emerald-600",
      description: "Examine oxygen distribution at specific depth"
    },
    {
      question: "Show me data quality statistics",
      category: "Quality Control",
      icon: BarChart3,
      color: "from-purple-500 to-pink-600",
      description: "Review data quality and QC flags"
    },
    {
      question: "Explain mixed layer depth patterns",
      category: "Ocean Physics",
      icon: TrendingUp,
      color: "from-indigo-500 to-purple-600",
      description: "Learn about ocean layer structure"
    },
    {
      question: "Compare float trajectories over time",
      category: "Trajectory Analysis",
      icon: Globe,
      color: "from-cyan-500 to-blue-600",
      description: "Track float movements and patterns"
    }
  ];

  return (
    <Card className="bg-slate-700 border-slate-600">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <MessageCircle className="h-4 w-4 mr-2 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white">Quick Questions</h3>
        </div>
        
        <div className="space-y-2">
          {quickQuestions.slice(0, 4).map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full text-left justify-start p-2 h-auto bg-slate-600 hover:bg-slate-500 border border-slate-500 hover:border-cyan-500/50 transition-all duration-200 group text-xs"
                onClick={() => onQuestionSelect(item.question)}
              >
                <div className="flex items-center space-x-2 w-full">
                  <div className="p-1 bg-cyan-600 rounded">
                    <Icon className="h-3 w-3 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-white group-hover:text-cyan-300 transition-colors text-xs">
                      {item.question}
                    </span>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};