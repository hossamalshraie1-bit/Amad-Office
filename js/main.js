        // JavaScript - home.js
        document.addEventListener('DOMContentLoaded', function () {
            // تهيئة Swiper للهيدر
            const heroSwiper = new Swiper('.hero-slider', {
                direction: 'horizontal',
                loop: true,
                speed: 1000,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
            });

            // تهيئة Swiper لآراء العملاء
            const testimonialSwiper = new Swiper('.testimonials-slider', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                speed: 800,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }
            });

            // تبديل النمط (كلاسيكي/حديث)
            const styleToggle = document.getElementById('styleToggle');
            const mobileStyleToggle = document.getElementById('mobileStyleToggle');
            const styleText = document.querySelector('.style-text');

            function toggleStyle() {
                document.body.classList.toggle('classic-style');
                const isClassic = document.body.classList.contains('classic-style');
                styleText.textContent = isClassic ? 'حديث' : 'كلاسيكي';
                localStorage.setItem('siteStyle', isClassic ? 'classic' : 'modern');

                // تحديث النص في النسخة الجوالية أيضًا
                if (mobileStyleToggle) {
                    mobileStyleToggle.querySelector('span').textContent = isClassic ? 'الوضع الحديث' : 'الوضع الكلاسيكي';
                }
            }

            // استعادة النمط المحفوظ
            const savedStyle = localStorage.getItem('siteStyle');
            if (savedStyle === 'classic') {
                document.body.classList.add('classic-style');
                styleText.textContent = 'حديث';
            }

            styleToggle.addEventListener('click', toggleStyle);
            if (mobileStyleToggle) {
                mobileStyleToggle.addEventListener('click', toggleStyle);
            }

            // تبديل الوضع الليلي
            const themeToggle = document.getElementById('themeToggle');
            const mobileThemeToggle = document.getElementById('mobileThemeToggle');

            function toggleTheme() {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                const icon = themeToggle.querySelector('i');
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
                localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
            }

            // استعادة الوضع الليلي المحفوظ
            const savedTheme = localStorage.getItem('darkMode');
            if (savedTheme === 'enabled') {
                document.body.classList.add('dark-mode');
                const icon = themeToggle.querySelector('i');
                icon.className = 'fas fa-sun';
            }

            themeToggle.addEventListener('click', toggleTheme);
            if (mobileThemeToggle) {
                mobileThemeToggle.addEventListener('click', toggleTheme);
            }

            // القائمة الجانبية للجووال
            const menuToggle = document.querySelector('.menu-toggle');
            const mobileNav = document.querySelector('.mobile-nav');
            const mobileOverlay = document.querySelector('.mobile-nav-overlay');
            const mobileClose = document.querySelector('.mobile-close');
            const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

            function openMobileNav() {
                mobileNav.classList.add('active');
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            function closeMobileNav() {
                mobileNav.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }

            menuToggle.addEventListener('click', openMobileNav);
            mobileClose.addEventListener('click', closeMobileNav);
            mobileOverlay.addEventListener('click', closeMobileNav);

            mobileLinks.forEach(link => {
                link.addEventListener('click', closeMobileNav);
            });

            // فلترة المشاريع
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');

            filterButtons.forEach(button => {
                button.addEventListener('click', function () {
                    // إزالة النشاط من جميع الأزرار
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // إضافة النشاط للزر المحدد
                    this.classList.add('active');

                    const filterValue = this.getAttribute('data-filter');

                    projectCards.forEach(card => {
                        const category = card.getAttribute('data-category');

                        if (filterValue === 'all' || filterValue === category) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });

            // مودال الخدمات
            const serviceModal = document.getElementById('serviceModal');
            const serviceModalBody = document.querySelector('.service-modal-body');
            const serviceModalClose = document.querySelector('.service-modal-close');
            const serviceCards = document.querySelectorAll('.service-card');

            // بيانات الخدمات
            const servicesData = {
                architectural: {
                    title: 'التصميم المعماري',
                    category: 'خدمات التصميم',
                    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    description: 'نقدم تصميمات معمارية مبتكرة تجمع بين الجمال والوظيفة والاستدامة. فريقنا من المهندسين المعماريين المبدعين يعمل على تحويل رؤيتك إلى واقع ملموس من خلال تصاميم عصرية تراعي الاحتياجات الوظيفية والجمالية والبيئية.',
                    features: [
                        'تصاميم معمارية مبتكرة وعصرية',
                        'دراسة شاملة للموقع والبيئة المحيطة',
                        'تصاميم ثلاثية الأبعاد واقعية',
                        'مخططات تنفيذية تفصيلية',
                        'استشارات معمارية متخصصة',
                        'تصاميم مستدامة وصديقة للبيئة'
                    ],
                    benefits: [
                        { icon: 'fa-lightbulb', title: 'إبداع', desc: 'تصاميم فريدة ومبتكرة' },
                        { icon: 'fa-check-circle', title: 'جودة', desc: 'معايير عالمية للتصميم' },
                        { icon: 'fa-leaf', title: 'استدامة', desc: 'حلول صديقة للبيئة' },
                        { icon: 'fa-users', title: 'تعاون', desc: 'عمل مشترك مع العميل' }
                    ]
                },
                structural: {
                    title: 'الاستشارات الإنشائية',
                    category: 'الهندسة الإنشائية',
                    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    description: 'نوفر حلولاً إنشائية متكاملة تضمن سلامة المباني وديمومتها. فريقنا من المهندسين الإنشائيين ذوي الخبرة يقدم تصاميم إنشائية دقيقة ومدروسة تلبي أعلى معايير السلامة والجودة.',
                    features: [
                        'تصميم إنشائي متكامل للمباني',
                        'حسابات إنشائية دقيقة ومعتمدة',
                        'دراسة التربة والأساسات',
                        'تصميم المنشآت الخاصة والمعقدة',
                        'مراجعة وتدقيق التصاميم الإنشائية',
                        'استشارات إنشائية متخصصة'
                    ],
                    benefits: [
                        { icon: 'fa-shield-alt', title: 'أمان', desc: 'أعلى معايير السلامة' },
                        { icon: 'fa-cogs', title: 'دقة', desc: 'حسابات هندسية دقيقة' },
                        { icon: 'fa-clock', title: 'ديمومة', desc: 'مباني تدوم طويلاً' },
                        { icon: 'fa-certificate', title: 'اعتماد', desc: 'تصاميم معتمدة رسمياً' }
                    ]
                },
                interior: {
                    title: 'التصميم الداخلي',
                    category: 'التصميم والديكور',
                    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    description: 'نبتكر تصميمات داخلية راقية تعكس شخصية العميل وتوظف المساحات بكفاءة. نجمع بين الجمال والوظيفة لخلق بيئات داخلية مريحة وملهمة تلبي احتياجاتك وتفوق توقعاتك.',
                    features: [
                        'تصميم داخلي شامل للمساحات',
                        'اختيار الألوان والمواد المناسبة',
                        'تصميم الأثاث والإضاءة',
                        'تنسيق الديكورات والإكسسوارات',
                        'تصاميم ثلاثية الأبعاد واقعية',
                        'إشراف على التنفيذ الداخلي'
                    ],
                    benefits: [
                        { icon: 'fa-paint-brush', title: 'فخامة', desc: 'تصاميم راقية وأنيقة' },
                        { icon: 'fa-expand', title: 'كفاءة', desc: 'استغلال أمثل للمساحات' },
                        { icon: 'fa-palette', title: 'تناسق', desc: 'انسجام الألوان والعناصر' },
                        { icon: 'fa-smile', title: 'راحة', desc: 'بيئة مريحة وملهمة' }
                    ]
                },
                sustainability: {
                    title: 'الاستدامة والطاقة',
                    category: 'الحلول المستدامة',
                    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    description: 'نقدم حلولاً مستدامة وموفرة للطاقة تحافظ على البيئة وتقلل التكاليف. نساعدك على تحقيق أهدافك البيئية من خلال تصاميم ذكية وأنظمة طاقة متجددة تقلل من البصمة الكربونية.',
                    features: [
                        'تصميم مباني خضراء مستدامة',
                        'أنظمة الطاقة الشمسية والمتجددة',
                        'عزل حراري ومائي متطور',
                        'أنظمة إدارة الطاقة الذكية',
                        'استخدام مواد صديقة للبيئة',
                        'تقييم الأثر البيئي للمشاريع'
                    ],
                    benefits: [
                        { icon: 'fa-leaf', title: 'بيئة', desc: 'حماية البيئة والطبيعة' },
                        { icon: 'fa-dollar-sign', title: 'توفير', desc: 'تقليل تكاليف الطاقة' },
                        { icon: 'fa-sun', title: 'طاقة', desc: 'استخدام الطاقة المتجددة' },
                        { icon: 'fa-award', title: 'شهادات', desc: 'شهادات بيئية معتمدة' }
                    ]
                },
                supervision: {
                    title: 'الإشراف على التنفيذ',
                    category: 'الإشراف الهندسي',
                    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    description: 'نوفر إشرافاً هندسياً متكاملاً لضمان جودة التنفيذ ومطابقة التصميم. فريقنا من المهندسين المشرفين يتابع المشروع بدقة من البداية حتى النهاية لضمان تنفيذ المشروع وفق أعلى معايير الجودة.',
                    features: [
                        'إشراف هندسي يومي على الموقع',
                        'مراقبة جودة المواد والتنفيذ',
                        'متابعة الجدول الزمني للمشروع',
                        'حل المشاكل الفنية أثناء التنفيذ',
                        'تقارير دورية مفصلة',
                        'استلام نهائي وضمان الجودة'
                    ],
                    benefits: [
                        { icon: 'fa-tasks', title: 'متابعة', desc: 'إشراف دقيق ومستمر' },
                        { icon: 'fa-check-double', title: 'جودة', desc: 'ضمان أعلى المعايير' },
                        { icon: 'fa-calendar-check', title: 'التزام', desc: 'الالتزام بالمواعيد' },
                        { icon: 'fa-file-alt', title: 'تقارير', desc: 'تقارير شاملة ودورية' }
                    ]
                },
                feasibility: {
                    title: 'دراسات الجدوى',
                    category: 'الاستشارات الاقتصادية',
                    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
                    description: 'نقدم دراسات متكاملة لتقييم المشاريع وضمان جدواها الاقتصادية. نساعدك على اتخاذ قرارات استثمارية مدروسة من خلال تحليل شامل للجوانب الفنية والاقتصادية والمالية للمشروع.',
                    features: [
                        'دراسة السوق والمنافسين',
                        'التحليل المالي والاقتصادي',
                        'تقدير التكاليف والعوائد',
                        'تحليل المخاطر والفرص',
                        'جدولة زمنية للمشروع',
                        'توصيات وخطط تنفيذية'
                    ],
                    benefits: [
                        { icon: 'fa-chart-line', title: 'تحليل', desc: 'دراسة شاملة ودقيقة' },
                        { icon: 'fa-lightbulb', title: 'رؤية', desc: 'قرارات مبنية على بيانات' },
                        { icon: 'fa-shield-alt', title: 'أمان', desc: 'تقليل المخاطر' },
                        { icon: 'fa-trophy', title: 'نجاح', desc: 'زيادة فرص النجاح' }
                    ]
                }
            };

            // فتح مودال الخدمة
            serviceCards.forEach(card => {
                const serviceLink = card.querySelector('.service-link');
                serviceLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    const serviceId = card.getAttribute('data-service');
                    const service = servicesData[serviceId];

                    if (service) {
                        // بناء محتوى المودال
                        const featuresHTML = service.features.map(feature =>
                            `<li><i class="fas fa-check-circle"></i> ${feature}</li>`
                        ).join('');

                        const benefitsHTML = service.benefits.map(benefit =>
                            `<div class="benefit-card">
                        <i class="fas ${benefit.icon}"></i>
                        <h4>${benefit.title}</h4>
                        <p>${benefit.desc}</p>
                    </div>`
                        ).join('');

                        serviceModalBody.innerHTML = `
                    <div class="service-modal-header">
                        <img src="${service.image}" alt="${service.title}">
                        <div class="service-modal-overlay">
                            <span class="service-modal-category">${service.category}</span>
                            <h2>${service.title}</h2>
                        </div>
                    </div>
                    <div class="service-modal-info">
                        <p class="service-modal-description">${service.description}</p>
                        
                        <div class="service-features">
                            <h3><i class="fas fa-list-check"></i> ما نقدمه في هذه الخدمة</h3>
                            <ul>${featuresHTML}</ul>
                        </div>
                        
                        <div class="service-benefits">
                            <h3>لماذا تختار خدماتنا؟</h3>
                            <div class="benefits-grid">${benefitsHTML}</div>
                        </div>
                        
                        <div class="service-modal-actions">
                            <a href="#contact" class="btn btn-primary" onclick="closeServiceModal()">
                                <i class="fas fa-phone"></i> اطلب الخدمة الآن
                            </a>
                            <button class="btn btn-secondary" onclick="closeServiceModal()">
                                <i class="fas fa-times"></i> إغلاق
                            </button>
                        </div>
                    </div>
                `;

                        serviceModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });

            // إغلاق مودال الخدمة
            function closeServiceModal() {
                serviceModal.classList.remove('active');
                document.body.style.overflow = '';
            }

            serviceModalClose.addEventListener('click', closeServiceModal);
            serviceModal.addEventListener('click', function (e) {
                if (e.target === serviceModal) {
                    closeServiceModal();
                }
            });

            // جعل الدالة متاحة عالمياً
            window.closeServiceModal = closeServiceModal;

            // مودال المشاريع
            const projectModal = document.getElementById('projectModal');
            const modalContent = document.querySelector('.modal-body');
            const modalClose = document.querySelector('.modal-close');

            projectCards.forEach(card => {
                card.addEventListener('click', function () {
                    const projectId = this.getAttribute('data-modal');
                    const projectTitle = this.querySelector('h3').textContent;
                    const projectDesc = this.querySelector('p').textContent;
                    const projectImage = this.querySelector('img').src;
                    const projectCategory = this.querySelector('.project-category').textContent;
                    const projectLocation = this.querySelectorAll('.project-meta span')[0].textContent;
                    const projectDate = this.querySelectorAll('.project-meta span')[1].textContent;

                    modalContent.innerHTML = `
                <div class="project-modal-details">
                    <div class="modal-image">
                        <img src="${projectImage}" alt="${projectTitle}">
                    </div>
                    <div class="modal-info">
                        <span class="modal-category">${projectCategory}</span>
                        <h2>${projectTitle}</h2>
                        <p>${projectDesc}</p>
                        
                        <div class="modal-meta">
                            <div class="meta-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>
                                    <span>الموقع</span>
                                    <strong>${projectLocation}</strong>
                                </div>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-calendar"></i>
                                <div>
                                    <span>سنة الإنجاز</span>
                                    <strong>${projectDate}</strong>
                                </div>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-ruler-combined"></i>
                                <div>
                                    <span>المساحة</span>
                                    <strong>850 م²</strong>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-description">
                            <h3>تفاصيل المشروع</h3>
                            <p>هذا المشروع يمثل إنجازًا هندسيًا بارزًا يجمع بين الجمال والوظيفة. تم تنفيذه بأعلى معايير الجودة والكفاءة، مع الاهتمام بكل التفاصيل الدقيقة لضمان رضا العميل وتحقيق الرؤية التصميمية.</p>
                            <ul>
                                <li>تصميم معماري مبتكر</li>
                                <li>مواد بناء عالية الجودة</li>
                                <li>أنظمة طاقة مستدامة</li>
                                <li>تصميم داخلي متكامل</li>
                                <li>إشراف هندسي متواصل</li>
                            </ul>
                        </div>
                        
                        <div class="modal-actions">
                            <a href="#contact" class="btn btn-primary">طلب خدمة مشابهة</a>
                            <button class="btn btn-secondary modal-close-btn">إغلاق</button>
                        </div>
                    </div>
                </div>
            `;

                    projectModal.classList.add('active');
                    document.body.style.overflow = 'hidden';

                    // إضافة مستمعي الأحداث للأزرار الجديدة
                    document.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);
                });
            });

            function closeModal() {
                projectModal.classList.remove('active');
                document.body.style.overflow = '';
            }

            modalClose.addEventListener('click', closeModal);
            projectModal.addEventListener('click', function (e) {
                if (e.target === projectModal) {
                    closeModal();
                }
            });

            // عداد الإحصائيات
            const statNumbers = document.querySelectorAll('.stat-number');
            let statsAnimated = false;

            function animateStats() {
                if (statsAnimated) return;

                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-goal'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps

                    let current = 0;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            stat.textContent = target;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current);
                        }
                    }, 16);
                });

                statsAnimated = true;
            }

            // أنيميشن الظهور عند التمرير
            const revealElements = document.querySelectorAll('.reveal');

            function revealOnScroll() {
                const windowHeight = window.innerHeight;
                const revealPoint = 100;

                revealElements.forEach(element => {
                    const revealTop = element.getBoundingClientRect().top;

                    if (revealTop < windowHeight - revealPoint) {
                        element.classList.add('active');

                        // تشغيل عداد الإحصائيات عندما يكون القسم مرئيًا
                        if (element.closest('.stats-section')) {
                            animateStats();
                        }
                    }
                });
            }

            // زر العودة للأعلى
            const scrollTopBtn = document.getElementById('scrollTop');

            window.addEventListener('scroll', function () {
                revealOnScroll();

                // زر العودة للأعلى
                if (window.scrollY > 500) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }

                // تغيير شريط التنقل عند التمرير
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            scrollTopBtn.addEventListener('click', function () {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // تشغيل أنيميشن الظهور عند التحميل
            revealOnScroll();

            // إرسال النموذج
            const contactForm = document.querySelector('.contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function (e) {
                    e.preventDefault();

                    // عرض رسالة نجاح
                    alert('شكراً لرسالتك! سنتواصل معك في أقرب وقت ممكن.');
                    contactForm.reset();
                });
            }

            // نموذج النشرة الإخبارية
            const newsletterForm = document.querySelector('.newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    const email = this.querySelector('input[type="email"]').value;

                    // عرض رسالة نجاح
                    alert(`شكراً لك على اشتراكك في نشرتنا الإخبارية! تم إرسال تأكيد إلى ${email}`);
                    this.reset();
                });
            }

            // إضافة تأثيرات عند تحميل الصفحة
            window.addEventListener('load', function () {
                document.body.classList.add('loaded');
            });
        });