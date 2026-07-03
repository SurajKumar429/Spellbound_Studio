import { useEffect } from 'react';

/**
 * Watches all elements with `.reveal` or `.reveal-stagger` classes
 * inside the current page and adds `.in` when they scroll into view.
 * Call this once per page component, after the JSX has mounted.
 */
export default function useReveal(deps = []) {
    useEffect(() => {
        const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
        if (!revealEls.length) return;

        if (!('IntersectionObserver' in window)) {
            revealEls.forEach((el) => el.classList.add('in'));
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
        );

        revealEls.forEach((el) => io.observe(el));

        return () => io.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}