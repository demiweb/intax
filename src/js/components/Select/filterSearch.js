export default function filterSearch(input, list) {
  if (!input) return

  input.addEventListener('input', e => {
    const filter = e.currentTarget.value.toUpperCase()

    list.forEach(option => {
      const textValue = option.innerText

      if (textValue.toUpperCase().indexOf(filter) > -1) {
        option.style.display = ''
      } else {
        option.style.display = 'none'
      }
    })
  })
}
