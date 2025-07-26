const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const animClass = el.dataset.anim;
            el.classList.remove('animate-on-scroll');
            el.classList.add('animate__animated', animClass);
            observer.unobserve(el); // solo una vez
        }
    });
}, {
    threshold: 0.4
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});