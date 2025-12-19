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
// 📖 Comic Reader Logic (Shared for all comic series)
// ------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const chapter = body.dataset.chapter;
  const totalPages = parseInt(body.dataset.totalPages);
  const series = (body.dataset.series || '').toLowerCase();
  let currentPage = 1;

  const img = document.getElementById('comicPage');
  const pageSlider = document.getElementById('pageSlider');
  const pageNumber = document.getElementById('pageNumber');
  const pageCount = document.getElementById('pageCount');
  const nextChapterBtn = document.getElementById('nextChapterBtn');

  // ✅ Determine correct folder and file format
  let basePath;
  let useEncodedNames = false;

  switch (series) {
    case 'gammaofhearts':
      basePath = '/IMG/Gamma of Hearts/Chapters/Ch';
      useEncodedNames = true; // Gamma uses spaces and parentheses
      break;
    case 'sugarhill':
      basePath = '/IMG/SH_Chapters/ch';
      break;
    default:
      console.warn('No valid data-series found; defaulting to Sugarhill.');
      basePath = '/IMG/SH_Chapters/ch';
  }

  function updatePage() {
    if (!img) return;

    // Gamma uses "page (1).jpg" etc. → must URL-encode
    const encodedName = useEncodedNames
      ? `page%20%28${currentPage}%29.jpg`
      : `page-${currentPage}.jpg`;

    img.src = `${basePath}${chapter}/${encodedName}`;
    console.log("Loading image from:", img.src);

    if (pageNumber)
      pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
    if (pageSlider) pageSlider.value = currentPage;
    if (pageCount)
      pageCount.textContent = `Page ${currentPage} of ${totalPages}`;
    if (nextChapterBtn) {
      nextChapterBtn.style.display =
        currentPage === totalPages ? 'inline-block' : 'none';
    }
  }

  // 🔹 Next / Prev navigation
  window.nextPage = function () {
    if (currentPage < totalPages) {
      currentPage++;
      updatePage();
    }
  };

  window.prevPage = function () {
    if (currentPage > 1) {
      currentPage--;
      updatePage();
    }
  };

  // 🔹 Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') prevPage();
  });

  // 🔹 Slider control
  if (pageSlider) {
    pageSlider.addEventListener('input', (e) => {
      currentPage = parseInt(e.target.value);
      updatePage();
    });
  }

  // 🔹 Initialize
  updatePage();
});
