//Seleciona os elementos do formulário.
const form =document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista 

const expenseList = document.querySelector("ul")
const expenseTotal = document.querySelector("aside header h2")
const expenseQuantity = document.querySelector ("aside header p span")


amount.oninput = () => {
  //Obtem o valor atual do input e remove os caracteresnao numericos 
let value = amount.value.replace(/\D/g, "")

//Transforma o valor em centavos
value = Number(value) / 100


//Atualiza o valor do input
  amount.value = formatCurrencyBRL(value)
}

 function formatCurrencyBRL(value){
  //Formata o valor no padrão BRL
  value = value.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
  })

  return value 

 }

 form.onsubmit = ("submit", (event) => {
  event.preventDefault()

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }
  //chama a funçao de add o item na lista 
  expenseAdd(newExpense) 
})

 function expenseAdd(newExpense){
  try{
    //Cria elementos para add na lista
    const expenseItem = document.createElement("li")
    expenseItem.classList.add ("expense")

    //Cria icone da categoria 
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)
    
// Cria info da dispensa
const expenseInfo = document.createElement("div")
 expenseInfo.classList.add("expense-info")

 //Criar o nome da lista
 const expenseName = document.createElement("strong")
 expenseName.textContent = newExpense.expense


 //Cria a categoria da despesa 
 const expenseCategory = document.createElement("span")
 expenseCategory.textContent = newExpense.category_name

 
 
 //Adiciona nome e categoria na div 
 expenseInfo.append(expenseName, expenseCategory)
 
 //Cria valor da despesa 
 const expenseAmount = document.createElement("span")
 expenseAmount.classList.add("expense-amount")
 expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
  .toUpperCase()
  .replace("R$", "")}`

  //Criar icone de remover
const removeIcon = document.createElement("img")
removeIcon.classList.add("remove-icon")
removeIcon.setAttribute("src", "img/remove.svg")
removeIcon.setAttribute("alt", "remover")


//Adiciona Informação no item
expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)


 //Adiciona o Item a lista 
 expenseList.append(expenseItem)

 //Limpa o formulário
  clearForm()

 //Atualiza os totais 
 updateTotals()
  }catch (error){
    alert ("Não foi possível tualizar a lista de despesas.")
    console.log(error)
    }
 }

 function updateTotals(){
  try {
    const items = expenseList.children
    expenseQuantity.textContent = `${items.length} ${
    items.length > 1 ? "despesas" : "despesa"
    }`


 //Incrementar total
let total = 0

for(let item = 0;  item < items.length; item++) {
    const itemAmount = items[item].querySelector(".expense-amount")
    // Extrai apenas números e vírgula
    let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")
    value = parseFloat(value)
    if(isNaN(value)) {
        return alert("Erro ao calcular o total. O valor não parece ser um número.")
    }
    total += value
}

expenseTotal.textContent = total

//criar span par adicionar o RS
const symbolBRL = document.createElement("small")
symbolBRL.textContent = "R$"

total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")
expenseTotal.innerHTML = ""
expenseTotal.append(symbolBRL, total)

  } catch (error) {
    console.log(erro)
    alert ("Erro ao atualizar totais")   
  }
 }

 expenseList.onclick = (event) => {
  if(event.target.classList.contains("remove-icon")){
    const expenseItem = event.target.closest(".expense")
    expenseItem.remove()
    updateTotals()
  }
 }

 function clearForm() {
  amount.value = ""
  expense.value = ""
  category.value = ""
  expense.focus()
 }