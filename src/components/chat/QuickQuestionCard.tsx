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
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-cyan-500/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <MessageCircle className="h-5 w-5 mr-2 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Quick Questions</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {quickQuestions.map((item, index) => {
            const Icon = item.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="w-full text-left justify-start p-4 h-auto bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                onClick={() => onQuestionSelect(item.question)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <div className={`p-2 bg-gradient-to-r ${item.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-white group-hover:text-cyan-300 transition-colors">
                        {item.question}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-white/10 text-slate-300 border-white/20 text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{item.description}</p>
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