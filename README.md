# 💰 SpendSmart — Personal Expense Tracker

A full-stack personal finance tracker built with React, Firebase, and Tailwind CSS. Track your income and expenses in real time, visualize spending patterns, and manage your finances with a clean modern UI.

🔗 **Live Demo:** [spend-smart-sandy.vercel.app](https://spend-smart-sandy.vercel.app)

---

## ✨ Features

- 🔐 **Authentication** — Email/Password + Google Sign-In via Firebase Auth
- 🔒 **Protected Routes** — Dashboard only accessible when logged in
- 💰 **Balance Overview** — Real-time total balance, income vs expenses
- 📊 **6-Month Bar Chart** — Visual spending overview using Recharts
- 🥧 **Category Pie Chart** — Breakdown of expenses by category
- 📋 **Transaction Management** — Add, edit, delete transactions instantly
- 🔍 **Search & Filter** — Filter by All / Income / Expense + keyword search
- 📱 **Fully Responsive** — Works perfectly on mobile and desktop
- 🔔 **Toast Notifications** — Real-time feedback on every action
- 👤 **Per-User Data** — Each user sees only their own private transactions

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React + Vite | Frontend framework |
| Tailwind CSS | Styling |
| Firebase Auth | Authentication |
| Firebase Firestore | Real-time database |
| Recharts | Data visualization |
| Lucide React | UI icons |
| React Icons | Brand icons (Google) |
| React Router DOM | Client-side routing |
| Vercel | Deployment |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── SpendingChart.jsx
│   │   └── CategoryChart.jsx
│   ├── dashboard/
│   │   ├── BalanceCard.jsx
│   │   └── StatsRow.jsx
│   ├── transactions/
│   │   ├── AddTransaction.jsx
│   │   ├── EditTransaction.jsx
│   │   ├── TransactionList.jsx
│   │   └── TransactionItem.jsx
│   └── ui/
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       ├── Toast.jsx
│       └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── firebase/
│   └── firebase.js
├── hooks/
│   ├── useTransactions.js
│   └── useToast.js
└── pages/
    ├── LoginPage.jsx
    ├── DashboardPage.jsx
    └── NotFound.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Firebase project with Firestore + Authentication enabled

### Installation

```bash
# Clone the repo
git clone https://github.com/Hassanjaved17/spendsmart.git
cd spendsmart

# Install dependencies
npm install

# Create .env file and add your Firebase config values
# Start dev server
npm run dev
```

### Environment Variables

Create a `.env` file in the root:

```
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
```

### Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/transactions/{transactionId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

---

## 🗺️ Roadmap

- [ ] Monthly filter for transactions
- [ ] Export transactions to CSV
- [ ] Budget limits per category
- [ ] Dark / Light theme toggle

---

## 👨‍💻 Author

**Hassan Javed**
- GitHub: [@Hassanjaved17](https://github.com/Hassanjaved17)
- LinkedIn: [Hassan Javed](https://linkedin.com/in/hassan-javed-964928289)

---

## 📄 License

© 2026 Hassan Javed — All Rights Reserved
