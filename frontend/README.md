# URL Shortener Frontend

This is the frontend application for the Full-Stack URL Shortener.  
It provides a clean and responsive user interface that allows users to authenticate, create shortened URLs, and manage their links from a centralized dashboard.

## Tech Stack
- Framework: Next.js 16+ (App Router)
- Styling: Tailwind CSS and Daisy UI
- Icons: React Icons
- API Client: Axios

## Used Packages
- react toastify

## Key Features
- User Authentication: Secure Login and Signup flows.
- Dashboard: View all your links, their click counts, and creation dates.
- URL Shortening: Quick input for generating short links.
- Copy to Clipboard: One-click copying for shortened URLs.

## Structure
- /app: Pages and Layouts (App Router).
- /components: Reusable UI components (Buttons, Inputs, Cards).
- /hooks: Custom React hooks for API interaction.
- /utils: Helper functions.

## Setup
1. Run npm install.
2. Ensure the Backend API is running.
3. Start the development server: npm run dev.
4. Access at http://localhost:3000.

## Design Decisions
- Component-Based Architecture: Kept UI elements modular for easy testing.
- Client-Side Validation: Added URL regex checks to prevent invalid submissions before hitting the API.
- Responsive Design: Used Tailwind's utility-first approach to ensure the dashboard works on mobile and desktop.