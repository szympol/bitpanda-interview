import { gsap } from 'gsap';

/* eslint-disable */

let height = '';

function beforeEnterAnimation(el:any):void {
  if(!el) return;
  height = el.style.height
  el.style.opacity = '0';
  el.style.height = '0';
};

function enterAnimation(el:any, done: () => void):void {
  if(!el) return;

  gsap.to(el, {
    opacity: 1,
    height: height,
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
};

function leaveAnimation(el:any, done: () => void):void {
  if(!el) return;

  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: el.dataset.index * 0.15,
    onComplete: done
  })
}

export default function useListAnimation(): {
  beforeEnterAnimation: (el: any) => void
  enterAnimation: (el: any, done: () => void) => void
  leaveAnimation: (el: any, done: () => void) => void
} {
  return {
    beforeEnterAnimation,
    enterAnimation,
    leaveAnimation,
  };
}
/* eslint-enable */
