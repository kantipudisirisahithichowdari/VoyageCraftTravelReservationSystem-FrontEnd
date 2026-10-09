# VoyageCraft – Travel Reservation Platform

A modern, responsive React web application for discovering, booking, and managing multi-destination travel packages. The application is completely self-contained and runs purely on the frontend with built-in data persistence in local storage, requiring no backend setup.

---

## Highlights

* **Standalone & Ready to Run**: Works out of the box with zero external backend dependencies. All data (users, tour packages, bookings, payments) is managed and persisted directly in your browser.
* **Role-Based Portals**: Tailored interfaces and navigation for Travelers, Tour Providers, and Administrators.
* **Multi-Destination Itineraries**: Tour packages featuring detailed routes across multiple cities and countries with included amenities and highlights.
* **Interactive Booking & Checkout**: Real-time traveler count updates, automatic price recalculation, and simulated payment confirmation.
* **Modern Navy & Teal Travel Theme**: Clean, responsive design optimized for desktops, tablets, and mobile screens.

---

## User Roles & Capabilities

### 1. Traveler
* Browse curated vacation packages with live search by title or destination.
* Inspect multi-city itineraries, duration, included perks, and available seats.
* Reserve packages with dynamic price calculation based on number of travelers.
* Complete simulated checkout with instant transaction receipts.
* View and track personal reservations in the Traveler Dashboard.

### 2. Package Provider
* Access the dedicated Provider Dashboard with listing metrics.
* Publish new travel packages with multi-destination builders (city & country rows).
* Edit existing package itineraries, pricing, and seat availability.
* Delete or retire packages from the provider inventory.

### 3. Administrator
* Access the Admin Command Center displaying total users, packages, bookings, and revenue.
* View the directory of all registered accounts and role assignments.
* Moderate and manage all packages published across providers.
* Audit the platform-wide customer reservations ledger.

---

## Demo Accounts

You can sign in instantly using any of the pre-configured accounts below, or create a brand new account using the registration page:

| Role | Email | Password | Target Portal |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@voyagecraft.com` | `admin123` | Admin Dashboard |
| **Package Provider** | `provider@voyagecraft.com` | `provider123` | Provider Dashboard |
| **Traveler** | `traveler@voyagecraft.com` | `traveler123` | Traveler Dashboard |

*(Tip: On the login page, you can also click the quick demo buttons to auto-fill these credentials).*

---

## Getting Started

### Prerequisites
Make sure you have Node.js (version 16 or newer) installed on your system.

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit the local server address shown in your terminal (typically `localhost:5173`).

### Production Build
To create an optimized production build:
```bash
npm run build
```
The output files will be generated in the `dist` folder, ready for deployment on static hosting platforms like Vercel, Netlify, or GitHub Pages.

---

## Project Structure

```
PROJECT-frontend/
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration
└── src/
    ├── main.jsx                # Application root with router and auth provider
    ├── App.jsx                 # Route table and navigation layout
    ├── components/
    │   ├── Navbar.jsx          # Dynamic navigation bar tailored to current role
    │   ├── PackageCard.jsx     # Travel package display card
    │   └── ProtectedRoute.jsx  # Role-based route guard
    ├── pages/
    │   ├── Home.jsx            # Landing page with hero banner and featured tours
    │   ├── Login.jsx           # Sign-in page with quick demo account buttons
    │   ├── Register.jsx        # Account registration with role selection
    │   ├── Profile.jsx         # User profile and account preferences
    │   ├── Packages.jsx        # Full catalog with search filtering
    │   ├── PackageDetails.jsx  # Multi-city itinerary view
    │   ├── Booking.jsx         # Reservation form with live price calculation
    │   ├── Payment.jsx         # Simulated checkout and receipt generation
    │   ├── MyBookings.jsx      # Traveler booking list
    │   ├── TravelerDashboard.jsx # Traveler welcome portal
    │   ├── ProviderDashboard.jsx # Provider management portal
    │   ├── MyPackages.jsx      # Provider package inventory
    │   ├── AddPackage.jsx      # Multi-city package creation form
    │   ├── EditPackage.jsx     # Package modification form
    │   ├── AdminDashboard.jsx  # Platform overview and metrics
    │   ├── ManageUsers.jsx     # Admin user management
    │   ├── ManagePackages.jsx  # Admin package moderation
    │   └── ManageBookings.jsx  # Admin reservation audit log
    ├── services/
    │   ├── mockData.js         # Initial dataset and localStorage data store
    │   ├── authService.js      # Authentication, user sessions, role normalization
    │   ├── packageService.js   # Package operations and inventory management
    │   ├── bookingService.js   # Reservation handling and seat allocation
    │   └── paymentService.js   # Payment simulation and receipt processing
    ├── context/
    │   └── AuthContext.jsx     # Global authentication and user state
    └── styles/
        └── main.css            # Complete design system and responsive styles
```

---

## Technologies Used

* **React 18**: UI component library
* **Vite**: Ultra-fast build tool and development server
* **React Router 6**: Client-side routing and protected routes
* **LocalStorage API**: In-browser persistent storage for data across sessions
* **Vanilla CSS**: Custom travel design system with responsive layouts
