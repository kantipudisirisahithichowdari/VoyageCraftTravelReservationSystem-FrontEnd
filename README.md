# VoyageCraft – Travel Reservation Platform

VoyageCraft is a modern, responsive React web application designed to simplify the discovery, booking, and management of multi-destination travel packages. It provides role-based portals for travelers, package providers, and administrators.

## Features

* **Traveler Portal:** Browse travel packages, explore itineraries, book trips, make simulated payments, and manage reservations.
* **Package Provider Portal:** Create, update, and manage travel packages, destinations, pricing, and seat availability.
* **Administrator Portal:** Manage users, oversee travel packages, monitor bookings, and view platform statistics.
* **Multi-Destination Travel:** Support itineraries covering multiple cities and countries.
* **Dynamic Booking:** Automatically calculate prices based on the number of travelers and track seat availability.
* **Payment Simulation:** Simulate checkout and generate transaction receipts.
* **Responsive Design:** Modern navy and teal theme optimized for desktop, tablet, and mobile screens.

## Technologies Used

* React 18
* JavaScript (JSX)
* Vite
* React Router 6
* HTML5
* CSS3
* Browser LocalStorage

## Project Structure

* **Components:** Reusable UI components and protected routes.
* **Pages:** Home, login, registration, packages, booking, payment, dashboards, and management pages.
* **Context:** Global authentication and user state management.
* **Services:** Authentication, package management, booking, and payment logic.
* **Styles:** Responsive layouts and application design system.

## Data Management

The frontend uses browser LocalStorage to persist user accounts, travel packages, bookings, and payment-related information. The application operates independently without requiring a backend service.

**Note:** This version is a frontend demonstration. Payments are simulated, not processed through a real payment gateway.
