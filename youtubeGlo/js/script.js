'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // screen keyboard
  {
    const keyboardBtn = document.querySelector('.search-form__keyboard'),
      keyboard = document.querySelector('.keyboard'),
      closeKeyboard = document.getElementById('close-keyboard'),
      searchInput = document.querySelector('.search-form__input');

    const toggleKeyboard = () => keyboard.style.top = keyboard.style.top ? '' : '50%';

    const changeLanguage = (btn, lang) => {
      const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
        'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
        'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
        'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
        'en', ' '
      ];
      const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
        'ru', ' '
      ];

      if (lang === 'en') {
        btn.forEach((elem, i) => {
          elem.textContent = langEn[i];
        })
      } else {
        btn.forEach((elem, i) => {
          elem.textContent = langRu[i];
        })
      }
    };

    const typing = event => {
      const target = event.target;

      if (target.tagName.toLowerCase() === 'button') {
        const buttons = [...keyboard.querySelectorAll('button')]
          .filter(elem => elem.style.visibility !== 'hidden');
        const buttonContent = target.textContent.trim();
        if (target.id === 'keyboard-backspace') {
          searchInput.value = searchInput.value.slice(0, -1);
        } else if (target.id === 'keyboard-space') {
          searchInput.value += ' ';
        } else if (buttonContent === 'en' || buttonContent === 'ru') {
          changeLanguage(buttons, buttonContent);
        } else {
          searchInput.value += buttonContent;
        }
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

  {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="youTuberModal">
        <div id="youtuberClose">&#215;</div>
        <div id="youtuberContainer"></div>
      </div>
    `);

    const youtuberItems = document.querySelectorAll('[data-youtuber]');
    const youTuberModal = document.querySelector('.youTuberModal');
    youTuberModal.style.display = 'block';
    youTuberModal.style.visibility = 'hidden';
    youTuberModal.style.width = '0';
    youTuberModal.style.height = '0';



    const youtuberContainer = document.getElementById('youtuberContainer');

    const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
    const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

    const videoSize = () => {
      let ww = document.documentElement.clientWidth;
      let wh = document.documentElement.clientHeight;

      for (let i = 0; i < qw.length; i++) {
        if (ww > qw[i]) {
          youtuberContainer.querySelector('iframe').style.cssText = `
          width: ${qw[i]}px;
          height: ${qh[i]}px;
          `;
          youtuberContainer.style.cssText = `
          width: ${qw[i]}px;
          height: ${qh[i]}px;
          top: ${(wh - qh[i]) / 2}px;
          left: ${(ww - qw[i]) / 2}px;
          `;
          break;
        }
      }
    };

    youtuberItems.forEach(elem => {
      elem.addEventListener('click', () => {
        const idVideo = elem.dataset.youtuber;
        youTuberModal.style.width = '100%';
        youTuberModal.style.height = '100vh';
        youTuberModal.style.visibility = '';

        const youTuberFrame = document.createElement('iframe');
        youTuberFrame.src = `http://youtube.com/embed/${idVideo}`;
        youtuberContainer.insertAdjacentElement('afterbegin', youTuberFrame);

        window.addEventListener('resize', videoSize);

        videoSize();
      });
    });

    youTuberModal.addEventListener('click', () => {
      youTuberModal.style.width = '0';
      youTuberModal.style.height = '0';
      youTuberModal.style.visibility = 'hidden';

      youtuberContainer.textContent = '';
      window.removeEventListener('resize', videoSize);

    });
  }

  //youtubeApi

  {
    const API_KEY = 'AIzaSyDsDLVPmrLxaAM0plpeOiDwl5VVEKpJmW8';
    const CLIENT_ID = '616534437452-7tg5c8m4hhfcgrel7455d0fi6pk2meuj.apps.googleusercontent.com';
  }

});
