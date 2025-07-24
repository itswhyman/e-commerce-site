
    const accountBtn = document.getElementById("accountBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const accountSection = document.getElementById("account-section");
    const mainPanel = document.getElementById("main-panel");
    const backToMainBtn = document.getElementById("backToMainBtn");
    const activeStuffUserId = localStorage.getItem("activeStuffUserId");

    if (!activeStuffUserId) {
      window.location.href = "../stufflogin.html"; // Oturum yoksa giriş sayfasına yönlendir
    }

    // JSON'dan kullanıcı verilerini al
    fetch("../json/stuff-data.json")
      .then(res => {
        if (!res.ok) throw new Error("Veri yüklenemedi!");
        return res.json();
      })
      .then(data => {
        const user = data.find(u => u.stuffNo === activeStuffUserId);
        if (!user) throw new Error("Kullanıcı bulunamadı!");

        document.getElementById("stuffNo").value = user.stuffNo;
        document.getElementById("nameSurname").value = user.nameSurname;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;
        document.getElementById("birthDate").value = user.birthDate;
        document.getElementById("password").value = user.password;
      })
      .catch(err => {
        alert("Hata: " + err.message);
      });

    // Form gönderimi
    document.getElementById("admin-form").addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Bilgiler güncellendi (şimdilik sadece görsel olarak).");
    });

    // Profil resmi yükleme
    const uploadInput = document.getElementById("uploadPic");
    const profilePic = document.getElementById("profilePic");

    uploadInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profilePic.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    // Şifre göster/gizle
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    togglePassword.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      togglePassword.textContent = type === "password" ? "👁️" : "🙈";
    });

    // Sayfa geçişleri
    accountBtn.addEventListener("click", () => {
      accountSection.classList.remove("hidden");
      mainPanel.style.display = "none";
    });

    backToMainBtn.addEventListener("click", () => {
      accountSection.classList.add("hidden");
      mainPanel.style.display = "block";
    });

    // Çıkış
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("activeStuffUserId");
      window.location.href = "stufflogin.html";
    });