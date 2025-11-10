console.log("🎬 Auto Reels v1.5 loaded - fixed for saved reels");

const END_THRESHOLD_SEC = 0.6;
const VISIBLE_RATIO_FOR_ACTIVE = 0.55;
const attached = new WeakSet();

function simulateNextNavigation() {
  // Try multiple selector possibilities for saved reels modal
  const selectors = [
    'button[aria-label="Next"]',
    'div[role="button"][tabindex="0"] svg[aria-label="Next"]',
    'button[tabindex="0"] svg[aria-label="Next"]',
    'svg[aria-label="Next"]',
  ];

  let clicked = false;

  for (const sel of selectors) {
    const element = document.querySelector(sel);
    if (element) {
      console.log("➡️ Auto Reels: found next button, clicking...");
      // Click either the SVG or its closest button container
      const btn = element.closest("button, div[role=button]");
      (btn || element).click();
      clicked = true;
      break;
    }
  }

  if (!clicked) {
    console.log("⚠️ Auto Reels: next button not found, trying keyboard navigation");
    // Try to send right-arrow key (Instagram listens for it in modals)
    const evt = new KeyboardEvent("keydown", { key: "ArrowRight", code: "ArrowRight", bubbles: true });
    document.dispatchEvent(evt);
  }

  // Final fallback: scroll down
  if (!clicked) {
    console.log("Auto Reels: fallback → window scroll");
    window.scrollBy(0, window.innerHeight);
  }
}

function findNextVideo(curr) {
  const all = Array.from(document.querySelectorAll("video"));
  const idx = all.indexOf(curr);
  return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
}

function gotoNextFrom(video) {
  const next = findNextVideo(video);
  if (next) {
    console.log("⏭️ Auto Reels: scrolling to next feed video");
    next.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => next.play().catch(() => {}), 700);
  } else {
    simulateNextNavigation();
  }
}

function attachActiveListeners(video) {
  if (!video || attached.has(video)) return;
  attached.add(video);

  let handledNext = false;

  function onTimeUpdate() {
    if (!video.duration || handledNext) return;
    const rem = video.duration - video.currentTime;
    if (rem <= END_THRESHOLD_SEC) {
      handledNext = true;
      setTimeout(() => gotoNextFrom(video), 100);
    }
  }

  function onPlay() {
    handledNext = false;
  }

  video.addEventListener("timeupdate", onTimeUpdate);
  video.addEventListener("seeked", onTimeUpdate);
  video.addEventListener("play", onPlay);
  video.addEventListener("pause", () => {
    if (video.duration && video.duration - video.currentTime <= 0.7 && !handledNext) {
      handledNext = true;
      setTimeout(() => gotoNextFrom(video), 200);
    }
  });

  const mo = new MutationObserver(() => {
    if (!document.contains(video)) {
      video.removeEventListener("timeupdate", onTimeUpdate);
      mo.disconnect();
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
}

function buildThresholdList() {
  const t = [];
  for (let i = 0; i <= 100; i++) t.push(i / 100);
  return t;
}

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio >= VISIBLE_RATIO_FOR_ACTIVE) {
      attachActiveListeners(entry.target);
    }
  });
}, { threshold: buildThresholdList() });

function scanVideosAndObserve() {
  const vids = document.querySelectorAll("video");
  vids.forEach((v) => {
    try {
      activeObserver.observe(v);
      if (!v.paused) attachActiveListeners(v);
    } catch {}
  });
}

const globalMut = new MutationObserver(() => scanVideosAndObserve());
globalMut.observe(document.body, { childList: true, subtree: true });

setTimeout(scanVideosAndObserve, 700);
console.log("🚀 Auto Reels v1.5 initialized");
