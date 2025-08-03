// src/scripts/ui.js
export function renderStats({ total, active, expiring, revenue }) {
  document.getElementById("totalCustomers").textContent = total;
  document.getElementById("activeSubscriptions").textContent = active;
  document.getElementById("expiringSoon").textContent = expiring;
  document.getElementById("totalRevenue").textContent = `₹${revenue}`;
}

export function showToast(message, type="success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div>${message}</div>`;
  container.appendChild(toast);
  setTimeout(() => container.removeChild(toast), 4000);
}

export function initTabs() {
  document.querySelectorAll(".nav-item").forEach(item=>{
    item.addEventListener("click", e=>{
      e.preventDefault();
      const tab = item.getAttribute("data-tab");
      document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active"));
      document.getElementById(tab).classList.add("active");
      document.querySelectorAll(".nav-item").forEach(i=>i.classList.remove("active"));
      item.classList.add("active");
      if (tab==="dashboard") loadDashboardStats();
      if (tab==="expiring") loadExpiringList();
    });
  });
}