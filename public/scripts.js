const Mask = {
  apply(input, func) {
    setTimeout(() => {
      input.value = Mask[func](input.value)
    }, 1)
  },
  formatBRL(value) {
    value = value.replace(/\D/g, "")

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value/100)
  },
}

// Delete confirmation
const formDelete = document.querySelector('#form-delete')
if(formDelete) {
  formDelete.addEventListener("submit", (event) => {
    const confirmation = confirm("Deseja deletar?")
    if(!confirmation) {
    event.preventDefault()
    }
  })
}