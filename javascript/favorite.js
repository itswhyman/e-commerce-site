fetch('../html/department/navbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
      })
      .catch(err => console.error('Navbar yüklenirken hata:', err));
    // Favorileri JSON'dan yükle
    async function loadFavorites() {
      try {
        const res = await fetch('../data/userData.json');
        const data = await res.json();

        const favContainer = document.getElementById('favorites-items');
        favContainer.innerHTML = '';

        data.favorites.forEach(item => {
          const card = document.createElement('div');
          card.className = 'cart-card';
          card.innerHTML = `
            <div class="card-img">
              <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="card-info">
              <h3>${item.name}</h3>
              <p>${item.category} - ${item.description}</p>
              <div class="price">Price: $${item.price.toFixed(2)}</div>
              <div class="rating">${createRating(item.rating)}</div>
              <button class="remove-btn">Remove</button>
            </div>
          `;
          favContainer.appendChild(card);
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
          btn.addEventListener('click', e => {
            e.target.closest('.cart-card').remove();
            // Burada API çağrısı ile sunucudan da silinebilir
          });
        });

      } catch (e) {
        console.error('Favoriler yüklenirken hata:', e);
      }
    }

    function createRating(rating) {
      let stars = '';
      for(let i=1; i<=5; i++) {
        stars += `<i class="fa${i <= rating ? '-solid' : '-regular'} fa-star"></i>`;
      }
      return stars;
    }

    window.addEventListener('DOMContentLoaded', loadFavorites);
  

    fetch("department/info-bar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("info-bar-container").innerHTML = data;
    })
    .catch(err => console.error("Info bar yüklenemedi:", err));