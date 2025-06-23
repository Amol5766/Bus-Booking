# 🚌 Bus Booking App (Angular + JSON Server)

A lightweight bus seat booking application built with Angular 18 and powered by `json-server` as a mock backend.

---

## 📸 Features

- 🔎 **Search** buses between locations  
- 🪑 **Seat selection** with visual UI  
- ✅ Real-time **booking** and seat freeze  
- 👥 **User registration & login** (localStorage based)  
- 📦 Mock REST API with `json-server`  
- 🔐 Seats remain **booked unless removed from `db.json`**

---

## 🧩 Tech Stack

| Tech        | Purpose                      |
|-------------|------------------------------|
| Angular 18  | Frontend SPA Framework       |
| Bootstrap   | UI Styling                   |
| JSON Server | Mock backend (REST API)      |
| RxJS        | Handling async flows         |

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/bus-booking-angular.git
cd bus-booking-angular
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start JSON Server

Ensure `db.json` is in the root and run:

```bash
npx json-server --watch db.json --port 3000
```

This runs the mock API on: `http://localhost:3000/`

### 4. Run Angular App

```bash
ng serve
```

Visit: `http://localhost:4200`

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── booking/            # Booking component
│   └── service/
│       └── master.service.ts   # All HTTP requests
├── assets/
├── index.html
└── db.json                     # Mock database
```

---

## 📋 Notes

- You **must register/login** to book a seat
- Seat status is updated in `db.json → bookings`
- Booked seats **stay disabled/frozen** unless manually cleared
- No actual password auth (mock only)

---

## 🧠 Learnings

- Angular Standalone Components
- NgClass + NgIf + NgFor + FormsModule
- Local storage based login
- Mock backend integration with JSON Server

---

## 🧑‍💻 Author

Built with 💻 by [Jatt](https://github.com/YOUR-GITHUB-HANDLE)

---

## 🪄 Future Enhancements

- ✅ JWT Auth Integration  
- 📱 Mobile responsive UI  
- 📊 Booking history & admin panel  
- 🔄 Backend swap from json-server to real API

---

## 🏁 License

This project is open-source and free to use.