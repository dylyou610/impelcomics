// Chapter Reader Script for ImpelComics

document.addEventListener('DOMContentLoaded', () => {
  console.log('Chapter reader loaded!');

  const carouselElement = document.querySelector('#chapterCarousel');
  const carousel = new bootstrap.Carousel(carouselElement, {
    interval: false,
    ride: false,
    wrap: false
  });

  const pages = carouselElement.querySelectorAll('.carousel-item');
  const slider = document.getElementById('pageSlider');
  const pageCount = document.getElementById('pageCount');
  const nextChapterBtn = document.getElementById('nextChapterBtn');

  // Dynamically set max slider value based on number of pages
  slider.max = pages.length;

  function updateUI(index) {
    slider.value = index + 1;
    pageCount.textContent = `Page ${index + 1} of ${pages.length}`;

    // Show "Next Chapter" button only on last page
    if (index === pages.length - 1) {
      nextChapterBtn.style.display = 'inline-block';
    } else {
      nextChapterBtn.style.display = 'none';
    }
  }

  // Initialize UI with the first page
  updateUI(0);

  // Update UI when carousel slide changes
  carouselElement.addEventListener('slid.bs.carousel', () => {
    const activeIndex = [...pages].findIndex(item => item.classList.contains('active'));
    updateUI(activeIndex);
  });

  // Update carousel when slider changes
  slider.addEventListener('change', () => {
    carousel.to(parseInt(slider.value) - 1);
  });

  // Optional: For modal-based chapter loading (keep or remove if unused)
  document.querySelectorAll('.open-chapter').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const chapter = btn.getAttribute('data-chapter');
      document.getElementById('chapterFrame').src = `/HTML/Sugarhill Chp/${chapter}.html`;
      new bootstrap.Modal(document.getElementById('readerModal')).show();
    });
  });
});


// Typing animation + Newsletter form logic

document.addEventListener('DOMContentLoaded', () => {
  const text = "Welcome to Impel Comics!";
  const target = document.getElementById("typedHeading");
  let index = 0;

  setTimeout(() => {
    const typeInterval = setInterval(() => {
      target.textContent += text.charAt(index);
      index++;
      if (index >= text.length) clearInterval(typeInterval);
    }, 75);
  }, 1500);

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


// 🔽 Read Now Button Toggle for Chapter List

document.addEventListener('DOMContentLoaded', () => {
  const readNowBtn = document.getElementById('readNowBtn');
  const chapterDropdown = document.querySelector('.chapter-dropdown');

  if (readNowBtn && chapterDropdown) {
    readNowBtn.addEventListener('click', () => {
      chapterDropdown.style.display = chapterDropdown.style.display === 'none' ? 'flex' : 'none';
    });
  }
});
