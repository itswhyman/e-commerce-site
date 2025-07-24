 fetch('../html/department/navbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
      })
      .catch(err => console.error('Navbar yüklenirken hata:', err));
 
 
 
 window.addEventListener('scroll', function () {
        const image = document.querySelector('.scroll-fade');
        const maxScroll = 300; // 300px scrolldan sonra minimum opaklık
        const scrollY = window.scrollY;

        let opacity = 1 - scrollY / maxScroll;
        if (opacity < 0.2) opacity = 0.2; // En fazla ne kadar silik olacağını sınırla

        image.style.opacity = opacity;
    });