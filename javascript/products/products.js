// 🔹 Navbar'ı yükle
fetch('department/navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-container').innerHTML = data;
  })
  .catch(err => console.error('Navbar yüklenirken hata:', err));

// 🔹 Filtre & Sıralama barını (HTML + JS) yükle
fetch('department/pfilterbar-container.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('pfilterbar-container').innerHTML = html;

    // HTML yüklendikten sonra JavaScript dosyasını da yükle
    const script = document.createElement("script");
    script.src = "../javascript/products/pfilterbar-container.js"; // PATH'İNE GÖRE DÜZENLE!
    document.body.appendChild(script);
  })
  .catch(err => console.error('pfilterbar-container yüklenirken hata:', err));
fetch("department/info-bar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("info-bar-container").innerHTML = data;
    })
    .catch(err => console.error("Info bar yüklenemedi:", err));

// 🔹 Navbar scroll davranışı
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrollY = window.scrollY || window.pageYOffset;
  let opacity = 1;

  if (scrollY > 400) {
    opacity = 0.01;
  } else {
    opacity = 1 - scrollY / 500;
  }

  navbar.style.opacity = opacity;
});

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrollTop = window.scrollY;

  if (scrollTop > 200) {
    navbar.style.opacity = 0;
    navbar.style.pointerEvents = 'none';
  } else {
    navbar.style.opacity = 1;
    navbar.style.pointerEvents = 'auto';
  }
});
