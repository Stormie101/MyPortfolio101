const { createApp, ref, reactive, onMounted } = Vue;

createApp({
    setup() {
        // --- Core Refs ---
        const cursorDot = ref(null);
        const cursorOutline = ref(null);
        const currentDesignation = ref('Full Stack Developer');
        const activeExp = ref(0);

        // --- Contact Form State ---
        const contactForm = reactive({
            name: '',
            email: '',
            message: ''
        });

        // --- Data Arrays ---
        const designations = [
            'Full Stack Developer',  
            'Web Architect', 
            'AI Enthusiast'
        ];

        const experiences = [
            { 
                companyShort: 'Kyrol Security', 
                company: 'KYROL Security Labs', 
                title: 'Full Stack Developer Internship', 
                period: 'Aug 2023 - Nov 2023',
                points: [
                    'Designed secure web modules', 
                    'Managed SQL databases', 
                    'Full-stack development using PHP'
                ] 
            },
            { 
                companyShort: 'Freelance', 
                company: 'Self-Employed', 
                title: 'Full Stack Developer', 
                period: 'Sept 2025 - Present',
                points: [
                    'Designed Front-end interfaces', 
                    'Follow Software Requirements', 
                    'Implemented Back-end logic'
                ] 
            },
            { 
                companyShort: 'Gajeto', 
                company: 'Laksamana Gemilang', 
                title: 'Sales Assistant 1', 
                period: 'Jan 2024 - July 2024',
                points: [
                    'Strong interpersonal skills', 
                    'Target-driven sales performance', 
                    'Real-time customer problem solving'
                ] 
            }
        ];

        const projects = [
            { name: 'E-Commerce App', desc: 'Full-stack ordering system with admin dashboard.', tags: ['HTML', 'PHP', 'MySQL','JavaScript'] },
            { name: 'Billing System', desc: 'Automated invoice and PO generation platform.', tags: ['HTML', 'PHP', 'MySQL','JavaScript'] },
            { name: 'RFID Attendance Web App', desc: 'Web application for managing attendance using RFID technology.', tags: ['Laravel', 'MySQL','Tailwind CSS'] },
            { name: 'CSR Report System', desc: 'Internal database tool for service reporting.', tags: ['HTML', 'PHP', 'MySQL','JavaScript'] }
        ];

        const certificates = [
            { name: 'Java Programming', image: 'insert/Java-certificate.png' },
            { name: 'JS Game Development', image: 'insert/jsgame-certificate.png' },
            { name: 'Intro to CSS', image: 'insert/introCss-certificate.png' },
            { name: 'Web Development', image: 'insert/web-dev-certificate.png' },
            { name: 'Responsive Web Design', image: 'insert/responsive-web-certificate.png' }
        ];

        // --- Methods ---
        const handleContact = () => {
            console.log("Contact Data Received:", { ...contactForm });
            
            // Basic User Feedback
            alert(`Thanks ${contactForm.name}! I'll get back to you soon via ${contactForm.email}.`);
            
            // Reset fields
            contactForm.name = '';
            contactForm.email = '';
            contactForm.message = '';
        };

        onMounted(() => {
            // --- Custom Cursor Interaction (Desktop Only) ---
            if (window.innerWidth >= 1024) {
                window.addEventListener("mousemove", (e) => {
                    const posX = e.clientX;
                    const posY = e.clientY;

                    // The actual dot follows perfectly
                    if (cursorDot.value) {
                        cursorDot.value.style.left = `${posX}px`;
                        cursorDot.value.style.top = `${posY}px`;
                    }

                    // The outline animates with a slight "lag" for effect
                    if (cursorOutline.value) {
                        cursorOutline.value.animate({
                            left: `${posX}px`,
                            top: `${posY}px`
                        }, { duration: 400, fill: "forwards" });
                    }
                });

                // Attach hover listeners to all interactive elements
                const updateHoverListeners = () => {
                    const interactive = document.querySelectorAll('a, button, .group, input, textarea');
                    interactive.forEach(el => {
                        el.addEventListener('mouseenter', () => cursorOutline.value?.classList.add('cursor-hover-active'));
                        el.addEventListener('mouseleave', () => cursorOutline.value?.classList.remove('cursor-hover-active'));
                    });
                };
                
                updateHoverListeners();
            }

            // --- Designation Rotation ---
            setInterval(() => {
                const nextIdx = Math.floor(Math.random() * designations.length);
                currentDesignation.value = designations[nextIdx];
            }, 2500);

            // --- Scroll Reveal Observer ---
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        });

        // --- Final Return ---
        return { 
            cursorDot, 
            cursorOutline, 
            currentDesignation, 
            activeExp, 
            experiences, 
            projects, 
            certificates, 
            contactForm, 
            handleContact
        };
    }
}).mount('#app');