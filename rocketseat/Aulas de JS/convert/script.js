 const amount = document.getElementById("amount");

 amount.addEventListener("input", () => {
  const hasCharacterRegex = /\D+/g
  amount.value = amount.value. replace(hasCharacterRegex, "");

 });