# 🎥 CodeSync - Technical Interview Platform

**CodeSync** is a professional-grade, real-time video conferencing and technical interview platform. It simplifies the interview process with high-quality video, secure authentication, and instant data synchronization.

---

## 🚀 Features

- 🔐 **Secure Authentication:** Integrated with **Clerk** for robust user management and protected routes  
- 📹 **4K Video Calls:** High-quality, low-latency video infrastructure powered by **GetStream**  
- ⚡ **Real-time Backend:** Leveraging **Convex** for seamless database queries and real-time state updates  
- 🔄 **Webhooks:** Automated user syncing between Clerk and Convex to ensure data integrity  
- 🎨 **Modern UI/UX:** Built with **Next.js 15**, **Tailwind CSS**, and **Shadcn UI** for a responsive, sleek experience  

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)  
- **Database:** Convex  
- **Auth:** Clerk  
- **Video/Audio:** GetStream  
- **Styling:** Tailwind CSS & Shadcn UI  

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone [https://github.com/md-alihaider/codesync-interview-platform.git](https://github.com/md-alihaider/codesync-interview-platform.git)
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Stream
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
```

---

### 4. Run the Development Server

Run frontend and backend simultaneously in two terminals:

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
npx convex dev
```

---

## 🌐 Open in Browser

👉 http://localhost:3000