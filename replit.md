# Advanced Data Entry System

## Overview

This is a comprehensive TypeScript-based data entry system built with modern web technologies. The application provides a professional interface for creating, managing, and analyzing data entries with features like multi-step form wizards, real-time data visualization, and advanced user management. The system is designed for efficiency and scalability, supporting various data types and workflows through a clean, intuitive interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with **React 18** and **TypeScript**, using modern patterns and hooks for state management. The application uses **Wouter** for lightweight client-side routing instead of React Router, providing a minimal but effective navigation system. The UI is component-based with a clear separation between presentation and business logic.

**Component Structure**: The application follows a modular component architecture with reusable UI components in `/components/ui/` and feature-specific components in `/components/`. Pages are organized in `/pages/` with each route having its own dedicated component.

**State Management**: Uses React's built-in state management with hooks, enhanced by **TanStack Query** for server state management, caching, and data synchronization. No global state management library is used, keeping the architecture simple and focused.

**Form Handling**: Implements **React Hook Form** with **Zod** validation for type-safe form management. This combination provides excellent TypeScript integration and runtime validation.

### Backend Architecture
The server uses **Express.js** with TypeScript for the REST API layer. The architecture includes a storage abstraction layer that currently uses in-memory storage but is designed to be easily replaceable with a persistent database.

**API Design**: RESTful API structure with routes organized in `/server/routes.ts`. The server includes middleware for logging, error handling, and request processing.

**Storage Layer**: Abstract storage interface (`IStorage`) allows for easy swapping between different storage implementations. Currently implements `MemStorage` for development, but designed to support database implementations.

### Design System
Built on **Tailwind CSS** with a custom design system following Material Design 3 principles. The system uses **shadcn/ui** components as the foundation, providing a consistent and accessible component library.

**Theming**: Supports both light and dark modes with CSS custom properties for dynamic theme switching. Colors and spacing follow a systematic approach with predefined scales.

**Typography**: Uses Inter as the primary font with JetBrains Mono for code/data display. Typography scales are defined consistently across the application.

**Component Library**: Comprehensive set of UI components including forms, navigation, data display, and interactive elements. All components are built with accessibility in mind using Radix UI primitives.

### Development Tools
**Build System**: Uses **Vite** for fast development and building, with hot module replacement for efficient development workflow.

**Type Safety**: Full TypeScript implementation with strict mode enabled, providing compile-time type checking across the entire application.

**Code Quality**: ESLint and TypeScript compiler provide code quality checks and type safety validation.

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with hooks and modern patterns
- **Express.js**: Backend web framework for Node.js
- **TypeScript**: Type-safe JavaScript with full project coverage
- **Vite**: Build tool and development server

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Accessible component primitives for complex UI components
- **Lucide React**: Icon library for consistent iconography

### Database and Storage
- **Drizzle ORM**: Type-safe ORM configured for PostgreSQL
- **@neondatabase/serverless**: PostgreSQL database driver for serverless environments
- **Drizzle Kit**: Database migrations and schema management

### Forms and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### Data Fetching and State
- **TanStack Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight client-side routing library

### Date and Utilities
- **date-fns**: Modern date utility library
- **clsx**: Conditional className utility
- **class-variance-authority**: Utility for creating type-safe component variants

### Development and Build Tools
- **PostCSS**: CSS processing with Autoprefixer
- **ESBuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution for development server

The application is designed to be easily deployable on platforms like Replit, with configuration files optimized for both development and production environments.