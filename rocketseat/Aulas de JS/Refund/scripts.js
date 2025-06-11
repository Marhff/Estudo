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
    
    //Adiciona informaçåoes no item
    expenseItem.append(expenseIcon)

    //Adiciona o item na lista 
    expenseList.append(expenseItem)

  }catch (error){
    alert ("Não foi possível Atualizar a lista de despesas.")
    console.log(error)
    }
 }