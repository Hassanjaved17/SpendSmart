// ============================================================
//  SPENDSMART — useTransactions.js
//  Real-time Firestore listener + CRUD operations
//  Author  : Hassan Javed
//  GitHub  : https://github.com/Hassanjaved17
//  Built   : March 2026
//  © 2026 Hassan Javed — All Rights Reserved
// ============================================================

import { useState, useEffect }          from "react";
import { db }                           from "../firebase/firebase";
import { useAuth }                      from "../context/AuthContext";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const useTransactions = () => {
  const { user }                            = useAuth();
  const [transactions, setTransactions]     = useState([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState(null);

  // ── Firestore collection ref for this user ────────────────
  const getColRef = () =>
    collection(db, "users", user.uid, "transactions");

  // ── Real-time listener ────────────────────────────────────
  useEffect(() => {
    if (!user) return;

    setLoading(true);

    const q = query(getColRef(), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamp to date string
          date: doc.data().date ?? new Date().toISOString().split("T")[0],
        }));
        setTransactions(data);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setError("Failed to load transactions.");
        setLoading(false);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [user]);

  // ── Add transaction ───────────────────────────────────────
  const addTransaction = async ({ type, amount, category, note, date }) => {
    if (!user) throw new Error("Not authenticated");

    await addDoc(getColRef(), {
      type,
      amount,
      category,
      note:      note || "",
      date,
      createdAt: serverTimestamp(),
    });
  };

  // ── Delete transaction ────────────────────────────────────
  const deleteTransaction = async (transactionId) => {
    if (!user) throw new Error("Not authenticated");

    const docRef = doc(db, "users", user.uid, "transactions", transactionId);
    await deleteDoc(docRef);
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
    deleteTransaction,
  };
};

export default useTransactions;

// © 2026 Hassan Javed — All Rights Reserved