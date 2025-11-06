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
// 3. One-Time Theme Tip Pop-Up
// ----------------------------
function showTip() {
  // Only show if:
  // - not in dark mode
  // - user hasn't seen it before
  if (!body.classList.contains("dark-mode") && !localStorage.getItem(TIP_KEY)) {
    if (tip) {
      tip.classList.add("show");
      setTimeout(hideTip, 10000); // Auto-hide after 10s
    }
  }
}

function hideTip() {
  if (tip) tip.classList.remove("show");
  localStorage.setItem(TIP_KEY, "1");
}

// Dismiss on "Got it" button click
if (tip) {
  tip.addEventListener("click", (e) => {
    if (e.target.classList.contains("tip-close")) {
      hideTip();
    }
  });
}

// Show after page load (slight delay for smoothness)
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(showTip, 600);
});


// ===== Flip + Carousel controls =====

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.flip-toggle');
  if (!btn) return;

  const article = btn.closest('.project-chip');
  if (!article) return;

  const inner = article.querySelector('.chip-inner');
  const front = article.querySelector('.face-front');
  const back  = article.querySelector('.face-back');
  const frontBtn = front.querySelector('.flip-toggle');
  const backBtn  = back.querySelector('.flip-toggle');

  const nowFlipped = !article.classList.contains('is-flipped');
  article.classList.toggle('is-flipped', nowFlipped);

  // Update a11y state and visibility
  front.setAttribute('aria-hidden', nowFlipped ? 'true' : 'false');
  back.setAttribute('aria-hidden',  nowFlipped ? 'false' : 'true');
  if (nowFlipped) {
    front.setAttribute('hidden', '');
    back.removeAttribute('hidden');
  } else {
    back.setAttribute('hidden', '');
    front.removeAttribute('hidden');
  }

  if (frontBtn) frontBtn.setAttribute('aria-expanded', nowFlipped ? 'true' : 'false');
  if (backBtn)  backBtn.setAttribute('aria-expanded', nowFlipped ? 'false' : 'true');
});

// ===== Scroll =====

(function initAllScrollers(){
  const wraps = document.querySelectorAll('.project-scroller-wrap');
  if (!wraps.length) return;

  wraps.forEach(wrap => initScroller(wrap));

  function initScroller(wrap){
    const scroller = wrap.querySelector('.project-scroller');
    const prevBtn  = wrap.querySelector('.scroller-arrow.prev');
    const nextBtn  = wrap.querySelector('.scroller-arrow.next');
    if (!scroller || !prevBtn || !nextBtn) return;

    function stepSize(){
      // measure one card + the CSS gap
      const card = scroller.querySelector('.project-chip');
      if (!card) return 300;
      const cardW = card.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(scroller).columnGap || 0);
      return cardW + gap;
    }

    function updateArrows(){
      const max = scroller.scrollWidth - scroller.clientWidth - 1;
      prevBtn.disabled = scroller.scrollLeft <= 0;
      nextBtn.disabled = scroller.scrollLeft >= max;
      // (optional) show/hide instead of disable:
      // prevBtn.style.opacity = prevBtn.disabled ? .35 : 1;
      // nextBtn.style.opacity = nextBtn.disabled ? .35 : 1;
    }

    function scrollByStep(dir){
      scroller.scrollBy({ left: dir * stepSize(), behavior: 'smooth' });
      setTimeout(updateArrows, 350);
    }

    prevBtn.addEventListener('click', () => scrollByStep(-1));
    nextBtn.addEventListener('click', () => scrollByStep(1));
    scroller.addEventListener('scroll', updateArrows, { passive: true });
    scroller.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft'){ e.preventDefault(); scrollByStep(-1); }
      if (e.key === 'ArrowRight'){ e.preventDefault(); scrollByStep(1); }
    });
    window.addEventListener('resize', () => setTimeout(updateArrows, 50));

    updateArrows(); // initial state
  }
})();