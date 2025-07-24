
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("privacyPopup");
  const acceptBtn = document.getElementById("acceptPrivacy");

  // Kullanıcı daha önce kabul etmiş mi?
  if (!localStorage.getItem("privacyAccepted")) {
    popup.style.display = "flex";
  }

  // Kabul etme tuşu
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("privacyAccepted", "true");
    popup.style.display = "none";
  });
});
