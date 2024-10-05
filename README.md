# Tender Archive & Record Management System

## Overview

This is a sophisticated tender management system designed to streamline the process of tracking, archiving, and managing tenders. Built with Next.js and TypeScript, this application provides a robust and user-friendly interface for businesses to efficiently handle their tender-related operations.

## Features

- **User Authentication**: Secure login system using NextAuth.
- **Tender Tracking**: Easily record and monitor ongoing tenders.
- **Archiving System**: Archive completed or irrelevant tenders for future reference.
- **User Configuration**: Personalized settings for each user.
- **Notifications**: Stay updated with the latest tender information.
- **RESTful API Integration**: Connects to a backend API for data management.

## Technology Stack

- **Frontend**: Next.js with TypeScript
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Database**: MongoDB (connected via MongoDB Atlas)
- **API**: Custom API (hosted on Vercel)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   AUTH_SECRET=your_auth_secret
   NEXT_PUBLIC_API_URL=your_api_url
   AUTH_TRUST_HOST=true
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Project Structure

- `src/middleware.ts`: Handles authentication middleware.
- `src/stores/user.ts`: Manages user state using Zustand.
- `@types/next-auth.d.ts`: Contains TypeScript definitions for NextAuth.

## Dummy Login Credentials

For testing purposes, you can use the following credentials in `src/components/LoginForm.tsx`:
- Username: demo
- Password: password

## License

This project is licensed under the [MIT License](LICENSE).
