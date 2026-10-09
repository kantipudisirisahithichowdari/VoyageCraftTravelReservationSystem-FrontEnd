# VoyageCraft – Multi-Destination Travel Package & Reservation Platform (Frontend)

A modern, professional **React.js + Vite** frontend for the **VoyageCraft** microservices platform, featuring a rich **Navy Blue, Sky Blue, White, and Teal** travel design system and role-based portals for **Admin**, **Traveler**, and **Package Provider**.

---

## 🎨 Design System & Color Palette

* **Midnight Navy & Royal Navy (`#0f172a`, `#1e3a8a`)**: High-contrast headers, hero banners, and dark buttons.
* **Sky Blue (`#0284c7`, `#38bdf8`)**: Primary brand actions, links, pricing highlights, and active tabs.
* **Oceanic Teal (`#0d9488`, `#14b8a6`)**: Provider actions, destination badges, and positive metrics.
* **White & Soft Slate (`#ffffff`, `#f8fafc`)**: Clean surfaces, modern cards with subtle shadows.
* **Typography**: Clean, readable sans-serif (*Plus Jakarta Sans*) with responsive spacing across desktop, tablet, and mobile.

---

## 👥 3 User Roles & Capabilities

### 1. 🛡️ Admin (`ADMIN`)
* **Dashboard (`/admin/dashboard`)**: Platform overview showing Registered Users count, Total Packages, Total Bookings, and Gross Platform Revenue.
* **Manage Users (`/admin/manage-users`)**: Comprehensive table of all registered users and assigned roles.
* **Manage Packages (`/admin/manage-packages`)**: Moderate, inspect, and remove tour packages across all providers.
* **Manage Bookings (`/admin/manage-bookings`)**: Audit global customer reservations and payment records.

### 2. 🏨 Package Provider (`PROVIDER`)
* **Dashboard (`/provider/dashboard`)**: KPI cards for Total Packages, Active Listings, and Open Seats with recent listings table.
* **My Packages (`/provider/my-packages`)**: Manage, view, edit, or delete provider-owned packages.
* **Add Package (`/provider/add-package`)**: Create new packages with **dynamic multi-destination itinerary builders** (City & Country rows), departure seats, duration, cover image, and pricing.
* **Edit Package (`/provider/edit-package/:id`)**: Update itinerary, pricing, and seat allocation.

### 3. ✈️ Traveler (`TRAVELER`)
* **Dashboard (`/traveler/dashboard`)**: Welcome hero, booking statistics (Confirmed vs Pending), recent bookings summary, and curated packages.
* **Explore Packages (`/packages`)**: Live search bar filtering by destination or tour name.
* **Package Details (`/packages/:id`)**: Multi-destination route breakdown, itinerary inclusions, and availability.
* **Booking & Automatic Price (`/booking/:id`)**: Live traveler count counter with automatic price recalculation (`Travelers × Price`).
* **Demo Payment (`/payment/:bookingId`)**: Connects to Spring Boot Payment Service with status feedback.
* **Booking Confirmation (`/booking-confirmation/:bookingId`)**: Ticket receipt summary.
* **My Bookings (`/my-bookings`)**: Track personal reservations with status badges (`Confirmed`, `Pending Payment`).

---

## 📁 Project Structure

```
PROJECT-frontend/
├── index.html
├── package.json
├── vite.config.js
├── .env                              # Base URL: http://localhost:8080
└── src/
    ├── main.jsx                      # App root with BrowserRouter & AuthProvider
    ├── App.jsx                       # Route table with ProtectedRoute authorization
    ├── components/
    │   ├── Navbar.jsx                # Dynamic navigation tailored to current role
    │   ├── ProtectedRoute.jsx        # Role-based route guard
    │   └── PackageCard.jsx           # Multi-destination tour card
    ├── pages/
    │   ├── Home.jsx                  # Hero banner & featured tours
    │   ├── Login.jsx                 # Single login for all roles + automatic role redirect
    │   ├── Register.jsx              # Sign-up with role selection dropdown
    │   ├── Profile.jsx               # User profile & role permissions breakdown
    │   ├── AccessDenied.jsx          # Unauthorized access notification
    │   ├── Packages.jsx              # Tour catalog with search
    │   ├── PackageDetails.jsx        # Multi-destination itinerary view
    │   ├── Booking.jsx               # Traveler reservation form
    │   ├── Payment.jsx               # Payment Service integration
    │   ├── BookingConfirmation.jsx   # Ticket summary receipt
    │   ├── MyBookings.jsx            # Traveler reservations list
    │   ├── TravelerDashboard.jsx     # Traveler portal
    │   ├── ProviderDashboard.jsx     # Provider portal
    │   ├── MyPackages.jsx            # Provider package management
    │   ├── AddPackage.jsx            # Multi-destination package creation form
    │   ├── EditPackage.jsx           # Package editing form
    │   ├── AdminDashboard.jsx        # Admin command center
    │   ├── ManageUsers.jsx           # Admin user management
    │   ├── ManagePackages.jsx        # Admin package moderation
    │   └── ManageBookings.jsx        # Admin platform bookings ledger
    ├── services/
    │   ├── api.js                    # Axios instance with JWT Authorization Bearer interceptor
    │   ├── authService.js            # Auth API, JWT decoder, role normalizer
    │   ├── packageService.js         # Package CRUD with offline sample fallback
    │   ├── bookingService.js         # Booking microservice calls
    │   └── paymentService.js         # Payment microservice calls
    ├── context/
    │   └── AuthContext.jsx           # Global user, JWT token, and role state
    └── styles/
        └── main.css                  # Unified design system & responsive styling
```

---

## 🚀 How to Run the Frontend

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. Open your browser:
   👉 **`http://localhost:5173`**

---

## 🔑 Demo Role Logins (For Testing / Presentations)

You can log in or register with any of the following demo roles:

| Role | Demo Email | Target Dashboard |
| :--- | :--- | :--- |
| **Admin** | `admin@voyagecraft.com` | `/admin/dashboard` |
| **Package Provider** | `provider@voyagecraft.com` | `/provider/dashboard` |
| **Traveler** | `traveler@voyagecraft.com` | `/traveler/dashboard` |

*(Note: Password can be any text with at least 4 characters for testing)*
