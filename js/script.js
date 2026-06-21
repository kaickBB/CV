document.addEventListener("DOMContentLoaded", function () {
    initNavigation();
    initScrollEffects();
    initAnimations();
});

function initNavigation() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const header = document.querySelector("header");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });
    }

    if (header) {
        window.addEventListener("scroll", function () {
            header.classList.toggle("scrolled", window.scrollY > 100);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            e.preventDefault();

            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });

            if (navLinks) {
                navLinks.classList.remove("active");
            }

            if (menuToggle) {
                menuToggle.classList.remove("active");
            }
        });
    });
}

function initScrollEffects() {
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    document.querySelectorAll("section").forEach(function (section) {
        observer.observe(section);
    });
}

function initAnimations() {
    const typedText = document.querySelector(".typed-text");

    if (typedText) {
        const text = typedText.textContent;
        typedText.textContent = "";

        let index = 0;

        function type() {
            if (index < text.length) {
                typedText.textContent += text.charAt(index);
                index++;
                setTimeout(type, 70);
            }
        }

        type();
    }
}
function copiarTexto(event, texto, botao) {
    event.preventDefault();
    event.stopPropagation();

    navigator.clipboard.writeText(texto);

    botao.innerHTML = '<i class="fas fa-check"></i>';

    mostrarToast("Copiado para a área de transferência!");

    setTimeout(() => {
        botao.innerHTML = '<i class="fas fa-copy"></i>';
    }, 2000);
}

function mostrarToast(mensagem) {
    const toast = document.getElementById("copy-toast");

    toast.querySelector("span").textContent = mensagem;

    toast.classList.add("show");

    clearTimeout(window.toastTimeout);

    window.toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}
