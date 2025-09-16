import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "@/contexts/AppContext";
import Navigation from "@/components/Navigation";

// Pages
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Explore from "./pages/Explore";
import Profiles from "./pages/Profiles";
import Hovmoller from "./pages/Hovmoller";
import Compare from "./pages/Compare";
import Analytics from "./pages/Analytics";
import TeachMe from "./pages/TeachMe";
import Provenance from "./pages/Provenance";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider>
        <AppProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navigation />
              <main>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/profiles" element={<Profiles />} />
                  <Route path="/hovmoller" element={<Hovmoller />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/teachme" element={<TeachMe />} />
                  <Route path="/provenance" element={<Provenance />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </AppProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;