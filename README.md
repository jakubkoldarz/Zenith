# 🌌 Zenith

> **Zenith** to aplikacja webowa typu Full-Stack, łącząca **NestJS** wraz z **React 19**.

---

## 🚀 O Projekcie

Zenith został zaprojektowany jako skalowalna platforma, kładąca nacisk na nowoczesny interfejs użytkownika i silne typowanie danych. Aplikacja wykorzystuje najnowszy ekosystem Reacta (wersja 19) oraz zaawansowany system zarządzania stanem serwerowym.

### Kluczowe Funkcjonalności

* **Frontend:** Zbudowany na **React 19** z wykorzystaniem **Material UI 7**.
* **Wydajny Backend:** Architektura modułowa oparta na **NestJS**.
* **Inteligentny Data Fetching:** Caching, synchronizacja i aktualizacja stanu serwera dzięki **TanStack Query v5**.
* **Zaawansowane Formularze:** Walidacja schematów przy użyciu **Zod** zintegrowana z **React Hook Form**.
* **Routing Next-Gen:** Obsługa nawigacji przy użyciu **React Router v7**.
* **System Powiadomień:** Zintegrowane toasty (Notistack) dla lepszego UX.

---

## 🛠️ Technologie

### 🎨 Frontend (Client)

Aplikacja kliencka opiera się na **Create React App** i wykorzystuje najnowsze biblioteki:

* **Core:** [React 19](https://react.dev/), TypeScript
* **UI Framework:** [Material UI (MUI) v7](https://mui.com/) + Emotion
* **State & Data:** [TanStack Query v5](https://tanstack.com/query/latest) + Axios
* **Routing:** [React Router v7](https://reactrouter.com/)
* **Forms:** React Hook Form + Zod (`@hookform/resolvers`)
* **Utils:** Notistack
* **Testing:** React Testing Library + Jest

### ⚙️ Backend (Server)

* **Framework:** [NestJS](https://nestjs.com/)
* **Język:** TypeScript
* **Baza Danych:** [PostgreSQL]
* **API:** REST API / Swagger
* **Narzędzia:** Docker
* * **ORM:** Prisma

---

## 📂 Struktura Projektu

Projekt podzielony jest na dwie główne części:

```text
zenith/
├── frontend/           # Frontend (React 19 + MUI 7)
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Backend (NestJS API)
│   ├── src/
│   └── package.json
└── README.md
