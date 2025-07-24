fetch('../html/department/navbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
      })
      .catch(err => console.error('Navbar yüklenirken hata:', err));
async function loadCart() {
  try {
    const res = await fetch('../data/userData.json');
    const data = await res.json();

    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    data.cart.forEach(item => {
      const card = document.createElement('div');
      card.className = 'cart-card';
      card.dataset.price = item.price;
      card.dataset.id = item.id;
      card.innerHTML = `
        <div class="card-img">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="card-info">
          <h3>${item.name}</h3>
          <p>${item.category} - ${item.description}</p>
          <div class="price">Price: $${item.price.toFixed(2)}</div>
          <div class="quantity">
            <label>Qty:</label>
            <input type="number" class="qty-input" min="1" value="${item.quantity}" />
          </div>
          <div class="rating">${createRating(item.rating)}</div>
          <button class="remove-btn">Remove</button>
        </div>
      `;
      cartContainer.appendChild(card);
    });

    attachEventListeners();

    updateTotal();

  } catch (e) {
    console.error('Sepet yüklenirken hata:', e);
  }
}

function createRating(rating) {
  let stars = '';
  for(let i=1; i<=5; i++) {
    stars += `<i class="fa${i <= rating ? '-solid' : '-regular'} fa-star"></i>`;
  }
  return stars;
}

function attachEventListeners() {
  // Miktar değişince toplam güncelle
  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', e => {
      if(e.target.value < 1) e.target.value = 1;
      updateTotal();
      // Burada server'a güncelleme yapılabilir
    });
  });

  // Ürün çıkarma
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.target.closest('.cart-card').remove();
      updateTotal();
      // Burada server'a güncelleme yapılabilir
    });
  });
}

function updateTotal() {
  let subtotal = 0;
  document.querySelectorAll('.cart-card').forEach(card => {
    const price = parseFloat(card.dataset.price);
    const qty = parseInt(card.querySelector('.qty-input').value);
    subtotal += price * qty;
  });
  document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById('total').innerText = `$${subtotal.toFixed(2)}`;
}

window.addEventListener('DOMContentLoaded', loadCart);


fetch("department/info-bar.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("info-bar-container").innerHTML = data;
    })
    .catch(err => console.error("Info bar yüklenemedi:", err));