/* ---------- Nav & Aside Link Function ---------- */
export function renderLinks({ container, links, liClass = "", aClass = "", addActiveToFirst = false }) {
  if (!container) return;

  container.innerHTML = links
    .map(({ text, href }, index) => {
      const liCls = liClass ? ` class="${liClass}"` : "";
      const aCls = aClass ? ` class="${aClass}${addActiveToFirst && index === 0 ? " active" : ""}"` : "";
      return `
        <li${liCls}>
          <a${aCls} href="${href}">${text}</a>
        </li>
      `;
    })
    .join("");
}


/* ---------- Social Media Handles ---------- */
export function renderSocialLinks(container, links) {
  container.innerHTML = links
    .map(
      ({ href, icon }) => `
        <a href="${href}" target="_blank" rel="noopener">
          <i class="fa-brands ${icon}"></i>
        </a>`
    )
    .join("");
}

/* ---------- Contact Info Handles ---------- */
export function renderContactInfo(container, contactInfo) {
  container.innerHTML = contactInfo
    .map(
      ({ icon, text }) => `
      <div class="footer-item">
        <i class="fa-solid ${icon}"></i>
        <p>${text}</p>
      </div>
    `
    )
    .join("");
}



/* ---------- Cast Information ---------- */
export function renderCast(container, castData) {
  container.innerHTML = castData
    .map(
      (cast, index) => `
        <div class="cast__card" style="--index: ${index}">
          <div class="cast__card-items">
            <h3>${cast.name}</h3>
            <img src="${cast.img}" alt="${cast.name}" />
          </div>
        </div>
      `
    )
    .join("");
}


/* ---------- Cast Information ---------- */
export function renderCarousel(indicatorsContainer, innerContainer, slides) {
  if (!indicatorsContainer || !innerContainer || !slides || slides.length === 0) return;

  // ---------- Render indicators ----------
  indicatorsContainer.innerHTML = slides
    .map(
      (_, i) => `
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}"
          ${i === 0 ? 'class="active" aria-current="true"' : ''}
          aria-label="Slide ${i + 1}">
        </button>
      `
    )
    .join("");

  // ---------- Render slides ----------
  slides.forEach((slide, i) => {
    const div = document.createElement("div");
    div.classList.add("carousel-item");
    if (i === 0) div.classList.add("active");

    const img = document.createElement("img");
    img.src = slide.src;
    img.alt = slide.alt;
    img.classList.add("d-block", "w-100");

    div.appendChild(img);
    innerContainer.appendChild(div);
  });
}





/* ---------- Navigation Bar ---------- */
/**
 * Scroll spy for updating active nav links based on sections in viewport
 * @param {HTMLElement} navContainer - container holding navigation links
 * @param {NodeListOf<HTMLElement>} sections - sections to track
 * @param {string} linkSelector - selector for nav links inside container (default: ".nav__link")
 */
export function initScrollSpy(navContainer, sections, linkSelector = ".nav__link") {
  const navLinks = navContainer.querySelectorAll(linkSelector);

  function updateActiveNav() {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    let currentSection = null;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        currentSection = section;
      }
    });

    if (currentSection) {
      const id = currentSection.getAttribute("id");

      navLinks.forEach(link => link.classList.remove("active"));

      const navLink = navContainer.querySelector(`${linkSelector}[href="#${id}"]`);
      if (navLink) navLink.classList.add("active");
    }
  }

  // Scroll listener with requestAnimationFrame throttling
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check
  updateActiveNav();
}



/* ---------- Sidebar Open And Close Functionality ---------- */
/**
 * Initialize a sidebar toggle system
 * @param {HTMLElement} sidebarEl - the sidebar element
 * @param {HTMLElement} openBtn - button to open sidebar (hamburger)
 * @param {HTMLElement} closeBtn - button to close sidebar
 * @param {NodeListOf<HTMLElement>} links - sidebar links that should close it on click
 * @param {HTMLElement} overlay - overlay element that closes sidebar on click
 */
export function initSidebar({ sidebarEl, openBtn, closeBtn, links, overlay }) {
  if (!sidebarEl || !openBtn || !closeBtn || !overlay) return;

  const openSidebar = () => {
    sidebarEl.classList.remove('hide');
    overlay.classList.remove('hidden');
  };

  const closeSidebar = () => {
    sidebarEl.classList.add('hide');
    overlay.classList.add('hidden');
  };

  openBtn.addEventListener('click', openSidebar);
  closeBtn.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  links.forEach(link => link.addEventListener('click', closeSidebar));
}


/* ---------- Modal Video Functionality ---------- */
/**
 * Initialize a video modal
 * @param {HTMLElement} modalEl - the modal container
 * @param {HTMLElement} openBtn - button that opens the modal
 * @param {HTMLElement} closeBtn - button that closes the modal
 * @param {HTMLIFrameElement} playerEl - iframe for YouTube player
 * @param {string} videoURL - YouTube video URL
 */
export function initVideoModal({ modalEl, openBtn, closeBtn, playerEl, videoURL }) {
  if (!modalEl || !openBtn || !closeBtn || !playerEl || !videoURL) return;

  const openModal = () => {
    modalEl.classList.remove('hidden'); // show modal
    playerEl.src = videoURL;            // load video + autoplay
  };

  const closeModal = () => {
    modalEl.classList.add('hidden');    // hide modal
    playerEl.src = '';                  // stop video
  };

  // Open modal on button click
  openBtn.addEventListener('click', openModal);

  // Close modal on close button click
  closeBtn.addEventListener('click', closeModal);

  // Close modal on overlay click
  const overlay = modalEl.querySelector('.modal__overlay');
  if (overlay) overlay.addEventListener('click', closeModal);

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
      closeModal();
    }
  });
}



/* ---------- Modify cast card position property feature ---------- */
const cards = document.querySelectorAll('.cast__card');

cards.forEach((card, index) => {
  card.style.setProperty('--index', index);
});



/* ---------- Video on and off feature ---------- */
/**
 * Auto-play and pause background videos in sections when they enter/exit viewport
 * @param {NodeListOf<HTMLElement>} sections - sections containing videos
 * @param {string} videoSelector - selector for video element inside each section (default: '.bg-video')
 * @param {number} threshold - intersection threshold (default: 0.15)
 */
export function initSectionVideos(sections, videoSelector = '.bg-video', threshold = 0.15) {
  if (!sections || sections.length === 0) return;

  let currentlyPlayingVideo = null;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const video = entry.target.querySelector(videoSelector);
        if (!video) return;

        if (entry.isIntersecting) {
          // Pause previous video
          if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
            currentlyPlayingVideo.pause();
          }

          entry.target.classList.add('is-active');
          currentlyPlayingVideo = video;
          video.play();
        } else {
          entry.target.classList.remove('is-active');
          video.pause();
        }
      });
    },
    { threshold }
  );

  sections.forEach(section => observer.observe(section));
}



// /* ---------- Background Images ---------- */
/**
 * Sets background images for multiple sections
 * @param {Array<{id: string, url: string}>} backgrounds - array of objects with section ID and image URL
 */
export function setSectionBackgrounds(backgrounds) {
  if (!backgrounds || !Array.isArray(backgrounds)) return;

  backgrounds.forEach(bg => {
    const section = document.getElementById(bg.id);
    if (section) {
      section.style.backgroundImage = `url('${bg.url}')`;
      section.style.backgroundSize = 'cover';       // optional
      section.style.backgroundPosition = 'center';  // optional
      section.style.backgroundRepeat = 'no-repeat'; // optional
    }
  });
}
