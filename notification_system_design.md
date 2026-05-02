
# Notification System Design

## Overview

This project is a campus notification platform designed to help students stay updated with important college announcements in real time. Students can easily receive updates related to placements, events, and exam results through a clean and responsive interface.

The system focuses on providing a smooth user experience with fast loading, simple navigation, and organized notification management.

---

## System Architecture

### Frontend (Next.js)

The frontend is built using **Next.js 16** with **TypeScript** to ensure better scalability and maintainable code structure.  

For the user interface, **Material UI** is used to create a modern and responsive design.

State handling is managed using React hooks such as:

- `useState`

- `useEffect`

The frontend application runs locally on: `localhost:3000`

---

### API Layer

The application uses **Next.js API Routes** as a middleware layer between the frontend and the AffordMed server.

This approach helps avoid CORS issues and keeps external API communication secure and centralized.

#### API Endpoints

- `/api/notifications` → Fetches notification data from AffordMed server

- `/api/logs` → Sends application logs to AffordMed logging service

---

### Logging Middleware

A reusable logging utility is implemented across the application:

```ts

Log(stack, level, package, message)

```

- Replaces all console.log calls

- Posts logs to AffordMed evaluation-service/logs API

- Used in every API call, page load, and error handler

---

## Pages

### Home Page (/)

- Displays all notifications with pagination (10 per page)

- Filter tabs: All, Result, Placement, Event

- Blue border = New notification, Grey = Viewed

- NEW badge on unread notifications

- Click card to mark as viewed

### Priority Page (/priority)

- Shows top N notifications (1-10, configurable via slider)

- Ranked list with #1, #2... badges

- PRIORITY badge on each card

---

## Data Flow

---

## Notification Types

| Type | Description |

|------|-------------|

| Event | Campus events like tech-fest, farewell |

| Result | Academic results like mid-sem, end-sem |

| Placement | Company hiring notifications |

---

## Key Design Decisions

1. **API Proxy** - Prevents CORS errors by routing through Next.js server

2. **Client-side filtering** - Fast UX without extra API calls

3. **Viewed state** - Tracked in React state using Set of IDs

4. **Pagination** - limit=10 per page as per API constraint

5. **Environment variables** - Token stored in .env.local for security

