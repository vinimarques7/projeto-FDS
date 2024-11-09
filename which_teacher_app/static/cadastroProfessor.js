document.querySelectorAll('.dropdown-btn').forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      btn.parentNode.classList.toggle('show-dropdown');
    });
  });

  

