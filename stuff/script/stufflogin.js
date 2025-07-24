let staffData = [];

fetch("../json/stuff-data.json")
  .then(response => {
    if (!response.ok) throw new Error("Veri alınamadı!");
    return response.json();
  })
  .then(data => {
    staffData = data;
  })
  .catch(error => {
    console.error("Hata:", error);
  });

document.getElementById("stuffLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const input = document.getElementById("loginInput").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const message = document.getElementById("loginMessage");

  const matched = staffData.find(staff =>
    (staff.email.toLowerCase() === input ||
     staff.stuffNo === input ||
     staff.nameSurname.toLowerCase() === input) &&
    staff.password === password
  );

  if (matched) {
    localStorage.setItem("activeStuffUserId", matched.stuffNo); // sadece ID tutuyoruz
    message.style.color = "green";
    message.textContent = `Hoş geldiniz, ${matched.nameSurname}`;

    setTimeout(() => {
      window.location.href = "../html/admin.html";
    }, 1000);
  } else {
    message.style.color = "red";
    message.textContent = "Giriş başarısız! Bilgilerinizi kontrol edin.";
  }
});

// Şifremi unuttum bölümü kodu aynı kalabilir (dilersen sonradan ekleriz)
