import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeroButton } from '@/components/ui/hero-button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Database, 
  Code, 
  Copy, 
  Download, 
  ExternalLink, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Provenance = () => {
  const { lastQuery, t } = useApp();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exampleSQL = lastQuery.sql || `
SELECT 
  platform_number,
  cycle_number,
  longitude,
  latitude,
  juld,
  pres_adjusted,
  temp_adjusted,
  psal_adjusted,
  temp_adjusted_qc,
  psal_adjusted_qc
FROM argo_profiles 
WHERE platform_number IN ('1901393', '2902746')
  AND pres_adjusted BETWEEN 0 AND 500
  AND juld >= '2018-01-01'
  AND temp_adjusted_qc IN ('1', '2')
ORDER BY platform_number, cycle_number, pres_adjusted`;

  const exampleERDDAP = lastQuery.erddapUrl || 
    `https://data-argo.ifremer.fr/erddap/tabledap/ArgoFloats.json?platform_number,longitude,latitude,temp,psal,temp_qc,psal_qc&platform_number=~"(1901393|2902746)"&time>=2018-01-01T00:00:00Z&pres<=500&temp_qc=~"(1|2)"`;

  const pythonCode = `
# Python code to reproduce this query
import pandas as pd
import requests
from datetime import datetime

# ERDDAP query parameters
base_url = "https://data-argo.ifremer.fr/erddap/tabledap/ArgoFloats.json"
params = {
    'platform_number': '~"(1901393|2902746)"',
    'time': '>=2018-01-01T00:00:00Z',
    'pres': '<=500',
    'temp_qc': '~"(1|2)"'
}

# Fetch data
response = requests.get(base_url, params=params)
data = response.json()

# Convert to DataFrame
df = pd.DataFrame(data['table']['rows'], 
                  columns=data['table']['columnNames'])

# Apply quality control filters
df_qc = df[df['temp_qc'].isin(['1', '2'])]

print(f"Retrieved {len(df_qc)} quality-controlled measurements")
print(f"Query executed at: {datetime.now()}")
`;

  const rCode = `
# R code to reproduce this query
library(httr)
library(jsonlite)
library(dplyr)

# ERDDAP query
url <- "https://data-argo.ifremer.fr/erddap/tabledap/ArgoFloats.json"
query_params <- list(
  platform_number = '~"(1901393|2902746)"',
  time = ">=2018-01-01T00:00:00Z",
  pres = "<=500",
  temp_qc = '~"(1|2)"'
)

# Fetch and process data
response <- GET(url, query = query_params)
data <- fromJSON(content(response, "text"))

df <- data.frame(data$table$rows)
names(df) <- data$table$columnNames

# Apply QC filters
df_qc <- df[df$temp_qc %in% c("1", "2"), ]

cat("Retrieved", nrow(df_qc), "quality-controlled measurements\\n")
cat("Query executed at:", format(Sys.time()), "\\n")
`;

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-ocean bg-clip-text text-transparent mb-2">
          Data Provenance & Reproducibility
        </h1>
        <p className="text-muted-foreground">
          Complete record of data sources, queries, and methods for transparent oceanographic research
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Query Summary */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Last Query
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium">Timestamp:</span>
                  <p className="text-sm text-muted-foreground">
                    {lastQuery.timestamp ? 
                      new Date(lastQuery.timestamp).toLocaleString() : 
                      new Date().toLocaleString()
                    }
                  </p>
                </div>
                
                {lastQuery.parameters && (
                  <div>
                    <span className="text-sm font-medium">Parameters:</span>
                    <div className="mt-1 space-y-1">
                      {Object.entries(lastQuery.parameters).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{key}:</span>
                          <span>{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 pt-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Query Successful</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">QC Flags Used:</span>
                  <div className="flex space-x-1">
                    <Badge variant="default" className="text-xs">1</Badge>
                    <Badge variant="secondary" className="text-xs">2</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Mode:</span>
                  <Badge variant="outline" className="text-xs">Delayed Mode Preferred</Badge>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-xs text-orange-600">
                      Always verify QC flags before analysis
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <HeroButton variant="outline" size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Query Metadata
              </HeroButton>
              <HeroButton variant="outline" size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Research Notes
              </HeroButton>
              <HeroButton variant="outline" size="sm" className="w-full">
                <Code className="h-4 w-4 mr-2" />
                Code Repository
              </HeroButton>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Provenance */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SQL Query */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  SQL Query
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(exampleSQL.trim())}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap">{exampleSQL.trim()}</pre>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>Standard Argo SQL schema</span>
                <a href="#" className="flex items-center text-primary hover:underline">
                  View Schema <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* ERDDAP URL */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2 text-secondary" />
                  ERDDAP Query URL
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(exampleERDDAP)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg text-sm">
                <div className="break-all font-mono">
                  {exampleERDDAP}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Direct access to Argo data via ERDDAP API
                </span>
                <Button variant="outline" size="sm" asChild>
                  <a href={exampleERDDAP} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open URL
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Python Code */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg">
                    <Code className="h-5 w-5 mr-2 text-accent" />
                    Python Code
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(pythonCode.trim())}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto max-h-64">
                  <pre className="whitespace-pre-wrap">{pythonCode.trim()}</pre>
                </div>
              </CardContent>
            </Card>

            {/* R Code */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg">
                    <Code className="h-5 w-5 mr-2 text-accent" />
                    R Code
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(rCode.trim())}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto max-h-64">
                  <pre className="whitespace-pre-wrap">{rCode.trim()}</pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reproducibility Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Reproducibility Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Data source URLs documented</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Quality control criteria specified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Query parameters recorded</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Processing code available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Timestamp and version tracked</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>Citation:</strong> Argo (2024). Argo float data and metadata from Global Data Assembly 
                  Centre (Argo GDAC). SEANOE. https://doi.org/10.17882/42182
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Provenance;