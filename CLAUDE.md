# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (or `yarn dev`)
- **Build for production**: `npm run build` (TypeScript compilation + Vite build)
- **Lint code**: `npm run lint` (ESLint with TypeScript rules)
- **Preview production build**: `npm run preview`

## Architecture Overview

This is a React + TypeScript frontend application using a layered architecture with clear separation of concerns:

### Tech Stack
- **React 19** with TypeScript
- **Vite** for bundling and development
- **Zustand** for state management
- **Axios** for HTTP requests
- **Material-UI** + **Tailwind CSS** for styling
- **React Router** for navigation
- **Supabase** for backend services

### Architecture Layers

1. **API Layer** (`src/api/`)
   - `apiClient.ts` - Axios instance with JWT token interceptor
   - Service modules organized by domain (auth, student, dashboard, etc.)
   - DTOs for request/response types (`src/api/commercial/dto/`)
   - Adapters for data transformation (`src/api/commercial/adapter/`)

2. **State Management** (`src/store/`)
   - Zustand stores organized by domain
   - Handles loading states, data collections, and business logic
   - Examples: `authStore.ts`, `studentStore.ts`, `dashboardStore.ts`

3. **Presentation Layer** (`src/pages/`, `src/components/`)
   - Pages organized by feature domains
   - Reusable UI components in `src/components/ui/`
   - Layout components for different user roles

### Key Patterns

**DTO + Adapter Pattern**: Raw API responses are transformed via adapters:
```
API Response (DTO) → Adapter Function → Frontend Model → Zustand Store → UI Component
```

**Role-Based Access**: Two main user flows:
- Admin users: Full dashboard with profile management, payments, attendance logs
- Student users: Limited dashboard with personal logs and check-in functionality

**Path Aliases**: Use `@/` to reference `src/` directory (configured in `vite.config.ts` and `tsconfig.json`)

## Project Structure

```
src/
├── api/           # HTTP services and data transformation
├── components/    # Reusable UI components
├── pages/         # Feature-specific page components
├── store/         # Zustand state management
├── types/         # TypeScript type definitions
├── routes/        # React Router configuration
├── utils/         # Helper utilities and validation schemas
└── hooks/         # Custom React hooks
```

## Authentication Flow

- JWT tokens stored in localStorage
- Automatic token attachment via Axios interceptor
- Role-based route protection with `ProtectedRoute` component
- Auto-logout on token expiration using decoded JWT `exp` field

## State Management Patterns

Zustand stores follow this pattern:
1. Define state interface with data, loading, and error properties
2. Implement actions that call API services
3. Use adapters to transform API responses before storing
4. Components subscribe to specific store slices

## Testing and Code Quality

- ESLint configured with React and TypeScript rules
- No test framework currently configured
- Code style enforced through ESLint configuration