// src/scripts/main.js
import "./firebase-config.js";
import { signInAdmin, onAuthStateChanged } from "./auth.js";
import { loadDashboardStats, getExpiring } from "./db.js";
import { renderStats, showToast, initTabs } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  signInAdmin();
  onAuthStateChanged(user => {
    if (user) {
      initTabs();
      loadDashboardStats();
    } else {
      showToast("Authentication required", "error");
    }
  });
});