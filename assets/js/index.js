const toggleBtn = document.querySelector('.toggle__btn')
const toggleBtnIcon = document.querySelector('.toggle__btn i')
const dropDownMenu = document.querySelector('.dropdown__menu')
const darkModeToggle = document.getElementById('toggle-darkmode')
const DARK_MODE_CLASS = 'darkmode'

toggleBtn.addEventListener('click', () => {
  dropDownMenu.classList.toggle('open')
})

darkModeToggle.addEventListener('click', () => {
  const bdy = document.getElementsByTagName('body')[0]

  if (!bdy) return

  if (bdy.classList.contains(DARK_MODE_CLASS)) {
    bdy.classList.remove(DARK_MODE_CLASS)
  } else {
    bdy.classList.add(DARK_MODE_CLASS)
  }
})

