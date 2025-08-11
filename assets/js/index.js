const toggleBtn = document.querySelector('.toggle__btn')
const toggleBtnIcon = document.querySelector('.toggle__btn i')
const dropDownMenu = document.querySelector('.dropdown__menu')
const darkModeToggle = document.getElementById('toggle-darkmode')
const DARK_MODE_CLASS = 'darkmode'
const presetDarkMode = localStorage.getItem(DARK_MODE_CLASS)
const bdy = document.getElementsByTagName('body')[0]

toggleBtn.addEventListener('click', () => {
  dropDownMenu.classList.toggle('open')
})

if (presetDarkMode === 'active') bdy.classList.add(DARK_MODE_CLASS)
else localStorage.setItem(DARK_MODE_CLASS, null)

darkModeToggle.addEventListener('click', () => {
  if (!bdy) return

  if (bdy.classList.contains(DARK_MODE_CLASS)) {
    bdy.classList.remove(DARK_MODE_CLASS)
    localStorage.setItem(DARK_MODE_CLASS, null)
  } else {
    bdy.classList.add(DARK_MODE_CLASS)
    localStorage.setItem(DARK_MODE_CLASS, 'active')
  }
})
