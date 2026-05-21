# DriveFleet - Car Rental Platform

A modern car rental web application built with Next.js that allows users to browse, book, and manage car rentals.

## Project Description

DriveFleet is a full-stack car rental platform where users can explore available cars, make bookings, and list their own vehicles for rent. The application features secure authentication, real-time availability tracking, and a responsive user interface.

## Features

### Authentication
- Email and password registration and login
- Google OAuth integration for quick sign-in
- JWT-based authentication with Better Auth
- Protected routes and secure session management

### Car Management
- Browse all available cars with search and filter options
- View detailed car information including specifications and pricing
- Add new cars for rent with image upload support
- Edit and delete your own car listings
- Track booking count for each vehicle

### Booking System
- Book available cars with date selection
- View all your bookings in one place
- Cancel bookings and restore car availability
- Real-time availability status updates

### User Interface
- Responsive design for mobile, tablet, and desktop
- Dark theme with modern UI components
- Smooth animations and transitions
- Featured cars section on homepage
- User profile dropdown with quick actions

## Tech Stack

### Frontend
- Next.js 16.2.6 (React 19)
- Tailwind CSS for styling
- NextUI and HeroUI component libraries
- Framer Motion for animations
- Lucide React for icons

### Backend
- Next.js API Routes
- Express.js server
- MongoDB with native driver
- Better Auth for authentication
- JWT for token management

### Authentication & Security
- Better Auth with MongoDB adapter
- JWT plugin for token generation
- Google OAuth 2.0 integration
- Secure password hashing
- Protected API endpoints with token verification

### Database
- MongoDB Atlas for cloud database
- Collections: users, cars, bookings, sessions

## Installation

### Prerequisites
- Node.js 18 or higher
- MongoDB Atlas account
- Google Cloud Console project for OAuth

### Setup

1. Clone the repository
```bash
git clone <repository-url>
cd rental-client
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your-secret-key
MONGODB_URI=your-mongodb-connection-string
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Backend Setup

The backend server requires the following environment variables:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGO_URI=your-mongodb-connection-string
```

## Deployment

The API is deployed on Vercel and can be accessed at:
```
https://drive-fleet-car-rental-client.vercel.app/ 
```



## Contact

For questions or support, contact: farhadnuri559@gmail.com
