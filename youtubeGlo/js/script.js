'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // screen keyboard
  {
    const keyboardBtn = document.querySelector('.search-form__keyboard'),
      keyboard = document.querySelector('.keyboard'),
      closeKeyboard = document.getElementById('close-keyboard'),
      searchInput = document.querySelector('.search-form__input');

    const toggleKeyboard = () => keyboard.style.top = keyboard.style.top ? '' : '50%';

    const typing = event => {
      const target = event.target;

      if (target.tagName.toLowerCase() === 'button') {
        if (target.id === 'keyboard-backspace') {
          searchInput.value = searchInput.value.slice(0,-1);
        } else if (target.id === 'keyboard-space') {
          searchInput.value += ' ';
        } else {searchInput.value += target.textContent.trim();}
      }
    };

    keyboardBtn.addEventListener('click', toggleKeyboard);
    closeKeyboard.addEventListener('click', toggleKeyboard);
    keyboard.addEventListener('click', typing);

  }

  //menu
  {

    const burger = document.querySelector('.spinner'),
      sidebarMenu = document.querySelector('.sidebarMenu');

    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      sidebarMenu.classList.toggle('rollUp');
    });

    sidebarMenu.addEventListener('click', event => {

      let target = event.target;

      target = target.closest('a[href="#"]');

      if (target) {
        const targetParent = target.parentNode;
        sidebarMenu.querySelectorAll('li').forEach((elem) => {
          if (elem === targetParent) {
            elem.classList.add('active');
          } else {
            elem.classList.remove('active');
          }
        });
      }

    })

  }

  //modal

});
