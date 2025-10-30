// ============================
// THEME TOGGLE + TIP POP-UP
// ============================

// Get references
const logo = document.getElementById("themeToggle");
const body = document.body;
const tip = document.getElementById("themeTip");

// Key names for localStorage
const THEME_KEY = "theme";
const TIP_KEY = "themeTipSeen";

// ----------------------------
// 1. Apply saved theme on load
// ----------------------------
if (localStorage.getItem(THEME_KEY) === "dark") {
  body.classList.add("dark-mode");
}

// ----------------------------
// 2. Toggle theme on XM click
// ----------------------------
if (logo) {
  logo.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      localStorage.setItem(THEME_KEY, "light");
    }

    // Hide the tip once the user interacts
    if (tip) {
      tip.classList.remove("show");
      localStorage.setItem(TIP_KEY, "1");
    }
  });
}

// ----------------------------
// 3. Show "🌙 Tip" only once
// ----------------------------
function showTip() {
  if (!body.classList.contains("dark-mode") && !localStorage.getItem(TIP_KEY)) {
    tip.classList.add("show");
    setTimeout(hideTip, 5000); // hide after 5s
  }
}

function hideTip() {
  if (tip) tip.classList.remove("show");
  localStorage.setItem(TIP_KEY, "1");
}

// Dismiss tip on click
if (tip) tip.addEventListener("click", hideTip);

// Show after page load (delay feels smoother)
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(showTip, 600);
});