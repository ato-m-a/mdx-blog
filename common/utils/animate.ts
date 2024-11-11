// duration
export const duration = 1000;

// ease-out
const easeOutQuad = (t: number) => t * (2 - t);

export const animateIn = (element: HTMLElement) => {
  let start: number | null = null;

  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;

    // 비선형 타이밍 계산
    const easedProgress = easeOutQuad(progress / duration);

    const opacity = Math.min(easedProgress, 1);
    const translateY = Math.max(30 - 30 * easedProgress, 0);

    if (element) {
      element.style.opacity = opacity.toString();
      element.style.transform = `translateY(${translateY}px)`;
    }

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

export const animateOut = (element: HTMLElement) => {
  let start: number | null = null;

  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const easedProgress = easeOutQuad(progress / duration);

    if (element) {
      element.style.opacity = Math.max(1 - easedProgress, 0).toString();
      element.style.transform = `translateY(${30 * easedProgress}px)`;
    }

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};
