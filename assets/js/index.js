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

// #region Project Toggle

const toggleText = document.querySelector('.toggle__text')

const [highlightedProjects, allProjects] = toggleText.children

toggleText.addEventListener('click', () => {
  highlightedProjects.classList.toggle('active')
  allProjects.classList.toggle('active')

  const projectsVisible = document.querySelector('.projects__visible')
  const projectsHidden = document.querySelector('.projects__hidden')

  if (!projectsVisible || !projectsHidden) return

  if (projectsVisible.style.display === 'none') {
    projectsVisible.style.display = 'grid'
    projectsHidden.style.display = 'none'
  } else {
    projectsVisible.style.display = 'none'
    projectsHidden.style.display = 'grid'
  }
})

// #endregion

// #region Certificates Carousel

const initializeCertificatesCarousel = () => {
  const carousel = document.querySelector('.certifications_carousel')
  if (!carousel) return

  const track = carousel.querySelector('.certifications__content')
  const cards = Array.from(track.querySelectorAll('.certificate'))
  const prevBtn = carousel.querySelector('.carousel-arrow-prev')
  const nextBtn = carousel.querySelector('.carousel-arrow-next')
  const dots = Array.from(carousel.querySelectorAll('.carousel-dots button'))

  const SWIPE_THRESHOLD = 50
  let currentIndex = 0
  let isDragging = false
  let startX = 0
  let startY = 0

  const next = () => {
    goToSlide(currentIndex + 1)
  }

  const prev = () => {
    goToSlide(currentIndex - 1)
  }

  const goToSlide = index => {
    currentIndex = ((index % cards.length) + cards.length) % cards.length
    const card = cards[currentIndex]
    const trackRect = track.getBoundingClientRect()
    const cardRect = card.getBoundingClientRect()
    const scrollTarget = card.offsetLeft - trackRect.width / 2 + cardRect.width / 2
    track.scrollTo({ left: scrollTarget, top: 0, behavior: 'smooth' })
    updateDots()
  }

  const updateDots = () => {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex)
      dot.setAttribute('aria-selected', i === currentIndex)
    })
  }

  const handleScroll = () => {
    const center = track.scrollLeft + track.clientWidth / 2

    let closestIndex = 0
    let closestDistance = Infinity

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(cardCenter - center)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = i
      }
    })
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === closestIndex)
    })
    if (closestIndex !== currentIndex) {
      currentIndex = closestIndex
      updateDots()
    }
  }

  const handlePointerDown = e => {
    isDragging = true
    startX = e.clientX
    startY = e.clientY
    track.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = e => {
    if (!isDragging) return
    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      isDragging = false
      track.releasePointerCapture(e.pointerId)
    }
  }

  const handlePointerUp = e => {
    if (!isDragging) return
    const deltaX = e.clientX - startX
    if (deltaX > SWIPE_THRESHOLD) {
      prev()
    } else if (deltaX < -SWIPE_THRESHOLD) {
      next()
    }
    isDragging = false
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i))
  })

  prevBtn.addEventListener('click', prev)
  nextBtn.addEventListener('click', next)

  track.addEventListener('pointerdown', handlePointerDown)
  track.addEventListener('pointermove', handlePointerMove)
  track.addEventListener('pointerup', handlePointerUp)
  track.addEventListener('pointercancel', () => {
    isDragging = false
  })
  track.addEventListener('scroll', handleScroll)

  updateDots()
}

initializeCertificatesCarousel()

// #endregion
