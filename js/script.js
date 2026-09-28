/**
 * ==========================================================================
 * PORTAFOLIO PROFESIONAL - VÍCTOR MIRELES
 * Estudiante de Análisis de Sistemas & Desarrollador
 * JavaScript Vanilla (Sin dependencias externas / Optimizado para GitHub Pages)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. CONFIGURACIÓN DEL USUARIO
  // --------------------------------------------------------------------------
  const CONFIG = {
    nombre: "Víctor Johan Mireles Torres",
    titulo: "Estudiante de Análisis de Sistemas & Desarrollador",
    email: "victormirelest2007@gmail.com",
    github: "https://github.com/Victor67567",
    linkedin: "https://linkedin.com/in/Victor67567",
    cvPath: "assets/docs/CV_Victor_Mireles.pdf",
    institucion: "IUTEPI",
    ubicacion: "Acarigua, Venezuela"
  };

  // --------------------------------------------------------------------------
  // 2. CANVAS DE PARTÍCULAS TECNOLÓGICAS (Constelación Dinámica en Fondo)
  // --------------------------------------------------------------------------
  const initParticleCanvas = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respetar preferencia de accesibilidad (reducir movimiento)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 18 : 38;
    const connectionDistance = isMobile ? 85 : 125;
    const mouseConnectionDistance = 140;

    let mouse = { x: -1000, y: -1000, active: false };
    let animationFrameId = null;
    let isPageVisible = true;

    // Definición de partícula
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.8 + 1;
        this.baseAlpha = Math.random() * 0.45 + 0.25;
        // Paleta cian y violeta
        this.color = Math.random() > 0.4 ? '56, 189, 248' : '168, 85, 247';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebote en bordes suaves
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Suave interacción con cursor
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseConnectionDistance) {
            const force = (mouseConnectionDistance - dist) / mouseConnectionDistance;
            this.x -= (dx / dist) * force * 0.7;
            this.y -= (dy / dist) * force * 0.7;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.baseAlpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.color}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Conexión con el mouse
        if (mouse.active) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseConnectionDistance) {
            const alpha = (1 - dist / mouseConnectionDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!isPageVisible) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Listeners del mouse para partículas
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    // Pausar si la pestaña no está visible (ahorro de batería y CPU)
    document.addEventListener('visibilitychange', () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        animate();
      } else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });

    // Resize del canvas con debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 200);
    }, { passive: true });

    animate();
  };

  initParticleCanvas();

  // --------------------------------------------------------------------------
  // 3. CURSOR GLOW AMBIENTAL (Flashlight interactivo 60fps con Lerp)
  // --------------------------------------------------------------------------
  const initCursorGlow = () => {
    const cursorGlow = document.getElementById('cursor-glow');
    if (!cursorGlow) return;

    // Solo en dispositivos con puntero fino (computadoras de escritorio)
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return;

    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let isMoving = false;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        cursorGlow.style.opacity = '1';
      }
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      cursorGlow.style.opacity = '0';
      isMoving = false;
    });

    const updateCursor = () => {
      if (isMoving) {
        // Interpolación suave (lerp)
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;
      }
      requestAnimationFrame(updateCursor);
    };

    updateCursor();
  };

  initCursorGlow();

  // --------------------------------------------------------------------------
  // 4. EFECTO TYPEWRITER (Escritura dinámica y fluida en Hero)
  // --------------------------------------------------------------------------
  const initTypewriter = () => {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    const phrases = [
      "Desarrollo Web & Laravel",
      "Python & Inteligencia Artificial",
      "Análisis de Datos con Power BI",
      "Bases de Datos & SQL",
      "Desarrollo DSP en C++",
      "Sistemas & Automatización"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 85;
      }

      // Si terminó de escribir la frase
      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2200; // Pausa antes de borrar
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pausa antes de la siguiente frase
      }

      setTimeout(typeLoop, typingSpeed);
    };

    // Iniciar el efecto tras breve espera
    setTimeout(typeLoop, 800);
  };

  initTypewriter();

  // --------------------------------------------------------------------------
  // 5. CONTADOR DE ESTADÍSTICAS & MÉTRICAS (IntersectionObserver)
  // --------------------------------------------------------------------------
  const initStatsCounter = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    let hasCounted = false;

    const easeOutQuad = (t) => t * (2 - t);

    const animateCount = (element, target, duration = 1800) => {
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const currentVal = Math.floor(easedProgress * target);

        element.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = target;
          element.classList.add('count-complete');
        }
      };

      requestAnimationFrame(update);
    };

    if ('IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            statNumbers.forEach(stat => {
              const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
              animateCount(stat, target);
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.3 });

      const statsBar = document.querySelector('.stats-counter-bar');
      if (statsBar) {
        statsObserver.observe(statsBar);
      }
    } else {
      // Fallback
      statNumbers.forEach(stat => {
        stat.textContent = stat.getAttribute('data-target');
      });
    }
  };

  initStatsCounter();

  // --------------------------------------------------------------------------
  // 6. SPOTLIGHT DINÁMICO & 3D TILT EN TARJETAS
  // --------------------------------------------------------------------------
  const initInteractiveCards = () => {
    const cards = document.querySelectorAll('.project-card, .skill-category-card, .terminal-card, .about-card, .education-card, .contact-card, .cv-box');
    const isTouchDevice = window.matchMedia('(hover: none) or (pointer: coarse)').matches;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Actualizar variables de luz dinámica
        card.style.setProperty('--spotlight-x', `${x}px`);
        card.style.setProperty('--spotlight-y', `${y}px`);

        // Efecto 3D Tilt suave solo en pantallas grandes
        if (!isTouchDevice && window.innerWidth > 992) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -4;
          const rotateY = ((x - centerX) / centerX) * 4;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.removeProperty('--spotlight-x');
        card.style.removeProperty('--spotlight-y');
        if (!isTouchDevice) {
          card.style.transform = '';
        }
      });
    });
  };

  initInteractiveCards();

  // --------------------------------------------------------------------------
  // 7. ONDA RIPPLE EN BOTONES
  // --------------------------------------------------------------------------
  const initButtonRipples = () => {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
      button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple-wave';

        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, 600);
      });
    });
  };

  initButtonRipples();

  // --------------------------------------------------------------------------
  // 8. HEADER SCROLL & NAVEGACIÓN ACTIVA
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (targetNavLink) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------------------------------------------------------------------------
  // 9. MENÚ MÓVIL (DRAWER MODERNO + BACKDROP + TOUCH GESTURES)
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navBackdrop = document.getElementById('nav-backdrop');

  const openMobileMenu = () => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.classList.add('menu-open');
  };

  const closeMobileMenu = () => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.classList.remove('menu-open');
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileMenu);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    navMenu.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    navMenu.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX - touchStartX > 50) {
        closeMobileMenu();
      }
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 10. FILTRADO INTERACTIVO DE PROYECTOS
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card, index) => {
        const categories = card.getAttribute('data-category') || '';
        const categoriesList = categories.split(' ').map(c => c.trim());

        if (filterValue === 'all' || categoriesList.includes(filterValue)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px) scale(0.97)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, index * 40);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 11. SISTEMA DE NOTIFICACIONES TOAST
  // --------------------------------------------------------------------------
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, iconClass = 'fa-solid fa-circle-check') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="${iconClass}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3500);
  }

  // --------------------------------------------------------------------------
  // 12. COPIAR CORREO & CÓDIGO DEL TERMINAL
  // --------------------------------------------------------------------------
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email');
  const copyCodeBtn = document.getElementById('copy-code-btn');

  const fallbackCopy = (text) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`Copiado: ${text}`);
    } catch (err) {
      showToast('Selecciona y copia manualmente.', 'fa-solid fa-circle-info');
    }
    document.body.removeChild(tempInput);
  };

  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const emailToCopy = btn.getAttribute('data-email') || CONFIG.email;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailToCopy)
          .then(() => showToast(`Correo copiado: ${emailToCopy}`))
          .catch(() => fallbackCopy(emailToCopy));
      } else {
        fallbackCopy(emailToCopy);
      }
    });
  });

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const codeElement = document.querySelector('.terminal-body code');
      if (codeElement) {
        const textToCopy = codeElement.innerText;
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(textToCopy)
            .then(() => showToast('Configuración copiada al portapapeles'))
            .catch(() => fallbackCopy(textToCopy));
        } else {
          fallbackCopy(textToCopy);
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 13. MANEJO DE DESCARGA DE CV
  // --------------------------------------------------------------------------
  const cvDownloadBtns = document.querySelectorAll('.btn-download-cv');
  cvDownloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Iniciando descarga de CV...', 'fa-solid fa-file-arrow-down');
    });
  });

  // --------------------------------------------------------------------------
  // 14. MODAL DE DETALLES DE PROYECTO
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const viewProjectBtns = document.querySelectorAll('.btn-view-project');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalTech = document.getElementById('modal-project-tech');
  const modalStatus = document.getElementById('modal-project-status');
  const modalCodeBtn = document.getElementById('modal-project-code');

  const projectDetailsData = {
    'cine-mall': {
      title: 'Cine Mall — Gestión de Cine',
      status: 'En desarrollo',
      desc: 'Sistema web completo diseñado para la administración integral de un complejo de cine. Permite la gestión de catálogo de películas, administración de salas y butacas, programación de funciones, control de usuarios y módulo de venta de boletos.',
      tech: ['Laravel', 'PHP', 'MySQL', 'Blade', 'JavaScript', 'CSS'],
      codeNote: 'El repositorio será vinculado una vez finalizada la fase actual de desarrollo.'
    },
    'inventario-facturacion': {
      title: 'Sistema de Inventario y Facturación',
      status: 'En desarrollo',
      desc: 'Solución web conceptual orientada a la gestión comercial de tiendas de retail (ropa, calzado y accesorios). Incluye control de existencias en almacén, registro de clientes, emisión de facturas y visualización de flujo de ventas.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Base de datos'],
      codeNote: 'Estructura modular en desarrollo.'
    },
    'beatstore': {
      title: 'BeatStore — Marketplace Musical',
      status: 'Proyecto personal',
      desc: 'Plataforma web conceptual para productores musicales y artistas. Integra un reproductor de audio para streaming de instrumentales, catálogo categorizado por géneros/BPM y sistema de licencias de uso.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'SQLite'],
      codeNote: 'Prototipo funcional orientado a la comunidad musical.'
    },
    'gestion-personal': {
      title: 'Sistema de Gestión de Personal',
      status: 'Proyecto académico',
      desc: 'Aplicación de escritorio para la administración de nómina y talento humano. Facilita el registro de empleados, control de departamentos, búsqueda avanzada y reportes administrativos.',
      tech: ['Python', 'SQLite'],
      codeNote: 'Proyecto desarrollado con fines académicos en IUTEPI.'
    },
    'analisis-datos': {
      title: 'Análisis de Datos & Dashboard',
      status: 'Proyecto académico',
      desc: 'Proyecto de inteligencia de negocios enfocado en la extracción, transformación y visualización de datos comerciales. Cuenta con dashboards interactivos para la toma de decisiones estratégicas.',
      tech: ['Power BI', 'Excel', 'Modelado DAX'],
      codeNote: 'Informes y paneles interactivos generados en Power BI.'
    },
    'drum-machine': {
      title: 'Drum Machine — Caja de Ritmos DSP',
      status: 'Proyecto personal',
      desc: 'Aplicación de procesamiento de señal de audio (DSP) inspirada en cajas de ritmos clásicas de producción musical. Desarrollada con C++ y el framework JUCE para garantizar baja latencia en reproducción de samples y manipulación de parámetros de sonido.',
      tech: ['C++', 'JUCE', 'Audio DSP'],
      codeNote: 'Exploración de desarrollo de software de audio en C++.'
    }
  };

  viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      const data = projectDetailsData[projectId];

      if (data && projectModal) {
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalStatus.textContent = data.status;

        modalTech.innerHTML = '';
        data.tech.forEach(t => {
          const span = document.createElement('span');
          span.className = 'tech-tag';
          span.textContent = t;
          modalTech.appendChild(span);
        });

        if (modalCodeBtn) {
          modalCodeBtn.title = data.codeNote;
        }

        projectModal.classList.add('active');
        document.body.classList.add('modal-open');
      }
    });
  });

  const closeModal = () => {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 15. ANIMACIONES SCROLL REVEAL (Con Delay Staggering Dinámico)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach((el, index) => {
      // Si el elemento está dentro de un grid, aplicar delay escalonado
      const parentGrid = el.closest('.skills-grid, .projects-grid, .quick-info-stack, .about-pillars');
      if (parentGrid) {
        const siblings = Array.from(parentGrid.children);
        const childIndex = siblings.indexOf(el);
        if (childIndex >= 0) {
          el.style.transitionDelay = `${childIndex * 0.08}s`;
        }
      }
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
});
