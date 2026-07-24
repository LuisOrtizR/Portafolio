import type { Directive } from 'vue'

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
)

interface RevealOptions {
  delay?: number
}

export const vReveal: Directive<HTMLElement, RevealOptions | number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal-init')

    const delay = typeof binding.value === 'number' ? binding.value : binding.value?.delay
    if (delay) {
      el.style.transitionDelay = `${delay}ms`
    }

    observer.observe(el)
  },
  unmounted(el) {
    observer.unobserve(el)
  },
}
