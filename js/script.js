/**
 * ==========================================================================
 * PORTAFOLIO PROFESIONAL - VÍCTOR MIRELES
 * Estudiante de Análisis de Sistemas & Desarrollador
 * JavaScript Vanilla (Sin librerías pesadas / Compatible con GitHub Pages)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. CONFIGURACIÓN DEL USUARIO (Fácil de modificar)
  // --------------------------------------------------------------------------
  const CONFIG = {
    nombre: "Víctor Johan Mireles Torres",
    titulo: "Estudiante de Análisis de Sistemas & Desarrollador",
    email: "TU_EMAIL@ejemplo.com",          // Reemplaza con tu correo real
    github: "https://github.com/Victor67567", // Usuario real de GitHub
    linkedin: "https://linkedin.com/in/victormireles", // Reemplaza con tu LinkedIn real
    cvPath: "assets/docs/CV_Victor_Mireles.pdf",
    institucion: "IUTEPI",
    ubicacion: "Acarigua, Venezuela"
  };

  // --------------------------------------------------------------------------
  // 2. ELEMENTOS DEL DOM
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email');
  const copyCodeBtn = document.getElementById('copy-code-btn');
  const toastContainer = document.getElementById('toast-container');
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // --------------------------------------------------------------------------
  // 3. HEADER SCROLL & NAVEGACIÓN ACTIVA
  // --------------------------------------------------------------------------
  const handleScroll = () => {
    // Sombra y fondo en header al hacer scroll
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Actualizar link activo según la posición de scroll
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
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
  handleScroll(); // Ejecución inicial

  // --------------------------------------------------------------------------
  // 4. MENÚ MÓVIL (HAMBURGUESA)
  // --------------------------------------------------------------------------
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. FILTRADO INTERACTIVO DE PROYECTOS
  // --------------------------------------------------------------------------
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Actualizar botón activo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        const categoriesList = categories.split(' ').map(c => c.trim());

        if (filterValue === 'all' || categoriesList.includes(filterValue)) {
          card.classList.remove('hidden');
          // Pequeña animación de entrada
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 6. SISTEMA DE NOTIFICACIONES TOAST
  // --------------------------------------------------------------------------
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
  // 7. COPIAR CORREO & CÓDIGO DEL TERMINAL
  // --------------------------------------------------------------------------
  // Copiar correo
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const emailToCopy = btn.getAttribute('data-email') || CONFIG.email;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailToCopy)
          .then(() => {
            showToast(`Correo copiado: ${emailToCopy}`);
          })
          .catch(() => {
            fallbackCopy(emailToCopy);
          });
      } else {
        fallbackCopy(emailToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`Copiado: ${text}`);
    } catch (err) {
      showToast('Selecciona y copia el correo manualmente.', 'fa-solid fa-circle-info');
    }
    document.body.removeChild(tempInput);
  }

  // Copiar código del Hero Terminal
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const codeElement = document.querySelector('.terminal-body code');
      if (codeElement) {
        const textToCopy = codeElement.innerText;
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            showToast('Código copiado al portapapeles');
          })
          .catch(() => {
            fallbackCopy(textToCopy);
          });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. MANEJO DE DESCARGA DE CV (Con mensaje amigable si aún no se coloca el PDF)
  // --------------------------------------------------------------------------
  const cvDownloadBtns = document.querySelectorAll('.btn-download-cv');
  cvDownloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Permitir la acción normal de descarga pero notificar al usuario
      showToast('Iniciando descarga de CV...', 'fa-solid fa-file-arrow-down');
    });
  });

  // --------------------------------------------------------------------------
  // 9. MODAL DE DETALLES DE PROYECTO
  // --------------------------------------------------------------------------
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

        // Renderizar tags de tecnologías
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
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (projectModal) {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
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
  // 10. ANIMACIONES SCROLL REVEAL (IntersectionObserver)
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
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback para navegadores antiguos
    revealElements.forEach(el => el.classList.add('active'));
  }
});
