// src/scripts/db.js
import { db } from "./firebase-config.js";

export async function loadDashboardStats() {
  const snap = await db.collection("customers").get();
  let total = 0, active = 0, expiring = 0, revenue = 0;
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7*24*60*60*1000);

  snap.forEach(doc => {
    const d = doc.data();
    total++;
    const pay = d.payment || 0;
    const expDate = d.expired.toDate();
    if (expDate > today && pay > 0) active++;
    if (expDate >= today && expDate <= nextWeek) expiring++;
    if (pay > 0) revenue += pay;
  });

  renderStats({ total, active, expiring, revenue });
}

export async function addCustomer(data) {
  const now = new Date();
  const { reminderDate, expiryDate } = calculateDates(data.plan, now);
  await db.collection("customers").add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    name: data.name,
    email: data.email.toLowerCase(),
    phone: data.phone,
    team: data.team,
    plan: data.plan,
    payment: data.payment,
    joined: firebase.firestore.Timestamp.fromDate(now),
    reminder: firebase.firestore.Timestamp.fromDate(reminderDate),
    expired: firebase.firestore.Timestamp.fromDate(expiryDate)
  });
}

export async function renewSubscription(id, plan, payment) {
  const now = new Date();
  const { reminderDate, expiryDate } = calculateDates(plan, now);
  await db.collection("customers").doc(id).update({
    plan,
    payment,
    joined: firebase.firestore.Timestamp.fromDate(now),
    reminder: firebase.firestore.Timestamp.fromDate(reminderDate),
    expired: firebase.firestore.Timestamp.fromDate(expiryDate)
  });
}

export async function searchCustomers(query) {
  const snap = await db.collection("customers").get();
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(c => (
      `${c.name} ${c.email} ${c.phone} ${c.team} ${c.plan}`
      .toLowerCase().includes(query.toLowerCase())
    ));
}

export async function getExpiring() {
  const snap = await db.collection("customers").get();
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7*24*60*60*1000);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(c => {
      const exp = c.expired.toDate();
      return exp >= today && exp <= nextWeek;
    });
}

// Utility
export function calculateDates(plan, start=new Date()) {
  const expiry = new Date(start), reminder = new Date(start);
  if (plan==="monthly") expiry.setMonth(expiry.getMonth()+1);
  if (plan==="quarterly") expiry.setMonth(expiry.getMonth()+3);
  if (plan==="annual") expiry.setFullYear(expiry.getFullYear()+1);
  reminder.setTime(expiry.getTime() - 3*24*60*60*1000);
  return { expiryDate: expiry, reminderDate: reminder };
}