# 🌌 Zenith

> **Zenith** is a modern Full-Stack project management application built with cutting-edge technologies, combining powerful task management, real-time collaboration, and elegant UI design.

---

## 🚀 About The Project

Zenith is designed as a scalable platform for project and task management, emphasizing modern user interface design and strong data typing. The application leverages the latest React ecosystem (version 19) and advanced server state management systems.

### ✨ Key Features

-   📋 **Project Management** - Create, organize, and manage multiple projects
-   📝 **Task Organization** - Drag-and-drop task management with categories
-   👥 **Team Collaboration** - Share projects with role-based access control (Owner/Editor/Viewer)
-   🎯 **Real-time Updates** - Optimistic UI updates with automatic rollback on errors
-   🔐 **Role-Based Access** - Granular permissions system (Owner, Editor, Viewer)
-   🎨 **Modern UI** - Beautiful, responsive interface with Material Design
-   🔄 **Drag & Drop** - Intuitive task and category reordering
-   📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

### 🎨 Frontend

**Core Technologies:**

-   [React 19](https://react.dev/) - Latest version with enhanced performance
-   [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
-   [Material UI v7](https://mui.com/) - Modern component library
-   [Emotion](https://emotion.sh/) - CSS-in-JS styling

**State Management & Data Fetching:**

-   [TanStack Query v5](https://tanstack.com/query/latest) - Powerful async state management
-   [Axios](https://axios-http.com/) - HTTP client with interceptors
-   Optimistic updates with automatic rollback

**Form Management:**

-   [React Hook Form](https://react-hook-form.com/) - Performant form library
-   [Zod](https://zod.dev/) - TypeScript-first schema validation
-   [@hookform/resolvers](https://github.com/react-hook-form/resolvers) - Validation integration

**Routing & Navigation:**

-   [React Router v7](https://reactrouter.com/) - Declarative routing

**UI/UX Libraries:**

-   [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) - Drag and drop functionality
-   [Notistack](https://notistack.com/) - Toast notification system
-   Custom Glass morphism components

**Development Tools:**

-   [ESLint](https://eslint.org/) - Code linting
-   [Prettier](https://prettier.io/) - Code formatting
-   React Testing Library - Component testing

### ⚙️ Backend

**⚠️ Note:** Backend is currently being migrated from C# to NestJS.

**Target Technologies:**

-   [NestJS](https://nestjs.com/) - Progressive Node.js framework
-   [Prisma](https://www.prisma.io/) - Next-generation ORM
-   [PostgreSQL](https://www.postgresql.org/) - Relational database
-   [TypeScript](https://www.typescriptlang.org/) - Type-safe backend
-   Docker - Containerization

**Status:** 🚧 Under Development

---

## 📂 Project Structure

```text
zenith/
├── frontend/                    # React 19 Frontend Application
│   ├── public/                  # Static assets
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── api/                 # API configuration (Axios instance)
│   │   ├── components/          # Shared components
│   │   │   ├── layouts/         # Layout components (MainLayout)
│   │   │   ├── ui/              # Reusable UI components (GlassButton, Scrollbar)
│   │   │   ├── AppHeader.tsx
│   │   │   ├── EditBox.tsx      # Inline editing component
│   │   │   ├── RoleChip.tsx
│   │   │   └── SideMenu.tsx
│   │   ├── features/            # Feature-based modules
│   │   │   ├── auth/            # Authentication
│   │   │   │   ├── api/         # Auth API calls
│   │   │   │   ├── components/  # Login, Register forms
│   │   │   │   ├── hooks/       # useAuth, useLogin, useRegister
│   │   │   │   └── types/       # Auth schemas (Zod)
│   │   │   ├── projects/        # Project management
│   │   │   │   ├── api/         # Project API
│   │   │   │   ├── components/  # ProjectCard, ProjectDetails, ProjectMembersDialog
│   │   │   │   ├── hooks/       # useProjects, useProjectDetails, useDeleteProject
│   │   │   │   └── types/       # Project schemas
│   │   │   ├── categories/      # Category management
│   │   │   │   ├── api/         # Category API
│   │   │   │   ├── components/  # CategoryView, CategoriesView, CreateCategoryDialog
│   │   │   │   ├── hooks/       # useCategories, useReorderCategory, useDeleteCategory
│   │   │   │   └── types/       # Category schemas
│   │   │   ├── tasks/           # Task management
│   │   │   │   ├── api/         # Task API
│   │   │   │   ├── components/  # TaskView, TasksView, CreateTaskDialog, UpdateTaskDialog
│   │   │   │   ├── hooks/       # useTasks, useMoveTask, useUpdateTask, useDeleteTask
│   │   │   │   └── types/       # Task schemas
│   │   │   └── users/           # User management
│   │   │       ├── api/         # User API
│   │   │       ├── components/  # UserProfile, SearchUserDialog
│   │   │       ├── hooks/       # useUserProfile, useSearchUsers
│   │   │       └── types/       # User schemas
│   │   ├── hooks/               # Global custom hooks
│   │   │   ├── useDebounce.ts
│   │   │   └── useRoleColor.ts
│   │   ├── routes/              # Route configuration
│   │   ├── theme/               # MUI theme configuration
│   │   ├── types/               # Global TypeScript types
│   │   │   └── projectRoles.tsx # Role enums (Owner, Editor, Viewer)
│   │   ├── App.tsx              # Root component
│   │   ├── index.tsx            # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # Dependencies
│   └── tsconfig.json            # TypeScript config
├── backend/                     # NestJS Backend (Under Development)
│   ├── src/
│   │   └── (TBD - Prisma + NestJS modules)
│   └── package.json
├── docker-compose.yml           # Docker configuration
└── README.md                    # Project documentation
```

---

## 🎯 Core Features Breakdown

### Project Management

-   Create and organize multiple projects
-   Project dashboard with statistics
-   Real-time project updates
-   Project search functionality

### Task Management

-   Create, update, and delete tasks
-   Organize tasks in categories
-   Drag-and-drop task reordering
-   Move tasks between categories
-   Mark tasks as complete/incomplete
-   Task descriptions and metadata

### Drag & Drop System

-   Intuitive drag-and-drop interface
-   Smooth animations with instant feedback
-   Optimistic UI updates
-   Works across categories
-   Category reordering support

### Collaboration Features

-   Invite users to projects
-   Role-based permissions:
    -   **Owner**: Full control (delete project, manage members, edit everything)
    -   **Editor**: Edit content (create/edit/delete tasks and categories)
    -   **Viewer**: Read-only access
-   View project members
-   Remove members from projects
-   User search functionality

### User Experience

-   Glass morphism design
-   Responsive layout (mobile, tablet, desktop)
-   Toast notifications for all actions
-   Loading states and error handling
-   Optimistic updates with rollback
-   Empty states with helpful messages

---

## 🗄️ Database Schema

### Current Schema (C# Backend)

_Database schema diagram will be added here_

### Future Schema (Prisma + PostgreSQL)

_Prisma schema diagram will be added here_

---

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   Docker (optional, for containerized setup)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jakubkoldarz/zenith.git
cd zenith
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## 📸 Screenshots

### Dashboard

### Project Details

### Task Management

### Drag & Drop

---

## 📝 License

This project is part of a university assignment.

---

## 👨‍💻 Author

**Jakub Kołdarz**

-   GitHub: [@jakubkoldarz](https://github.com/jakubkoldarz)

---

## 🙏 Acknowledgments

-   Material UI team for the amazing component library
-   TanStack for the powerful Query library
-   React team for React 19
