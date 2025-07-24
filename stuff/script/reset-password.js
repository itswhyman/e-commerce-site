let currentUserIndex = null;

document.getElementById("verifyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nameSurname = document.getElementById("nameSurname").value.trim();
  const birthDate = document.getElementById("birthDate").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  fetch("../json/stuff-data.json")
    .then(res => res.json())
    .then(data => {
      const foundIndex = data.findIndex(user =>
        user.nameSurname === nameSurname &&
        user.birthDate === birthDate &&
        user.email === email &&
        user.phone === phone
      );

      if (foundIndex !== -1) {
        currentUserIndex = foundIndex;
        document.getElementById("verifyForm").hidden = true;
        document.getElementById("newPassForm").hidden = false;
        document.getElementById("message").textContent = "Kimlik doğrulandı. Lütfen yeni şifrenizi girin.";
      } else {
        document.getElementById("message").textContent = "Bilgiler eşleşmedi!";
      }
    })
    .catch(err => {
      document.getElementById("message").textContent = "Bir hata oluştu: " + err.message;
    });
});

document.getElementById("newPassForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (newPassword !== confirmPassword) {
    document.getElementById("message").textContent = "Şifreler eşleşmiyor!";
    return;
  }

  fetch("../json/stuff-data.json")
    .then(res => res.json())
    .then(data => {
      if (currentUserIndex !== null) {
        data[currentUserIndex].password = newPassword;

        // localStorage'a yazılıyor, çünkü JSON dosyasına doğrudan yazılamaz
        localStorage.setItem("stuffData", JSON.stringify(data));

        document.getElementById("message").textContent = "Şifre başarıyla güncellendi!";
        setTimeout(() => {
          window.location.href = "stufflogin.html";
        }, 2000);
      }
    })
    .catch(err => {
      document.getElementById("message").textContent = "Bir hata oluştu: " + err.message;
    });
});
