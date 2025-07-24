fetch("department/deep-page-management.html")
  .then(res => res.text())
  .then(data => {
    const container = document.getElementById("page-management-container");
    if (container) {
      container.innerHTML = data;
    } else {
      console.error("page-management-container bulunamadı!");
    }
  })
  .catch(err => console.error("Sayfa yönetimi yüklenemedi:", err));
