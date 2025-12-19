// =======================================================
//  Chapter Reader Script for ImpelComics
//  Works for both Sugarhill & Gamma of Hearts
// =======================================================

// ----------------------------
// 🖼️ Carousel / Homepage logic
// ----------------------------
document.addEventListener('DOMContentLoaded', () => {
  console.log('Chapter reader loaded!');

  const carouselElement = document.querySelector('#chapterCarousel');
  if (carouselElement) {
    const carousel = new bootstrap.Carousel(carouselElement, {
      interval: false,
      ride: false,
      wrap: false
    });

    const pages = carouselElement.querySelectorAll('.carousel-item');
    const slider = document.getElementById('pageSlider');
    const pageCount = document.getElementById('pageCount');
    const nextChapterBtn = document.getElementById('nextChapterBtn');

    if (slider && pages.length > 0) slider.max = pages.length;

    function updateUI(index) {
      if (!slider || !pageCount) return;
      slider.value = index + 1;
      pageCount.textContent = `Page ${index + 1} of ${pages.length}`;
      if (nextChapterBtn) {
        nextChapterBtn.style.display =
          index === pages.length - 1 ? 'inline-block' : 'none';
      }
    }

    updateUI(0);

    carouselElement.addEventListener('slid.bs.carousel', () => {
      const activeIndex = [...pages].findIndex(item => item.classList.contains('active'));
      updateUI(activeIndex);
    });

    if (slider) {
      slider.addEventListener('change', () => {
        carousel.to(parseInt(slider.value) - 1);
      });
    }
  }

  // Optional: For modal-based chapter loading
  document.querySelectorAll('.open-chapter').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const chapter = btn.getAttribute('data-chapter');
      document.getElementById('chapterFrame').src = `/HTML/Sugarhill Chp/${chapter}.html`;
      new bootstrap.Modal(document.getElementById('readerModal')).show();
    });
  });
});


// ----------------------------
// ✨ Typing animation & forms
// ----------------------------
document.addEventListener('DOMContentLoaded', () => {
  const text = "Welcome to Impel Comics!";
  const target = document.getElementById("typedHeading");
  let index = 0;

  if (target) {
    setTimeout(() => {
      const typeInterval = setInterval(() => {
        target.textContent += text.charAt(index);
        index++;
        if (index >= text.length) clearInterval(typeInterval);
      }, 75);
    }, 1500);
  }

  const form = document.getElementById('newsletterForm');
  const thankYou = document.getElementById('thankYouMessage');
  const dropdown = document.getElementById('newsletterDropdown');
  const container = document.getElementById('newsletterSignup');

  if (form && thankYou) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('d-none');
      thankYou.classList.remove('d-none');
    });
  }

  if (dropdown) {
    dropdown.addEventListener('shown.bs.collapse', () => {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});


// ----------------------------
// 🔽 Read Now Dropdown Toggle
// ----------------------------
document.addEventListener('DOMContentLoaded', () => {
  const readNowBtn = document.getElementById('readNowBtn');
  const chapterDropdown = document.querySelector('.chapter-dropdown');

  if (readNowBtn && chapterDropdown) {
    readNowBtn.addEventListener('click', () => {
      chapterDropdown.style.display =
        chapterDropdown.style.display === 'none' ? 'flex' : 'none';
    });
  }
});


// ------------------------------------------------------
// 📖 Comic Reader Logic (keeps "page (1).jpg" filenames)
// ------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('comicPage');
  if (!img) return; // not a chapter page

  const body = document.body;
  const series = (body.dataset.series || '').toLowerCase();
  const chapter = body.dataset.chapter;
  const totalPages = parseInt(body.dataset.totalPages, 10);

  let currentPage = 1;

  let basePath;

  switch (series) {
    case 'gammaofhearts':
      // REAL folder: IMG/gammaofhearts/Chapters/Ch1/page (1).jpg
      basePath = '/IMG/gammaofhearts/Chapters/Ch';
      break;

    case 'sugarhill':
      basePath = '/IMG/SH_Chapters/ch';
      break;

    default:
      console.warn('Unknown series:', series);
      return;
  }

  function updatePage() {
    // Keep filenames EXACTLY as-is: page (1).jpg
    img.src = `${basePath}${chapter}/page (${currentPage}).jpg`;

    const pageNumber = document.getElementById('pageNumber');
    if (pageNumber) {
      pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
    }

    console.log('Loading image:', img.src);
  }

  // Navigation
  window.nextPage = () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePage();
    }
  };

  window.prevPage = () => {
    if (currentPage > 1) {
      currentPage--;
      updatePage();
    }
  };

  // Init
  updatePage();
});
