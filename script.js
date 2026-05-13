const root = document.documentElement;
const hero = document.querySelector("[data-blob-zone]");
const baseVideo = document.querySelector("[data-sync-base]");
const revealVideo = document.querySelector("[data-sync-reveal]");
const modeButtons = document.querySelectorAll(".mode-button[data-mode]");

const pointer = {
  targetX: window.innerWidth * 0.64,
  targetY: window.innerHeight * 0.52,
  currentX: window.innerWidth * 0.64,
  currentY: window.innerHeight * 0.52,
  active: 0,
  scale: 0.78,
  velocityX: 0,
  velocityY: 0,
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getMode = () => hero.dataset.mode || "goo";

const setEffectVariables = (mode, drift) => {
  const velocityX = clamp(pointer.velocityX * -9, -96, 96);
  const velocityY = clamp(pointer.velocityY * -9, -56, 56);

  root.style.setProperty("--trail-x", `${velocityX.toFixed(2)}px`);
  root.style.setProperty("--trail-y", `${velocityY.toFixed(2)}px`);

  if (mode === "orbit") {
    root.style.setProperty("--lobe-one-x", `${(Math.cos(drift * 1.55) * 88).toFixed(2)}px`);
    root.style.setProperty("--lobe-one-y", `${(Math.sin(drift * 1.55) * 64).toFixed(2)}px`);
    root.style.setProperty("--lobe-two-x", `${(Math.cos(drift * 1.55 + 2.1) * 78).toFixed(2)}px`);
    root.style.setProperty("--lobe-two-y", `${(Math.sin(drift * 1.55 + 2.1) * 72).toFixed(2)}px`);
    root.style.setProperty("--lobe-three-x", `${(Math.cos(drift * 1.55 + 4.2) * 82).toFixed(2)}px`);
    root.style.setProperty("--lobe-three-y", `${(Math.sin(drift * 1.55 + 4.2) * 66).toFixed(2)}px`);
    return;
  }

  if (mode === "bubbles") {
    root.style.setProperty("--lobe-one-x", `${(Math.cos(drift * 2.1) * 48 - 18).toFixed(2)}px`);
    root.style.setProperty("--lobe-one-y", `${(Math.sin(drift * 1.7) * 36 + 8).toFixed(2)}px`);
    root.style.setProperty("--lobe-two-x", `${(Math.cos(drift * 1.4 + 1.8) * 46 + 26).toFixed(2)}px`);
    root.style.setProperty("--lobe-two-y", `${(Math.sin(drift * 1.9 + 1.8) * 42 - 10).toFixed(2)}px`);
    root.style.setProperty("--lobe-three-x", `${(Math.cos(drift * 1.8 + 3.2) * 40 + 2).toFixed(2)}px`);
    root.style.setProperty("--lobe-three-y", `${(Math.sin(drift * 1.5 + 3.2) * 44 + 28).toFixed(2)}px`);
    return;
  }

  root.style.setProperty("--lobe-one-x", `${(-75 + Math.sin(drift * 1.6) * 15).toFixed(2)}px`);
  root.style.setProperty("--lobe-one-y", `${(19 + Math.cos(drift * 1.25) * 13).toFixed(2)}px`);
  root.style.setProperty("--lobe-two-x", `${(65 + Math.cos(drift * 1.35) * 16).toFixed(2)}px`);
  root.style.setProperty("--lobe-two-y", `${(-37 + Math.sin(drift * 1.8) * 15).toFixed(2)}px`);
  root.style.setProperty("--lobe-three-x", `${(34 + Math.sin(drift * 1.05) * 15).toFixed(2)}px`);
  root.style.setProperty("--lobe-three-y", `${(71 + Math.cos(drift * 1.55) * 15).toFixed(2)}px`);
};

const setBlobState = (time = 0) => {
  const drift = time * 0.001;
  const mode = getMode();

  pointer.currentX = pointer.targetX;
  pointer.currentY = pointer.targetY;
  pointer.scale = pointer.active ? 1 : 0.78;
  pointer.velocityX *= 0.88;
  pointer.velocityY *= 0.88;

  root.style.setProperty("--blob-x", `${pointer.currentX.toFixed(2)}px`);
  root.style.setProperty("--blob-y", `${pointer.currentY.toFixed(2)}px`);
  root.style.setProperty("--blob-alpha", pointer.active.toFixed(3));
  root.style.setProperty("--blob-scale", pointer.scale.toFixed(3));
  setEffectVariables(mode, drift);

  requestAnimationFrame(setBlobState);
};

const renderPointerPosition = () => {
  root.style.setProperty("--blob-x", `${pointer.targetX.toFixed(2)}px`);
  root.style.setProperty("--blob-y", `${pointer.targetY.toFixed(2)}px`);
  root.style.setProperty("--blob-alpha", pointer.active.toFixed(3));
  root.style.setProperty("--blob-scale", `${(pointer.active ? 1 : 0.78).toFixed(3)}`);
};

const whenReady = (video) =>
  new Promise((resolve) => {
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      resolve();
      return;
    }

    video.addEventListener("canplay", resolve, { once: true });
  });

const playVideo = (video) => {
  const playAttempt = video.play();

  if (playAttempt) {
    playAttempt.catch(() => {});
  }
};

const syncVideos = async () => {
  await Promise.all([whenReady(baseVideo), whenReady(revealVideo)]);

  const frameDuration = 1 / 50;
  const loopDuration = Math.min(baseVideo.duration, revealVideo.duration) - frameDuration;
  const syncTolerance = 0.004;

  baseVideo.currentTime = 0;
  revealVideo.currentTime = 0;

  playVideo(baseVideo);
  playVideo(revealVideo);

  const keepSynced = () => {
    const baseTime = Math.min(baseVideo.currentTime, loopDuration);

    if (baseTime >= loopDuration || revealVideo.currentTime >= loopDuration) {
      baseVideo.currentTime = 0;
      revealVideo.currentTime = 0;
    } else if (Math.abs(revealVideo.currentTime - baseTime) > syncTolerance) {
      revealVideo.currentTime = baseTime;
    }

    if (baseVideo.paused) {
      playVideo(baseVideo);
    }

    if (revealVideo.paused) {
      playVideo(revealVideo);
    }

    requestAnimationFrame(keepSynced);
  };

  requestAnimationFrame(keepSynced);
};

const updateTarget = (event) => {
  pointer.velocityX = event.clientX - pointer.targetX;
  pointer.velocityY = event.clientY - pointer.targetY;
  pointer.targetX = event.clientX;
  pointer.targetY = event.clientY;
  pointer.active = 1;
  renderPointerPosition();
};

const setMode = (mode) => {
  hero.dataset.mode = mode;

  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

hero.addEventListener("pointerenter", (event) => {
  updateTarget(event);
  pointer.active = 1;
});

hero.addEventListener("pointermove", updateTarget);

hero.addEventListener("pointerleave", () => {
  pointer.active = 0;
});

window.addEventListener("resize", () => {
  pointer.targetX = Math.min(pointer.targetX, window.innerWidth);
  pointer.targetY = Math.min(pointer.targetY, window.innerHeight);
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMode(button.dataset.mode);
  });
});

requestAnimationFrame(setBlobState);
syncVideos();
