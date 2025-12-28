// ===== LINK PAGE INTERACTIVITY =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all interactive features
    initParallaxOrbs();
    initCardHoverEffects();
    initSmoothScrollLinks();
    initClickRipple();
    initShareButton();
});

// ===== SHARE BUTTON =====
function initShareButton() {
    const shareBtn = document.querySelector('.share-btn');
    if (!shareBtn) return;

    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'HANEDOTA | Links Oficiais',
            text: 'Confira os links do Hanedota - Coach Profissional de Dota 2 | Head Coach Avalanche E-Sports | 500+ Alunos | Campeão Next Level 2025',
            url: window.location.href
        };

        try {
            // Usa Web Share API se disponível (mobile principalmente)
            if (navigator.share) {
                await navigator.share(shareData);
                showShareFeedback(shareBtn, 'Compartilhado!');
            } else {
                // Fallback: copiar link para clipboard
                await navigator.clipboard.writeText(window.location.href);
                showShareFeedback(shareBtn, 'Link copiado!');
            }
        } catch (err) {
            // Se falhar, tenta copiar o link
            try {
                await navigator.clipboard.writeText(window.location.href);
                showShareFeedback(shareBtn, 'Link copiado!');
            } catch (clipboardErr) {
                showShareFeedback(shareBtn, 'Erro ao copiar');
            }
        }
    });
}

function showShareFeedback(button, message) {
    const originalText = button.innerHTML;
    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> ${message}`;
    button.style.background = 'rgba(34, 197, 94, 0.2)';
    button.style.borderColor = 'rgba(34, 197, 94, 0.5)';
    button.style.color = '#22c55e';

    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        button.style.borderColor = '';
        button.style.color = '';
    }, 2000);
}

// ===== PARALLAX ORBS =====
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.orb');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 15;
            const xOffset = x * speed;
            const yOffset = y * speed;

            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

// ===== CARD HOVER EFFECTS =====
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.featured-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===== SMOOTH SCROLL LINKS =====
function initSmoothScrollLinks() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== CLICK RIPPLE EFFECT =====
function initClickRipple() {
    const buttons = document.querySelectorAll('.link-button, .featured-card');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(249, 115, 22, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation to stylesheet
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== ANALYTICS TRACKING (placeholder) =====
function trackClick(linkName) {
    // Placeholder for analytics integration
    console.log(`Link clicked: ${linkName}`);

    // Example: Google Analytics
    // gtag('event', 'click', {
    //     'event_category': 'Link',
    //     'event_label': linkName
    // });
}

// Add click tracking to all links
document.querySelectorAll('.link-button, .featured-card').forEach(link => {
    link.addEventListener('click', () => {
        const linkText = link.querySelector('.link-text, .card-title')?.textContent;
        if (linkText) trackClick(linkText);
    });
});
