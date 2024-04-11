const toggleBtn = document.querySelector('.toggle__btn')
const toggleBtnIcon = document.querySelector('.toggle__btn i')
const dropDownMenu = document.querySelector('.dropdown__menu')

toggleBtn.addEventListener('click', () => {
  dropDownMenu.classList.toggle('open')
})
