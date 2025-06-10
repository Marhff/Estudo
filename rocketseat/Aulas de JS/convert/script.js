const USD = 5.54
const EUR = 6.35
const GBP = 7.52


const form = document.querySelector("form")
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer")
const description = document.getElementById("description")

 amount.addEventListener("input", () => {
  const hasCharacterRegex = /\D+/g
  amount.value = amount.value. replace(hasCharacterRegex, "");
 })

 form.onsubmit = (event) => {
  event.preventDefault()
  switch (currency.value){
    case "USD":
      convertCurrency(amount.value,USD,"US$")
      break
    case "EUR":
      convertCurrency(amount.value,EUR,"€")
      break
    case "GBP":
      convertCurrency(amount.value,GBP,"£")
      break
  }
 }

 function convertCurrency(amount, price,symbol){
try {
  description.textContent = `${symbol}1 = ${formatCurrencyBRL(price)}`

  //Calcula o total
  let total = amount * price
  total = formatCurrencyBRL(total).replace("R$", "")

  //Mostra o resultado total
  result.textContent = `${total} Reais` 

  footer.classList.add("show-result")
} catch (error) {
  console.log (error)
  footer.classList.remove("show-result") 
}

 }

 function formatCurrencyBRL (value){
  return value.toLocaleString("pt-BR", 
    {style: "currency",
     currency: "BRL"
    })
 }
  