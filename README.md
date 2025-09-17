# 🌍 GeoShield – AI Disaster Early Warning MVP

GeoShield is an **AI-powered disaster early warning system** designed to protect vulnerable communities from floods, landslides, and extreme rainfall.  
This MVP version demonstrates how **real-time data + AI predictions + interactive maps** can help authorities and citizens make faster, safer decisions.  

---

## 🚀 Features

- **Interactive Dashboard**  
  Real-time disaster alerts (floods, landslides, heavy rainfall) displayed with animated, clickable cards.  

- **India Map with Danger Zones**  
  Interactive map of India powered by **Leaflet.js** and **OpenStreetMap tiles**.  
  - Color-coded zones: 🟢 Safe, 🟠 Moderate, 🔴 High risk  
  - Click zones to see details  

- **AI Prediction Placeholder**  
  Displays 30-minute **forecast risk level** (Low / Moderate / High).  

- **Multilingual Support** 🌐  
  Supports **English**, **हिंदी (Hindi)**, and **தமிழ் (Tamil)** across the entire website with a simple language switcher.  

- **Alert System Placeholder**  
  Designed for SMS, WhatsApp, and Email notifications.  

- **Offline-First Capability** ⚡  
  Last downloaded alerts remain accessible without internet connectivity.  

- **Modern UI/UX** ✨  
  Built with **React, TailwindCSS, shadcn/ui, and Framer Motion** for a smooth, responsive experience.  

---

## 🛠️ Tech Stack

- **Frontend:** React + TailwindCSS + shadcn/ui + Framer Motion  
- **Maps:** Leaflet.js with **OpenStreetMap tiles** (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`)  
- **Charts:** Recharts (for risk trend graphs)  
- **Backend:** Node.js + Express (API placeholders for sensor & AI data)  
- **Database:** Supabase (storing user alerts, preferences, and sensor data)  

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/geoshield.git

# Navigate into the project
cd geoshield

# Install dependencies
npm install

# Start development server
npm run dev
