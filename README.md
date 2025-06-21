# 🧩 React Frontend Architecture – Zustand + Axios + DTO + Adapter Pattern

This project follows a clean and scalable architecture for frontend applications using **React**, **Zustand** for state management, **Axios** for API calls, and a clear separation between **DTOs**, **Models**, and **Adapters**.

![image](https://github.com/user-attachments/assets/85bcba0f-64a3-460b-974e-58ef47a269e6)


---

## 🗂️ Layered Architecture

### 1. 📡 API - Backend
- Exposes RESTful endpoints
- Consumes and returns **DTO-formatted JSON**

---

### 2. 🧠 Frontend Application - React

#### 📘 Service Layer
- Uses **Axios** to perform HTTP requests
- Handles `request` and `response` transformation via **DTOs**
- Implements **adapter functions** to map raw data to frontend-friendly models

## 🧱 State Layer (Zustand)

Centralized state store via **Zustand**

**Manages:**
- Loading states  
- Data collections (e.g., attendance list)  
- Business logic (e.g., filter by student)  
- Triggers API calls and updates normalized state

---

## 🎨 Presentation Layer

Pure **UI components**

**Responsibilities:**
- Subscribes to Zustand state  
- Dispatches actions (e.g., `fetchAttendances()`)  
- Displays user-facing data using **model types** (not DTOs)

```ts
AttendanceDTO → mapToStudentAttendance() → StudentAttendance
[ UI Component ]
      ⬇
[ Zustand Action ]
      ⬇
[ API Service with Adapter ]
      ⬇
[ Axios Request → Backend API ]
      ⬆
[ DTO Response ]
      ⬇
[ Adapter → Normalized Model ]
      ⬇
[ Zustand State Update ]
      ⬇
[ UI Re-renders ]
