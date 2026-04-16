const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const cursorDot = ref(null);
        const cursorOutline = ref(null);
        const currentDesignation = ref('Full Stack Developer');
        const activeExp = ref(0);

        const designations = [
            'Full Stack Developer', 
            'AI Enthusiast', 
            'Web Architect', 
        ];

        const experiences = [
            { 
                companyShort: 'Kyrol Security', 
                company: 'KYROL Security Labs', 
                title: 'Web Intern', 
                points: ['Designed secure web modules', 'Managed SQL databases', 'Full-stack development'] 
            },
            { 
                companyShort: 'Laksaman', 
                company: 'Laksaman Gemilang', 
                title: 'Sales Advisor', 
                points: ['Strong interpersonal skills', 'Target-driven performance', 'Real-time problem solving'] 
            }
        ];

        const projects = [
            { name: 'E-Commerce App', desc: 'Full-stack ordering system with admin dashboard.', tags: ['PHP', 'MySQL', 'Java'] },
            { name: 'Billing System', desc: 'Automated invoice and PO generation platform.', tags: ['PHP', 'MySQL'] },
            { name: 'Gym App', desc: 'Ionic mobile application for fitness tracking.', tags: ['Ionic', 'Angular'] },
            { name: 'CSR Report System', desc: 'Internal database tool for service reporting.', tags: ['Java', 'PHP'] }
        ];

        const certificates = [
            { name: 'Java Programming', image: 'insert/Java-certificate.png' },
            { name: 'JS Game Development', image: 'insert/jsgame-certificate.png' },
            { name: 'Intro to CSS', image: 'insert/introCss-certificate.png' },
            { name: 'Web Development', image: 'insert/web-dev-certificate.png' },
            { name: 'Responsive Web Design', image: 'insert/responsive-web-certificate.png' }
        ];

        onMounted(() => {
            // Cursor Interaction (Desktop Only)
            if (window.innerWidth >= 1024) {
                window.addEventListener("mousemove", (e) => {
                    const posX = e.clientX;
                    const posY = e.clientY;

                    cursorDot.value.style.left = `${posX}px`;
                    cursorDot.value.style.top = `${posY}px`;

                    cursorOutline.value.animate({
                        left: `${posX}px`,
                        top: `${posY}px`
                    }, { duration: 400, fill: "forwards" });
                });

                // Expand cursor on interactive elements
                const interactiveElements = document.querySelectorAll('a, button, .group');
                interactiveElements.forEach(el => {
                    el.addEventListener('mouseenter', () => cursorOutline.value.classList.add('cursor-hover-active'));
                    el.addEventListener('mouseleave', () => cursorOutline.value.classList.remove('cursor-hover-active'));
                });
            }

            // Cycle Designations Every 2.5s
            setInterval(() => {
                const nextIdx = Math.floor(Math.random() * designations.length);
                currentDesignation.value = designations[nextIdx];
            }, 2500);

            // Scroll Reveal Observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        });

        return { 
            cursorDot, cursorOutline, currentDesignation, activeExp, 
            experiences, projects, certificates 
        };
    }
}).mount('#app');