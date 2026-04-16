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
            'Software Engineer'
        ];

        const experiences = [
            { 
                companyShort: 'Kyrol Security', 
                company: 'KYROL Security Labs', 
                title: 'Full Stack Developer', 
                points: ['Built secure web modules', 'SQL Management', 'Full-stack implementation'] 
            },
            { 
                companyShort: 'Laksaman', 
                company: 'Laksaman Gemilang', 
                title: 'Sales Advisor', 
                points: ['Interpersonal communication', 'Target management', 'Problem solving'] 
            }
        ];

        const projects = [
            { name: 'E-Commerce App', desc: 'Laravel & Java full-stack ordering system.', tags: ['PHP', 'MySQL', 'Java'] },
            { name: 'Billing System', desc: 'Automated invoice and DO generation tool.', tags: ['PHP', 'MySQL'] },
            { name: 'Gym App', desc: 'Ionic application for workout tracking.', tags: ['Ionic', 'Angular'] },
            { name: 'CSR Report System', desc: 'Database tool for service reporting.', tags: ['Java', 'PHP'] }
        ];

        const certificates = [
            { name: 'Java Programming', image: 'insert/Java-certificate.png' },
            { name: 'JS Game Development', image: 'insert/jsgame-certificate.png' },
            { name: 'Intro to CSS', image: 'insert/introCss-certificate.png' },
            { name: 'Web Development', image: 'insert/web-dev-certificate.png' },
            { name: 'Responsive Web Design', image: 'insert/responsive-web-certificate.png' }
        ];

        onMounted(() => {
            // Cursor Logic (Desktop Only)
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

                // Magnetic hover effect
                const targets = document.querySelectorAll('a, button, .group');
                targets.forEach(el => {
                    el.addEventListener('mouseenter', () => cursorOutline.value.classList.add('cursor-hover-active'));
                    el.addEventListener('mouseleave', () => cursorOutline.value.classList.remove('cursor-hover-active'));
                });
            }

            // Cycle Designations
            setInterval(() => {
                const randomIdx = Math.floor(Math.random() * designations.length);
                currentDesignation.value = designations[randomIdx];
            }, 2500);

            // Scroll Reveal Logic
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
            cursorDot, 
            cursorOutline, 
            currentDesignation, 
            activeExp, 
            experiences, 
            projects, 
            certificates 
        };
    }
}).mount('#app');