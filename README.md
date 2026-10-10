<div align="center">

# 🛒 বাজার দর (BazarDor)

  <p><strong>A modern, high-performance real-time essential commodity price tracker built for Bangladesh.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.3+-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/BetterAuth-Authentication-512BD4?style=for-the-badge" alt="BetterAuth" />
    <img src="https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </p>
</div>

---

## 📌 Overview

**BazarDor** (**বাজার দর**) is a full-stack, responsive web application designed to bring transparency and quick insights into daily essential commodity prices across markets in Bangladesh. From staple grains and cooking oils to seasonal vegetables and proteins, BazarDor aggregates real-time market trends, price fluctuations, and multi-market breakdowns in a clean, localized user interface.

---

## ✨ Key Features

1. **Dynamic Navbar & Real-Time Price Ticker**
   - Responsive top navigation featuring the brand identity, live localized Bangla date, category quick-links with active route states, and an infinite-scrolling marquee ticker highlighting live price shifts (`▲/▼`).

2. **Actionable Market Trends (Top Risers & Fallers)**
   - Automatically surfaces daily commodity volatility, featuring dedicated sections for top price increases (`আজ দাম বেড়েছে ▲`) and drops (`আজ দাম কমেছে ▼`) with color-coded percentage badges.

3. **Comprehensive Catalog & Multi-Criteria Filtering**
   - Displays all essential grocery items across major categories (Rice, Lentils, Oil, Vegetables, Fish, Meat, Dairy, and Spices) in a responsive grid layout with emojis, unit indicators (`প্রতি কেজি`, `প্রতি ডজন`), and dynamic sorting controls.

4. **Protected Product Details & Multi-Bazar Breakdown**
   - Secures individual product pages (`/product/[slug]`) behind authentication guards. Delivers statistical summary pricing (Min, Max, and Average) alongside granular cross-market comparisons.

5. **Secure Authentication Suite via BetterAuth**
   - Implements robust authentication supporting Email/Password workflows and Social Logins (Google & GitHub) backed by **BetterAuth**, featuring instant toast notifications (`react-hot-toast`), skeleton loading states, and seamless route redirection.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js (App Router with dynamic route handling and Vercel compatibility)
- **Styling:** Tailwind CSS & DaisyUI components for rapid responsive design
- **Authentication:** BetterAuth (Email/Password, Google, GitHub integration)
- **State & UI Feedback:** React Hot Toast, custom skeleton loaders, Lucide/custom iconography
- **Deployment:** Vercel Cloud Platform

---

