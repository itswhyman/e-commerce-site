
// 🔹 Ürün kartlarını (JSON’dan) yükle
document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/card.json")
    .then(res => res.json())
    .then(data => renderCards(data))
    .catch(err => console.error("Veri yüklenemedi:", err));
});

function renderCards(cardsData) {
  const container = document.getElementById("card-container");

  cardsData.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
      <div class="card-header">
        <h3>${card.title}</h3>
        <span>${card.gender}</span>
        <p>${card.description}</p>
      </div>
      <div class="card-img">
        <img src="${card.imageUrl}" alt="${card.title}" class="img">
        <i class="fa-regular fa-heart"></i>
      </div>
      <div class="card-details">
        <div class="price"><p>Price:</p><strong>${card.price}</strong></div>
        <div class="rating">
            ${[1, 2, 3, 4, 5].map(i => {
            if (card.rating >= i) return '<i class="fa-solid fa-star"></i>';
            else if (card.rating >= i - 0.5) return '<i class="fa-solid fa-star-half-stroke"></i>';
            else return '<i class="fa-regular fa-star"></i>';
            }).join('')}
        </div>
        <div class="card-footer">
          <a href="#"><i class="fa-solid fa-wallet"></i> Buy</a>
          <a href="#">Add cart</a>
        </div>
      </div>
    `;
    container.appendChild(cardElement);
  });
}