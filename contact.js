/* =============================================
   CONTACT.JS WITH EMAILJS
============================================= */

document.addEventListener('DOMContentLoaded', function () {

    // ================= EMAILJS INIT =================
    emailjs.init({
        publicKey: "BCUYRBtddJ2pl5qlQ"
    });

    // ================= MOBILE MENU =================
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburger && mobileNav) {

        hamburger.addEventListener('click', function () {

            mobileNav.classList.toggle('open');

            const spans = hamburger.querySelectorAll('span');

            if (mobileNav.classList.contains('open')) {

                spans[0].style.transform =
                    'rotate(45deg) translate(5px, 5px)';

                spans[1].style.opacity = '0';

                spans[2].style.transform =
                    'rotate(-45deg) translate(5px, -5px)';

            } else {

                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });

            }

        });

        document.addEventListener('click', function (e) {

            if (
                !hamburger.contains(e.target) &&
                !mobileNav.contains(e.target)
            ) {

                mobileNav.classList.remove('open');

                hamburger.querySelectorAll('span').forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });

            }

        });

    }

    // ================= STICKY HEADER =================
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', function () {

        if (!header) return;

        header.style.boxShadow =
            window.scrollY > 10
                ? '0 4px 32px rgba(0,0,0,.25)'
                : '0 2px 24px rgba(0,0,0,.18)';
    });

    // ================= SCROLL ANIMATION =================
    const fadeEls = document.querySelectorAll('.fade-up');

    if (fadeEls.length) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        fadeEls.forEach(el => observer.observe(el));

    }

    // ================= CONTACT FORM =================
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('formSuccess');

    if (form) {

        form.addEventListener('submit', function (e) {

            e.preventDefault();

            const nameVal =
                document.getElementById('name').value.trim();

            const phoneVal =
                document.getElementById('phone').value.trim();

            const emailVal =
                document.getElementById('email').value.trim();

            const purposeVal =
                document.getElementById('purpose').value;

            const messageVal =
                document.getElementById('message').value.trim();

            // Validation
            if (
                !nameVal ||
                !phoneVal ||
                !purposeVal ||
                !messageVal
            ) {

                alert("Please fill all required fields.");
                return;

            }

            submitBtn.disabled = true;

            const btnText =
                submitBtn.querySelector('.btn-text');

            if (btnText) {
                btnText.textContent = "Sending...";
            }

            emailjs.send(
                "service_322pbis",
                "template_8xc3eey",
                {
                    name: nameVal,
                    phone: phoneVal,
                    email: emailVal,
                    purpose: purposeVal,
                    message: messageVal
                }
            )

            .then(function (response) {

                console.log("SUCCESS", response);

                form.querySelectorAll(
                    '.form-group, .form-row, .btn-submit'
                ).forEach(function (el) {

                    el.style.display = 'none';

                });

                if (successMsg) {

                    successMsg.classList.add('show');

                }

                form.reset();

            })

            .catch(function (error) {

                console.error("EMAILJS ERROR:", error);

                alert(
                    "Email Failed: " +
                    (error.text || "Unknown Error")
                );

                submitBtn.disabled = false;

                if (btnText) {
                    btnText.textContent = "Send Message";
                }

            });

        });

    }

    // ================= FAQ =================
    const faqItems =
        document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {

        const btn = item.querySelector('.faq-q');

        if (!btn) return;

        btn.addEventListener('click', function () {

            const isOpen =
                item.classList.contains('open');

            faqItems.forEach(function (faq) {

                faq.classList.remove('open');

                const q =
                    faq.querySelector('.faq-q');

                if (q) {
                    q.setAttribute(
                        'aria-expanded',
                        'false'
                    );
                }

            });

            if (!isOpen) {

                item.classList.add('open');

                btn.setAttribute(
                    'aria-expanded',
                    'true'
                );

            }

        });

    });

    // ================= PHONE FORMAT =================
    const phoneInput =
        document.getElementById('phone');

    if (phoneInput) {

        phoneInput.addEventListener(
            'input',
            function () {

                this.value =
                    this.value.replace(
                        /[^\d+]/g,
                        ''
                    );

            }
        );

    }

    // ================= GOOGLE MAP =================
    const addressCard =
        document.querySelector('.qc-address');

    if (addressCard) {

        addressCard.style.cursor = 'pointer';

        addressCard.addEventListener(
            'click',
            function () {

                window.open(
                    'https://maps.google.com/?q=Bhagwanpur+Jaunpur+Uttar+Pradesh',
                    '_blank'
                );

            }
        );

    }

});