//Seleciona os elementos do formulário.
const form =document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista 

const expenseList = document.querySelector("ul")


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

//Adiciona Informação no item
expenseItem.append(expenseIcon, expenseInfo)


 //Adiciona o Item a lista 
 expenseList.append(expenseItem)
 
  }catch (error){
    alert ("Não foi possível Atualizar a lista de despesas.")
    console.log(error)
    }
 }