async function loadImages() {
  try {
    const response = await fetch('../data/main-images.json');
    if (!response.ok) throw new Error('main-images.json yüklenirken hata: ' + response.status);
    const data = await response.json();

    const sliderContainer = document.getElementById('slider-container');
    const seasonProducts = document.getElementById('season-products');
    const discountProducts = document.getElementById('discount-products');

    // Slider görselleri ekle
    data.slider.forEach((item, index) => {
      const img = document.createElement('img');
      img.src = item.filename;
      img.alt = item.alt;
      if (index === 0) img.classList.add('active');
      sliderContainer.appendChild(img);
    });

    // Yeni sezon ürünleri ekle
    data.season.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `<img src="${item.filename}" alt="${item.alt}" /><p>${item.alt}</p>`;
      seasonProducts.appendChild(card);
    });

    // İndirimli ürünler ekle
    data.discount.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `<img src="${item.filename}" alt="${item.alt}" /><p>${item.alt}</p>`;
      discountProducts.appendChild(card);
    });

    // Slider otomatik geçiş fonksiyonu
    let current = 0;
    const slides = sliderContainer.querySelectorAll('img');

    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 3000);

  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', loadImages);

const sliderContainer = document.getElementById('slider-container');
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');

let currentIndex = 0;
let slides = [];
let slideInterval;

function createSlides(images) {
  images.forEach((img, index) => {
    const imageElement = document.createElement('img');
    imageElement.src = img.filename;
    imageElement.alt = img.alt;
    imageElement.classList.add('slide');
    if (index === 0) imageElement.classList.add('active');
    sliderContainer.appendChild(imageElement);
  });
  slides = document.querySelectorAll('#slider-container img');
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  currentIndex = index;
}

function nextSlide() {
  let nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}

function prevSlide() {
  let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(prevIndex);
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 6000);
}

// JSON’dan slider görsellerini yükle
fetch('../data/main-images.json')
  .then(response => {
    if (!response.ok) throw new Error("JSON dosyası yüklenemedi");
    return response.json();
  })
  .then(data => {
    createSlides(data.slider);
    slideInterval = setInterval(nextSlide, 6000);
  })
  .catch(err => {
    console.error("main-images.json yüklenirken hata:", err);
  });

// Ok butonlarına event ekle
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetInterval();
});
