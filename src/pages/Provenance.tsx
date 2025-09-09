import React, { useState } from 'react';
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
  AlertCircle,
  Archive,
  Shield,
  GitBranch
} from 'lucide-react';

const Provenance = () => {
  const { lastQuery, t } = useApp();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const exampleSQL = lastQuery?.sql || `
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

  const exampleERDDAP = lastQuery?.erddapUrl || `https://data-argo.ifremer.fr/erddap/tabledap/ArgoFloats.json?platform_number,longitude,latitude,temp,psal,temp_qc,psal_qc&platform_number=~"(1901393|2902746)"&time>=2018-01-01T00:00:00Z&pres<=500&temp_qc=~"(1|2)"`;

  const pythonCode = `
# Python code to reproduce this query
import pandas as pd
import requests
from datetime import datetime
import numpy as np

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

# Basic data analysis
print("\\nData Summary:")
print(f"Temperature range: {df_qc['temp'].min():.2f} to {df_qc['temp'].max():.2f} °C")
print(f"Depth range: {df_qc['pres'].min():.1f} to {df_qc['pres'].max():.1f} dbar")
`;

  const rCode = `
# R code to reproduce this query
library(httr)
library(jsonlite)
library(dplyr)
library(ggplot2)

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

# Create summary plot
p <- ggplot(df_qc, aes(x = as.numeric(temp), y = as.numeric(pres))) +
    geom_point(alpha = 0.6) +
    scale_y_reverse() +
    labs(x = "Temperature (°C)", y = "Pressure (dbar)",
         title = "Temperature vs Pressure Profile")
print(p)
`;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-600 rounded-xl">
              <Archive className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Data Provenance</h1>
              <p className="text-zinc-400">Complete record of data sources, queries, and methods for transparent research</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Query Information */}
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                Query Information
              </div>
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="h-4 w-4 mr-1" />
                Verified
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-950 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 text-indigo-400 mr-2" />
                  <span className="text-zinc-400 text-sm">Execution Time</span>
                </div>
                <div className="text-white font-mono text-lg">
                  {lastQuery?.timestamp ? new Date(lastQuery.timestamp).toLocaleString() : new Date().toLocaleString()}
                </div>
              </div>
              
              <div className="bg-zinc-950 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Database className="h-4 w-4 text-indigo-400 mr-2" />
                  <span className="text-zinc-400 text-sm">Data Source</span>
                </div>
                <div className="text-white">Argo GDAC</div>
              </div>
              
              <div className="bg-zinc-950 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Shield className="h-4 w-4 text-indigo-400 mr-2" />
                  <span className="text-zinc-400 text-sm">Quality Control</span>
                </div>
                <div className="text-green-400">Validated</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Code Repository */}
          <div className="space-y-6">
            {/* SQL Query */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 mr-2 text-indigo-500" />
                    SQL Query
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(exampleSQL.trim(), 'sql')}
                    className="text-zinc-400 hover:text-white"
                  >
                    {copiedSection === 'sql' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-zinc-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap">
                    <code>{exampleSQL.trim()}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Python Code */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <Code className="h-5 w-5 mr-2 text-indigo-500" />
                    Python Code
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(pythonCode.trim(), 'python')}
                    className="text-zinc-400 hover:text-white"
                  >
                    {copiedSection === 'python' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-zinc-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap">
                    <code>{pythonCode.trim()}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* R Code */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <GitBranch className="h-5 w-5 mr-2 text-indigo-500" />
                    R Code
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(rCode.trim(), 'r')}
                    className="text-zinc-400 hover:text-white"
                  >
                    {copiedSection === 'r' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-zinc-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap">
                    <code>{rCode.trim()}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metadata and Documentation */}
          <div className="space-y-6">
            {/* Data Sources */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-indigo-500" />
                  Data Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-zinc-950 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">Argo Global Data Assembly Centre</h4>
                    <Badge className="bg-green-600 text-white text-xs">Active</Badge>
                  </div>
                  <p className="text-zinc-400 text-sm mb-3">
                    Real-time and delayed-mode oceanographic data from autonomous profiling floats
                  </p>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-indigo-400 hover:text-indigo-300 text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit Source
                  </Button>
                </div>

                <div className="bg-zinc-950 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">ERDDAP Server</h4>
                    <Badge className="bg-blue-600 text-white text-xs">API</Badge>
                  </div>
                  <p className="text-zinc-400 text-sm mb-3">
                    Environmental Research Division's Data Access Program for oceanographic data
                  </p>
                  <div className="text-xs text-zinc-500 font-mono bg-zinc-800 p-2 rounded">
                    {exampleERDDAP.substring(0, 80)}...
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quality Control */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-indigo-500" />
                  Quality Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Data Validation</div>
                      <div className="text-zinc-400 text-sm">Automated QC checks applied</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Flag Filtering</div>
                      <div className="text-zinc-400 text-sm">Only good/probably good data</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Metadata Verification</div>
                      <div className="text-zinc-400 text-sm">Source and processing tracked</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Download className="h-5 w-5 mr-2 text-indigo-500" />
                  Export & Reproduce
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download Complete Provenance
                </Button>
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
                  <Code className="h-4 w-4 mr-2" />
                  Export Notebook
                </Button>
              </CardContent>
            </Card>

            {/* Citation */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-indigo-500" />
                  Citation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-zinc-950 p-4 rounded-lg">
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    <strong>Citation:</strong> Argo (2024). Argo float data and metadata from Global Data Assembly
                    Centre (Argo GDAC). SEANOE. https://doi.org/10.17882/42182
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => copyToClipboard("Argo (2024). Argo float data and metadata from Global Data Assembly Centre (Argo GDAC). SEANOE. https://doi.org/10.17882/42182", 'citation')}
                  className="mt-3 text-zinc-400 hover:text-white"
                >
                  {copiedSection === 'citation' ? (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1" />
                  )}
                  Copy Citation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Provenance;
