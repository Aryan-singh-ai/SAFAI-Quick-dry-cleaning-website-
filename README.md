# SAFAI - Mini Laundry Order Management System

A sleek, premium, AI-assisted web application for managing dry cleaning orders, built as an assignment over a 72-hour period.

## 🚀 Setup Instructions

This project uses a split-stack architecture (Express.js backend, Vite + React frontend). Both need to be running to operate the system.

### Prerequisites
- Node.js (v18+)

### 1. Start the Backend API
```bash
cd server
npm install
node index.js
```
The backend will run on `http://localhost:3001`.

### 2. Start the Frontend
```bash
cd laundry-ui
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`. Open this in your browser.

---

## ✨ Features Implemented

### Core Features
- **Create Order**: Dynamic form to capture customer name, phone number, and multiple garments. Calculates total bill automatically based on configurable prices (e.g., Shirt: $5, Saree: $15). Generates a unique `ORD-XXXXXX` ID.
- **Order Status Management**: Each order progresses through `RECEIVED` -> `PROCESSING` -> `READY` -> `DELIVERED`.
- **View Orders**: A comprehensive list of all orders. Includes powerful filtering by Status and fuzzy searching by Customer Name, Phone, or Order ID.
- **Basic Dashboard**: Aggregates business metrics in real-time, showing Total Orders, Total Revenue, Orders per Status, and a feed of recent orders.

### Bonus Tasks Completed 🌟
- **Added Simple Frontend**: Built a full React SPA using Vite and Tailwind CSS.
- **Premium UI**: Implemented a dark-mode glassmorphic design utilizing `framer-motion` for buttery smooth micro-animations.
- **Estimated Delivery Date**: Automatically calculates an ETA of +3 days from order creation.

---

## 🤖 AI Usage Report

*As requested by the assignment brief, this project was built heavily leveraging AI tools.*

### Tools Used
- **Google Gemini / DeepMind AI Assistant**: Primary driver for code scaffolding, logic generation, and UI component construction.

### Sample Prompts Used
1. *"Generate an Express backend script with an in-memory array to store laundry orders. I need POST /api/orders that takes an array of garments, calculates the total price, and assigns a unique ID."*
2. *"Build a React Dashboard component using Framer Motion and Lucide-React icons that fetches data from an API and displays 4 statistic cards (Total Revenue, Total Orders, etc.) with a glassmorphic dark theme."*
3. *"Write a React form for creating a new order. It needs dynamic fields where I can add or remove multiple garments, and it should calculate the real-time total price."*

### Where AI Helped Emensely
- **Scaffolding**: AI completely eliminated the boilerplate setup time for Express endpoints and React Router configurations.
- **UI & Animations**: Providing a prompt for "glassmorphic dark theme with framer-motion" resulted in a high-quality, premium aesthetic instantly without needing to manually tune Tailwind variables for hours.
- **Data Calculations**: AI handled the `reduce` functions for dashboard metrics and cart totals effortlessly.

### What AI Got Wrong & How I Fixed It
1. **Tailwind v4 Setup**: The AI initially attempted to write a `tailwind.config.js` file and standard Tailwind directives. However, Vite with Tailwind v4 uses a new `@tailwindcss/vite` plugin and handles configurations within CSS via `@theme` directives. I had to intervene and instruct the AI to rewrite `index.css` to comply with Tailwind v4's new format.
2. **ESM/CommonJS Conflicts**: The AI initially suggested using `nanoid` (v5) for generating Order IDs in the backend. Since `nanoid` is ESM-only and the backend was scaffolded as CommonJS, it caused an import error. I fixed this by replacing it with Node's native `crypto.randomBytes(3).toString('hex')`.

---

## ⚖️ Tradeoffs

### What I Skipped
- **Persistent Database**: I opted for an in-memory Javascript array instead of MongoDB/PostgreSQL. **Why?** For a "mini" system evaluated within 72 hours, adding DB connection strings and docker containers adds friction for the evaluator. An in-memory store allows anyone to run `node index.js` instantly.
- **Authentication**: Skipped basic auth to keep the demo frictionless.

### What I'd Improve with More Time
- **Data Persistence**: Connect to SQLite or MongoDB.
- **Receipt Generation**: Generate a PDF receipt for the customer upon order creation.
- **Customer Notifications**: Send SMS updates via Twilio when an order status changes to `READY`.

---

## 📡 API Demo / Endpoints

If you prefer testing without the UI, you can hit the backend directly via Postman/cURL at `http://localhost:3001`:

- **`GET /api/dashboard`**: Returns summary metrics.
- **`GET /api/orders`**: Returns all orders. (Params: `?status=READY`, `?search=John`)
- **`POST /api/orders`**: Create an order.
  ```json
  {
    "customerName": "John Doe",
    "phoneNumber": "555-1234",
    "garments": [
      { "type": "Shirt", "quantity": 2 },
      { "type": "Suit", "quantity": 1 }
    ]
  }
  ```
- **`PATCH /api/orders/:id/status`**: Update status.
  ```json
  { "status": "READY" }
  ```
