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
- sweetalert2

## Key Features
- User Authentication: Secure Login and Signup flows.
- Dashboard: View all your links, their click counts, and creation dates.
- URL Shortening: Quick input for generating short links.
- Copy to Clipboard: One-click copying for shortened URLs.

## Structure
- /app: Pages and Layouts (App Router).
- /components: Reusable UI components
- /context: Context for using logged in user across the app
- /utils: Helper functions.

## Setup
1. Clone the repository and navigate to the frontend folder.
2. Install dependencies using : npm install
3. Add backend API in .env file
4. Ensure the Backend API is running.
5. Start the development server: npm run dev.
6. Access at http://localhost:3000