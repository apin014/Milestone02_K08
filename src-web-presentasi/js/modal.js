const portfolioContainer = document.querySelector('.portfolio-items')

portfolioContainer.addEventListener('click', e => {
  e.preventDefault()

  const modalToggle = e.target.closest('.portfolio-link')
  if (! modalToggle) return

  const modal = modalToggle.parentNode.nextElementSibling
  const closeButton = modal.querySelector('.modal-close')

  const modalOpen = _ => {
    modal.classList.add('is-open')
    modal.style.animation = 'modalIn 500ms forwards'
  }

  const modalClose = _ => {
    modal.classList.remove('is-open')
    modal.removeEventListener('animationend', modalClose)
  }

  closeButton.addEventListener('click', _ => {
    modal.style.animation = 'modalOut 500ms forwards'
    modal.addEventListener('animationend', modalClose)
  })

  document.addEventListener('keydown', e => {
    if ( e.keyCode === 27 ) {
      modal.style.animation = 'modalOut 500ms forwards'
      modal.addEventListener('animationend', modalClose)
      document.body.style.overflowY = 'scroll'
    }
  })

  modalOpen()

})