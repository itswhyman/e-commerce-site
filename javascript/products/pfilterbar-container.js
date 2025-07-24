(function initFilterEvents() {
  const filterMenu = document.getElementById("filterMenu");
  const sortMenu = document.getElementById("sortMenu");
  const filterBtn = document.getElementById("filterButton");
  const sortBtn = document.getElementById("sortButton");
  const resetBtn = document.getElementById("resetFilters");
  const colorDots = document.querySelectorAll("#filterMenu .color-dot");
  const selectBoxes = document.querySelectorAll("#filterMenu select");
  const priceMin = document.getElementById("priceMin");
  const priceMax = document.getElementById("priceMax");
  const applyFilterBtn = document.getElementById("applyFilterBtn");
  const applySortBtn = document.getElementById("applySortBtn");

  // Filtre menüsünü aç/kapat
  if (filterBtn && filterMenu && sortMenu) {
    filterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.getComputedStyle(sortMenu).display === "flex") {
        sortMenu.style.display = "none";
      }
      filterMenu.style.display = filterMenu.style.display === "flex" ? "none" : "flex";
    });
  }

  // Sıralama menüsünü aç/kapat
  if (sortBtn && filterMenu && sortMenu) {
    sortMenu.style.display = "none";
    sortBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.getComputedStyle(filterMenu).display === "flex") {
        filterMenu.style.display = "none";
      }
      sortMenu.style.display = sortMenu.style.display === "flex" ? "none" : "flex";
    });
  }

  // Dışarı tıklanınca menüleri kapat
  document.addEventListener("click", (event) => {
    if (
      filterMenu && filterBtn &&
      !filterMenu.contains(event.target) &&
      !filterBtn.contains(event.target)
    ) {
      filterMenu.style.display = "none";
    }

    if (
      sortMenu && sortBtn &&
      !sortMenu.contains(event.target) &&
      !sortBtn.contains(event.target)
    ) {
      sortMenu.style.display = "none";
    }
  });

  // Renk seçimlerine tıklanınca aktiflik ekle
  colorDots?.forEach((dot) => {
    dot.addEventListener("click", () => {
      dot.classList.toggle("active");
    });
  });

  // Filtreleri sıfırla
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      selectBoxes?.forEach((select) => {
        select.value = "choose";
      });

      colorDots?.forEach((dot) => dot.classList.remove("active"));

      if (priceMin) priceMin.value = "0";
      if (priceMax) priceMax.value = "0";

      document.querySelectorAll('#filterMenu input[type="checkbox"]').forEach(cb => cb.checked = false);
    });
  }

  // Filtrele butonuna basınca
  if (applyFilterBtn) {
    applyFilterBtn.addEventListener("click", () => {
      const selectedColors = Array.from(colorDots)
        .filter(dot => dot.classList.contains("active"))
        .map(dot => dot.style.backgroundColor);

      const kategori = document.getElementById("kategori")?.value || "";
      const marka = document.getElementById("marka")?.value || "";
      const tur = document.getElementById("tur")?.value || "";
      const size = document.getElementById("size")?.value || "";
      const minPrice = priceMin?.value || "0";
      const maxPrice = priceMax?.value || "0";

      alert(
        `Filtreler:\nKategori: ${kategori}\nMarka: ${marka}\nTür: ${tur}\nBeden: ${size}\n` +
        `Renkler: ${selectedColors.join(", ")}\nFiyat: ${minPrice} - ${maxPrice} ₺`
      );
    });
  }

  // Sırala butonuna basınca
  if (applySortBtn) {
    applySortBtn.addEventListener("click", () => {
      const sortValue = document.getElementById("sortSelect")?.value || "";
      alert(`Sıralama: ${sortValue}`);
    });
  }
})();
