# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development Commands
- `npm run dev` - Start the development server on port 8080
- `npm run build` - Build production bundle
- `npm run build:dev` - Build development bundle
- `npm run lint` - Run ESLint on all TypeScript/JavaScript files
- `npm run preview` - Preview production build locally

### Testing Specific Components
- To test individual pages, navigate to: `http://localhost:8080/{page}` where page can be: `chat`, `dashboard`, `explore`, `profiles`, `hovmoller`, `compare`, `teachme`, `provenance`
- Components are located in `src/components/` and pages in `src/pages/`

### Package Management
- This project uses npm with package-lock.json
- Key dependency: Uses Cesium for 3D globe visualization which requires special handling
- All UI components are from shadcn/ui with Radix UI primitives

## Architecture

### Application Structure
Float Voyager is an oceanographic data visualization platform for Argo float data with the following key architectural patterns:

**Core Framework**: React 18 + TypeScript + Vite with SWC compiler for fast development

**State Management**: 
- Global app state managed via React Context (`AppContext.tsx`)
- React Query (`@tanstack/react-query`) for server state management
- All oceanographic data currently uses mock data from `src/data/mockData.ts`

**Routing Structure**:
- `Index` - Landing page with hero and features
- `Chat` - AI-powered chat interface for data queries
- `Dashboard` - Main geospatial dashboard with advanced analytics
- `Explore` - Float exploration and filtering interface
- `Profiles` - Individual float profile visualization
- `Hovmoller` - Time-series visualization
- `Compare` - Multi-float comparison tools
- `TeachMe` - Educational content interface
- `Provenance` - Data source and query tracking

### Key Components

**Visualization Components** (`src/components/visualizations/`):
- `CesiumViewer.tsx` - 3D globe using Cesium.js for geospatial float visualization
- `PlotlyChart.tsx` - Scientific charts and graphs using Plotly.js
- `DataTable.tsx` - Tabular data display with export capabilities

**UI Architecture**:
- Design system built on shadcn/ui + Tailwind CSS with custom oceanographic theme
- Dark mode support via `next-themes`
- Responsive design with mobile-first approach
- Custom animations and ocean-themed backgrounds

**Data Layer**:
- Mock Argo float data structure in `src/data/mockData.ts`
- Supports multiple data formats: temperature, salinity, oxygen profiles
- Multi-language support (English/Hindi) with translation system
- Chat system with contextual responses based on oceanographic queries

### Development Patterns

**Component Organization**:
- Feature-based component organization under `src/components/`
- Shared UI components from shadcn/ui in `src/components/ui/`
- Custom hooks in `src/hooks/`
- Utilities in `src/lib/utils.ts` and `src/utils/`

**Styling Approach**:
- Tailwind CSS with custom theme configuration
- CSS custom properties for dynamic theming
- Gradient-heavy design with ocean/scientific aesthetic
- Component-scoped styles using className patterns

**TypeScript Configuration**:
- Path mapping configured for `@/*` imports pointing to `src/*`
- Relaxed TypeScript settings for rapid prototyping
- Type definitions for Argo float data structures

### Key Technologies Integration

**Cesium Integration**:
- Requires special build configuration in Vite
- Global 3D earth visualization for float positions
- Interactive point-and-click float selection

**Plotly Charts**:
- Scientific plotting for oceanographic profiles
- Supports temperature, salinity, oxygen depth profiles
- Export capabilities for scientific data

**Export System** (`src/utils/exportUtils.ts`):
- Multi-format data export: CSV, ASCII tables, NetCDF format
- Scientific data formatting for oceanographic research

### Mock Data System
The application uses comprehensive mock data that simulates real Argo float behavior:
- Multiple float trajectories across different ocean basins
- Realistic oceanographic profiles with proper depth-temperature-salinity relationships
- Quality control flags and metadata
- Chat responses contextually generated based on scientific queries

### State Management Patterns
- App-wide state through `useApp()` hook
- Selected floats tracked globally for cross-component visualization
- Chat history with scientific context preservation
- Query provenance tracking for reproducible research

When working with this codebase, understand that it's designed to eventually connect to real oceanographic databases (ERDDAP, THREDDS), but currently operates on realistic mock data for development and demonstration purposes.
