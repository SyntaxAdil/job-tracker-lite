<p align="center">
  <a href="https://nextjs.org/" target="blank">
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="https://cdn.simpleicons.org/nextdotjs/white" />
      <img src="https://cdn.simpleicons.org/nextdotjs/000000" width="80" alt="Next.js Logo" />
    </picture>
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.docker.com/" target="blank"><img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" width="110" alt="Docker Logo" /></a>
</p>

<h1 align="center">Job Tracker Lite</h1>

<p align="center">
  A clean web interface to organize your job hunt: workspaces, applications, and a simple pipeline.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" alt="React Hook Form" />
  <img src="https://img.shields.io/badge/Zod_4-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

---

## Features

- **Authentication** with sign in and sign up screens, backed by [Better Auth](https://better-auth.com) on the API
- **Workspaces** to group your job search
- **Applications** tracked across fixed stages: Wishlist, Applied, Interview, Offer, Rejected
- **Type-safe forms** with React Hook Form and Zod validation
- **Smart data fetching and caching** with TanStack Query
- **Light and dark theme** support

## Tech Stack

| Layer           | Technology                                        |
| --------------- | ------------------------------------------------- |
| Framework       | Next.js 16 (App Router)                           |
| UI Library      | React 19 with the React Compiler                  |
| Language        | TypeScript                                        |
| Styling         | Tailwind CSS 4, `tw-animate-css`                  |
| Components      | shadcn/ui, Base UI                                |
| Data Fetching   | TanStack Query                                    |
| Forms           | React Hook Form, `@hookform/resolvers`            |
| Validation      | Zod 4                                             |
| Icons           | lucide-react, react-icons                         |
| Package Manager | Bun                                               |
| Container       | Docker                                            |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.4.1
- The Job Tracker Lite API running (see [Backend](#backend))

### Installation

```bash
bun install
```

### Run the app

```bash
# development
bun run dev

# production
bun run build
bun run start
```

### Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `bun run dev`   | Start the dev server                 |
| `bun run build` | Create a production build            |
| `bun run start` | Run the production build             |
| `bun run lint`  | Lint with ESLint                     |
| `bun run ui`    | Add a shadcn/ui component (`bun run ui button`) |

## Backend

This app consumes the Job Tracker Lite REST API (NestJS + MongoDB).

| Route               | Purpose                |
| ------------------- | ---------------------- |
| `/api/auth`         | Authentication         |
| `/api/workspaces`   | Workspaces             |
| `/api/applications` | Applications           |
| `/api/users`        | User profile           |

## Author

Built by [SyntaxAdil](https://github.com/SyntaxAdil).