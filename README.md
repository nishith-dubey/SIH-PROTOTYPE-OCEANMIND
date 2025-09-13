# AquaScope Pro - AI-Powered Ocean Data Platform

🌊 A comprehensive oceanographic data visualization platform developed for the Government of India's Ministry of Earth Sciences, featuring advanced ARGO float data analysis with AI-assisted insights.

![AquaScope Pro](https://img.shields.io/badge/Version-1.0.0-blue) ![React](https://img.shields.io/badge/React-18.3.1-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6) ![Vite](https://img.shields.io/badge/Vite-5.4.20-646CFF)

## 🚀 Features

### 📊 Interactive Dashboards
- **Analytics Dashboard** - Profile Analysis, Float Comparison, and Hovmoller Analysis
- **Geospatial Dashboard** - Real-time ocean data visualization with 2D maps and 3D globe
- **Interactive Charts** - Temperature distribution, salinity patterns, and institutional data

### 🎓 Educational Content
- **Interactive Learning Hub** - Ocean basics, ARGO float operations, data quality tutorials
- **Animated ARGO Cycle** - Visual demonstration of float operations with depth tracking
- **Quality Control Guide** - Interactive examples of data quality flags and patterns

### 🤖 AI Assistant
- **Natural Language Queries** - Ask questions about ocean data in plain English
- **Data Visualization** - Automatic chart generation based on queries
- **Smart Insights** - AI-powered analysis and recommendations

### 🏛️ Government Design
- **Accessibility Compliant** - WCAG 2.1 AA standards
- **Professional Interface** - Government of India design system
- **Secure Architecture** - Enterprise-grade security features

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 18.0.0 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

### Checking Prerequisites

```bash
# Check Node.js version
node --version
# Should return v18.0.0 or higher

# Check npm version
npm --version
# Should return 6.0.0 or higher

# Check Git version
git --version
```

## 📥 Installation & Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/mayurchouhan0111/float-voyager.git

# Navigate to the project directory
cd float-voyager
```

### 2. Install Dependencies

```bash
# Install all project dependencies
npm install

# This will install all packages listed in package.json including:
# - React 18.3.1
# - TypeScript 5.8.3
# - Vite 5.4.20
# - Tailwind CSS 3.4.17
# - Radix UI components
# - Cesium for 3D globe
# - Plotly.js for charts
# - And many more...
```

### 3. Start Development Server

```bash
# Start the development server
npm run dev

# The application will be available at:
# http://localhost:8080/
```

### 4. Build for Production

```bash
# Build the application for production
npm run build

# Preview the production build
npm run preview
```

## 🚀 Quick Start Commands Summary

For someone cloning this project on a new PC, here are the exact commands to run:

```bash
# 1. Clone the repository
git clone https://github.com/mayurchouhan0111/float-voyager.git
cd float-voyager

# 2. Install dependencies (this may take 2-3 minutes)
npm install

# 3. Start the development server
npm run dev

# 4. Open your browser and go to: http://localhost:8080/
```

## 📱 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts development server at http://localhost:8080 |
| `npm run build` | Builds the app for production |
| `npm run build:dev` | Builds the app in development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🌐 Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with interactive tutorials |
| `/chat` | AI Chat | AI assistant for ocean data queries |
| `/dashboard` | Dashboard | Real-time geospatial data visualization |
| `/analytics` | Analytics | Advanced data analysis tools |
| `/explore` | Explore | 3D ocean data exploration |
| `/teachme` | TeachMe | Interactive learning materials |
| `/login` | Login | User authentication |
| `/signup` | SignUp | User registration |

## 🎯 Key Technologies

### Frontend Stack
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.8.3** - Type-safe JavaScript development
- **Vite 5.4.20** - Fast build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

### UI Components
- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library for smooth interactions

### Data Visualization
- **Plotly.js** - Interactive charts and graphs
- **Cesium** - 3D globe and geospatial visualization
- **Leaflet** - 2D interactive maps
- **Recharts** - React charting library

### Data Processing
- **NetCDF.js** - Scientific data format support
- **ASCII Table** - Data table formatting
- **File Saver** - Export functionality

## 🔧 Development Setup

### Environment Configuration

The application runs in light mode by default and uses government color schemes. Key configuration files:

- `tailwind.config.ts` - Tailwind CSS configuration
- `vite.config.ts` - Vite build configuration  
- `tsconfig.json` - TypeScript configuration

### Adding New Features

1. Components go in `src/components/`
2. Pages go in `src/pages/`
3. Utilities go in `src/utils/`
4. Styles go in `src/index.css`

## 🌊 Data Sources

The application works with:
- **ARGO Float Data** - Global ocean observation network
- **Oceanographic Parameters** - Temperature, salinity, dissolved oxygen
- **Quality Control Flags** - Data reliability indicators
- **Geospatial Information** - Float positions and trajectories

## 📊 Interactive Features

### Dashboard Features
- Real-time data visualization
- Interactive 2D/3D maps
- Exportable charts (CSV, NetCDF, JSON)
- Quality control monitoring

### Learning Features
- Interactive parameter sliders
- Animated ARGO float cycle
- Data quality pattern recognition
- Guided analysis tutorials

## 🎨 Design System

The application follows the Government of India design system:
- **Primary Colors** - Navy blue (#003d82)
- **Accent Colors** - Saffron orange (#ff9933)
- **Typography** - Segoe UI, system fonts
- **Components** - Accessible, WCAG 2.1 AA compliant

## 🚨 Troubleshooting

### Common Issues

**1. Node.js Version Issues**
```bash
# Check your Node.js version
node --version
# If below 18.0.0, update Node.js from nodejs.org
```

**2. Installation Fails**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

**3. Port 8080 Already in Use**
```bash
# The dev server will automatically try the next available port
# Or specify a different port:
npm run dev -- --port 3000
```

**4. Build Errors**
```bash
# Run type checking
npx tsc --noEmit
# Fix any TypeScript errors before building
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is developed for the Government of India, Ministry of Earth Sciences.

## 🙏 Acknowledgments

- **ARGO Global Ocean Observing System** - For ocean data
- **Ministry of Earth Sciences, Government of India** - Project sponsorship
- **React Community** - For the amazing ecosystem
- **Tailwind CSS** - For the utility-first CSS framework

## 📞 Support

For technical support or questions:
- 📧 Email: support@aquascope.gov.in
- 🏛️ Policy: policy@moes.gov.in
- 📞 Phone: 1800-XXX-XXXX (Toll Free)

---

**Built with ❤️ for Ocean Science Research**

*Powered by ARGO Global Ocean Observing System*
