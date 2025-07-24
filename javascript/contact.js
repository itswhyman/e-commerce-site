fetch('../html/department/navbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
      })
      .catch(err => console.error('Navbar yüklenirken hata:', err));
  
      const leftBox = document.querySelector(".left");
leftBox.style.backgroundImage = 'url("../foto/logo2.png")';