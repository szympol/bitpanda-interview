import { gsap } from 'gsap';

let height = '';

const calculateAnimationDelay = (el: HTMLElement): number => {
  const element = el;
  const dataSetIndex: string = element.dataset.index as string;

  const delay = Number(dataSetIndex) * 0.15;

  return delay;
};

function beforeEnterAnimation(el: HTMLElement):void {
  if (!el) return;

  const element = el;

  height = el.style.height;
  element.style.opacity = '0';
  element.style.height = '0';
}

function enterAnimation(el: HTMLElement, done: () => void):void {
  if (!el) return;

  gsap.to(el, {
    opacity: 1,
    height,
    delay: () => calculateAnimationDelay(el),
    onComplete: done,
  });
}

function leaveAnimation(el: HTMLElement, done: () => void):void {
  if (!el) return;

  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: () => calculateAnimationDelay(el),
    onComplete: done,
  });
}

export default function useListAnimation(): {
  beforeEnterAnimation: (el: HTMLElement) => void
  enterAnimation: (el: HTMLElement, done: () => void) => void
  leaveAnimation: (el: HTMLElement, done: () => void) => void
  } {
  return {
    beforeEnterAnimation,
    enterAnimation,
    leaveAnimation,
  };
}
