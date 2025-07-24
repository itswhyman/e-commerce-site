 function kayitOl() {
            // Normalde burada verileri sunucuya gönderirsin.
    
            // Tarayıcıya "hesap açıldı" bilgisini kaydet
            localStorage.setItem("hesapAcilmis", "evet");

            // Giriş sayfasına yönlendir
            window.location.href = "normalLogin.html";
            return false; // sayfanın yeniden yüklenmesini engeller
  }