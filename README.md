# Alba - The Tea Collection Web App

> A modern Next.js web application designed to catalogue and manage your personal tea collection with an elegant, responsive interface and smooth animations.

**Alba** evolved from a Front-end Development Specialization final project into a full-featured tea collection manager, showcasing modern React patterns, Next.js app router, TypeScript, and contemporary web development practices.

[![Next.js](https://img.shields.io/badge/Next.js-15.4-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## Features

**Tea Collection Management**

- Add, edit, and delete teas from your personal collection
- Rich tea profiles with type, brewing time, tasting notes, and descriptions
- Favorite system and advanced filtering by tea type
- Persistent storage using Zustand with local storage

**Modern UI/UX**

- Responsive design optimized for desktop, tablet, and mobile
- Smooth animations and transitions using Framer Motion
- Interactive tilt effects with React Parallax Tilt
- Modal system with multiple variants and animations
- Toast notifications using Sonner

**Weather Integration**

- Real-time weather data with location detection
- Weather widget displaying current conditions
- Cross-platform geolocation handling

**Profile System**

- Profile pages with dynamic routing
- Tea level progression tracking (Beginner → Connoisseur → Master)
- Collection overview and statistics
- Profile dropdown navigation

**Technical Features**

- TypeScript for type safety
- Server-side rendering with Next.js App Router
- Form validation using React Hook Form and Zod
- Responsive design with Tailwind CSS
- Custom hooks for reusable logic
- Error boundaries and loading states

---

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/luccafuccil/alba-tea-collection.git

# Navigate to project directory
cd alba-tea-collection

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at http://localhost:3000

---

## Project Structure

```
alba-tea-collection/
├── public/
│   ├── profile.json          # Static profile data
│   └── images/               # Tea illustrations and assets
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (auth)/          # Authentication layout group
│   │   ├── (main)/          # Main application layout
│   │   │   ├── @modal/      # Parallel routes for modals
│   │   │   ├── closet/      # Tea collection management
│   │   │   ├── discover/    # Discover new teas
│   │   │   ├── profile/     # User profiles
│   │   │   ├── rituals/     # Tea rituals (planned)
│   │   │   └── tea/         # Individual tea pages
│   │   └── api/             # API routes
│   ├── components/          # Reusable UI components
│   │   ├── closet/         # Tea collection components
│   │   ├── home/           # Homepage components
│   │   ├── layout/         # Layout components
│   │   ├── profile/        # Profile components
│   │   ├── providers/      # Context providers
│   │   ├── tea/            # Tea-related components
│   │   ├── ui/             # Base UI components
│   │   └── widgets/        # Feature widgets
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and constants
│   └── store/              # Zustand state management
└── package.json
```

---

## Usage

### Managing Your Tea Collection

- Navigate to the **Closet** page to view your collection
- Click **"Add New Tea"** to create a new tea entry
- Fill in tea details: name, type, brewing time, description, and tasting notes
- Use the filter buttons to sort by tea type or view favorites
- Click on any tea card to view detailed information
- Edit or delete teas using the action buttons in detail view

### Navigation

- **Home**: Welcome page with quick access to main features
- **Closet**: Your personal tea collection
- **Discover**: Explore new teas and recommendations
- **Rituals**: Tea meditation and brewing rituals (coming soon)
- **Profile**: View your tea journey and statistics

---

## Technology Stack

### Core Technologies

- **Next.js 15.4**: React framework with App Router for server-side rendering
- **React 19.1**: Latest React with concurrent features
- **TypeScript 5**: Type safety and enhanced developer experience
- **Tailwind CSS 4**: Utility-first styling with modern CSS features

### State Management & Data

- **Zustand**: Lightweight state management with persistence
- **React Hook Form**: Performant form handling with validation
- **Zod**: Schema validation for type-safe forms
- **UUID**: Unique identifier generation

### UI & Animation

- **Framer Motion**: Smooth animations and transitions
- **React Parallax Tilt**: Interactive tilt effects
- **Sonner**: Beautiful toast notifications
- **Tabler Icons**: Comprehensive icon set

### Development Tools

- **ESLint**: Code linting and formatting
- **Turbopack**: Fast development bundling
- **PostCSS**: CSS processing and optimization

## API Integration

### Weather Data

- **Provider**: Open-Meteo API
- **Features**: Real-time weather conditions and temperature
- **Location**: Browser geolocation with fallback handling

### Data Persistence

- **Local Storage**: Client-side tea collection storage
- **Zustand Persist**: Automatic state persistence and rehydration

---

## Technical Highlights

### Architecture

- **Next.js App Router**: Modern routing with layout groups and parallel routes
- **Server Components**: Optimized performance with server-side rendering
- **TypeScript**: End-to-end type safety with strict configuration
- **Component Composition**: Modular, reusable component architecture

### Performance

- **Client-side State**: Zustand for efficient state management
- **Form Optimization**: React Hook Form for minimal re-renders
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting

### User Experience

- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Accessibility**: ARIA labels and keyboard navigation support
- **Error Handling**: Comprehensive error boundaries and validation
- **Loading States**: Smooth loading indicators and skeleton screens

---

## Development Roadmap

### Authentication & Profiles

- User authentication system
- Personalized profiles with custom settings
- Cloud synchronization for tea collections
- Social features and tea sharing

### Enhanced Features

- **Tea Rituals**: Guided meditation sessions with brewing timers
- **Smart Recommendations**: AI-powered tea suggestions based on weather and preferences
- **Brewing Assistant**: Step-by-step brewing guides with timers
- **Collection Analytics**: Insights into your tea journey and preferences

### Marketplace Integration

- **Tea Shop**: Curated tea marketplace with reviews
- **Personalized Suggestions**: Recommendations based on your collection
- **Wishlist System**: Save and track teas you want to try

### Mobile Experience

- **Progressive Web App**: Offline-first mobile experience
- **Push Notifications**: Brewing reminders and new tea alerts
- **Camera Integration**: Add teas by scanning packaging

---

## Contributing

This project welcomes contributions! Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.

---

_Originally built as a Frontend Specialization final project for PUC-Rio, now evolving into a comprehensive tea collection management platform._
