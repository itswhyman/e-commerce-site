function kontrolEt() {
      if (localStorage.getItem("hesapAcilmis") === "evet") {
        // Daha önce hesap açılmış → normal login
        window.location.href = "html/main.html";
        console.log("açtın");
      } else {
        // İlk kez giriş yapacak → first login
        window.location.href = "html/FirstLogin.html";
        console.log("açmadın");
        
      }
    }
    //bu alt satırda navbar.htmlden navbarın tüm fetaylarını import ediyoruz 
    fetch('department/navbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
      })
      .catch(err => console.error('Navbar yüklenirken hata:', err));
  window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrollY = window.scrollY || window.pageYOffset;

  // Örneğin, 0px'den 200px'e kadar scroll olunca opacity 1'den 0.2'ye düşsün
  let opacity = 1;

  if(scrollY > 200) {
    opacity = 0.2;  // tamamen saydam değil, biraz görünürlük bıraktım
  } else {
    opacity = 1 - scrollY / 200; // scroll arttıkça opacity azalıyor
  }

  navbar.style.opacity = opacity;
});
 window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrollY = window.scrollY || window.pageYOffset;

  // Örneğin, 0px'den 200px'e kadar scroll olunca opacity 1'den 0.2'ye düşsün
  let opacity = 1;

  if(scrollY > 400) {
    opacity = 0.01;  // tamamen saydam değil, biraz görünürlük bıraktım
  } else {
    opacity = 1 - scrollY / 500; // scroll arttıkça opacity azalıyor
  }

  navbar.style.opacity = opacity;
});
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const scrollTop = window.scrollY;

  if (scrollTop > 200) {
    navbar.style.opacity = 0;
    navbar.style.pointerEvents = 'none'; // Görünmezken tıklanmasın
  } else {
    navbar.style.opacity = 1;
    navbar.style.pointerEvents = 'auto'; // Görünürken tıklanabilir
  }
});
fetch("department/info-bar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("info-bar-container").innerHTML = data;
    })
    .catch(err => console.error("Info bar yüklenemedi:", err));