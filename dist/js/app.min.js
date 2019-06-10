"use strict";

/* Accordion*/
var accordionTeam = function accordionTeam() {
  var accordionLink = document.querySelectorAll('.accordion__link');
  accordionLink.forEach(function (memberName) {
    memberName.addEventListener('click', function (e) {
      e.preventDefault();
      var activeMember = document.querySelector('.accordion__item.is-active');

      if (activeMember) {
        var accordionDetails = activeMember.querySelector('.accordion__desc');
        accordionDetails.style.height = '0px';
        activeMember.classList.remove('is-active');
      }

      if (!activeMember || activeMember.querySelector('.accordion__link') !== e.target) {
        var currentMember = e.target.closest('.accordion__item');
        currentMember.classList.add('is-active');
        var currentMemberInfo = currentMember.querySelector('.accordion__desc');
        currentMemberInfo.style.height = currentMemberInfo.scrollHeight + 'px';
      }
    });
  });
};

accordionTeam();
/*Vert-accordion*/

var vertAccordion = function vertAccordion() {
  var calcWidth = function calcWidth() {
    var windowWidth = window.innerWidth;
    var links = document.querySelectorAll('.vert-accordion__link');
    var linksWidth = parseFloat(getComputedStyle(links[0]).width);
    var reqWidth = windowWidth - linksWidth * links.length;
    return reqWidth > 550 ? 550 : reqWidth;
  };

  var accordionLink = document.querySelectorAll('.vert-accordion__link');
  accordionLink.forEach(function (memberName) {
    memberName.addEventListener('click', function (e) {
      e.preventDefault();
      var activeMember = document.querySelector('.vert-accordion__item.vert-accordion__item--active');

      if (activeMember) {
        var accordionDetails = activeMember.querySelector('.vert-accordion__desc');
        accordionDetails.style.width = '0px';
        activeMember.classList.remove('vert-accordion__item--active');
      }

      if (!activeMember || activeMember.querySelector('.vert-accordion__link') !== e.target) {
        var currentMember = e.target.closest('.vert-accordion__item');
        currentMember.classList.remove('hidden');
        currentMember.classList.add('vert-accordion__item--active');
        var currentMemberInfo = currentMember.querySelector('.vert-accordion__desc');
        currentMemberInfo.style.width = calcWidth() + 'px';
      }
    });
  });
};

vertAccordion();
/*/* Accordion v1.0 
var accordion = document.getElementsByClassName('accordion__item');
for (var i = 0; i < accordion.length; i++) {
	accordion[i].addEventListener('click', function (e) {
		e.preventDefault();
		if (!(this.classList.contains('is-active'))) {
			for (var i = 0; i < accordion.length; i++) {
				accordion[i].classList.remove('is-active');
			}
			this.classList.add('is-active');
		}
	})
}
/*Vert-accordion v1.0 
var vertAccordion = document.getElementsByClassName('vert-accordion__item');
for (var i = 0; i < vertAccordion.length; i++) {
	vertAccordion[i].addEventListener('click', function (e) {
		e.preventDefault();
		if (!(this.classList.contains('vert-accordion__item--active'))) {
			for (var i = 0; i < vertAccordion.length; i++) {
				vertAccordion[i].classList.remove('vert-accordion__item--active');
			}
			this.classList.add('vert-accordion__item--active');
		}
	})
}
}*/

;
/* Form and Modal*/

var overlay = function () {
  var body = document.querySelector('body');
  var link = document.createElement('a');
  link.classList.add('modal-review__close');
  link.setAttribute('href', '#');

  var openOverlay = function openOverlay(modalId, content) {
    var overlay = document.querySelector(modalId);
    var innerOverlay = overlay.querySelector('.modal-review__inner');
    overlay.addEventListener('click', function (e) {
      e.preventDefault();

      if (e.target === overlay) {
        closeOverlay(modalId);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.keyCode == 27) {
        closeOverlay(modalId);
      }
    });

    if (content) {
      innerOverlay.innerHTML = content;
      innerOverlay.appendChild(link);
    }

    link.addEventListener('click', function (e) {
      e.preventDefault();
      closeOverlay(modalId);
    });
    overlay.classList.add('active');
    body.classList.add('locked');
  };

  var closeOverlay = function closeOverlay(modalId) {
    var overlay = document.querySelector(modalId);
    overlay.classList.remove('active');
    body.classList.remove('locked');
  };

  var setContent = function setContent(modalId, content) {
    var overlay = document.querySelector(modalId);
    var innerOverlay = overlay.querySelector('.modal-review__inner');

    if (content) {
      innerOverlay.innerHTML = content;
      innerOverlay.appendChild(link);
    }
  };

  return {
    open: openOverlay,
    close: closeOverlay,
    setContent: setContent
  };
}();

var ajaxForm = function ajaxForm(form) {
  var formData = new FormData();
  formData.append("name", form.elements.name.value);
  formData.append("phone", form.elements.phone.value);
  formData.append("comment", form.elements.comment.value);
  formData.append("to", "amakeikin@yandex.ru");
  var url = "https://webdev-api.loftschool.com/sendmail/";
  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open('POST', url);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send(formData);
  return xhr;
};

var submitform = function submitform(e) {
  e.preventDefault();
  var form = e.target;
  var request = ajaxForm(form);
  request.addEventListener('load', function () {
    if (request.status >= 400) {
      var _content = 'Ошибка соединения с сервером, попробуйте позже';
      overlay.open('#modal-review', "".concat(_content, ". \u041E\u0448\u0438\u0431\u043A\u0430 ").concat(request.status));
    } else {
      var _content2 = request.response.message;
      overlay.open('#modal-review', _content2);
    }
  });
};

var myForm = document.querySelector('#main-form');
myForm.addEventListener('submit', submitform);

var reviewOpen = function reviewOpen(content) {
  var button = document.querySelector('#button');
  var container = document.querySelector('.reviews__list');
  container.addEventListener('click', function (e) {
    e.preventDefault();
    var target = e.target;

    if (target.className === button.className) {
      overlay.open('#modal-review', content);
    }
  });
  content = document.querySelector('#overlay').innerHTML;
};

var content = document.querySelector('#overlay').innerHTML;
reviewOpen(content);
;
/* Hamburger menu */

var hamburger = function hamburger(options) {
  var button = document.querySelector(options.button);
  var menu = document.querySelector(options.menu);
  var list = document.querySelector(".popup-menu__list");

  var _openMenu = function _openMenu(e) {
    e.preventDefault();
    menu.classList.toggle("popup-menu--active");
    button.classList.toggle("hamburger-menu-link--active");
    document.body.classList.toggle("lock");
  };

  var _closeMenu = function _closeMenu(e) {
    e.preventDefault();

    if (e.target.className === "popup-menu__link") {
      menu.classList.remove("popup-menu--active");
      button.classList.remove("hamburger-menu-link--active");
      document.body.classList.remove("lock");
    }
  };

  var addListeners = function addListeners() {
    button.addEventListener("click", _openMenu);
    list.addEventListener("click", _closeMenu);
  };

  return {
    init: addListeners
  };
};

hamburger({
  button: ".hamburger-menu-link",
  menu: ".popup-menu"
}).init();
;
/* Yandex map*/

ymaps.ready(init);
var placemarks = [{
  latitude: 59.96956006,
  longitude: 30.31144850,
  hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
  balloonContent: ['<div class="map__balloon">', '<img class="map__burger-img" src="./icons/map-marker.svg" alt="Бургер"/>', 'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19. ', 'Работаем с 10:00 до 20:00', '</div>']
}, {
  latitude: 59.93995106,
  longitude: 30.25081200,
  hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
  balloonContent: ['<div class="map__balloon">', '<img class="map__burger-img" src="./icons/map-marker.svg" alt="Бургер"/>', 'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д 64. ', 'Работаем с 10:00 до 20:00', '</div>']
}, {
  latitude: 59.92953756,
  longitude: 30.33999700,
  hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
  balloonContent: ['<div class="map__balloon">', '<img class="map__burger-img" src="./icons/map-marker.svg" alt="Бургер"/>', 'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д. 56. ', 'Работаем с 10:00 до 20:00', '</div>']
}, {
  latitude: 59.92651036,
  longitude: 30.41366645,
  hintContent: '<div class="map__hint"> Новочеркасский проспект, д.47 к.1 </div>',
  balloonContent: ['<div class="map__balloon">', '<img class="map__burger-img" src="./icons/map-marker.svg" alt="Бургер"/>', 'Самые вкусные бургеры у нас! Заходите по адресу:Новочеркасский проспект, д.47 к.1. ', 'Работаем с 10:00 до 20:00', '</div>']
}],
    geoObjects = [];

function init() {
  var map = new ymaps.Map('map', {
    center: [59.938480, 30.312480],
    zoom: 13,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });
  placemarks.forEach(function (obj) {
    var geoObjects = new ymaps.Placemark([obj.latitude, obj.longitude], {
      hintContent: obj.hintContent,
      balloonContent: obj.balloonContent.join('')
    }, {
      iconLayout: 'default#image',
      iconImageHref: './icons/map-marker.svg',
      iconImageSize: [46, 57],
      iconOffset: [-23, -57]
    });
    map.geoObjects.add(geoObjects);
  });
}

;
/* OnePageScroll */

var checkMobile = function checkMobile() {
  var isMobile = false;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Opera Mobile|Kindle|Windows Phone|PSP|AvantGo|Atomic Web Browser|Blazer|Chrome Mobile|Dolphin|Dolfin|Doris|GO Browser|Jasmine|MicroB|Mobile Firefox|Mobile Safari|Mobile Silk|Motorola Internet Browser|NetFront|NineSky|Nokia Web Browser|Obigo|Openwave Mobile Browser|Palm Pre web browser|Polaris|PS Vita browser|Puffin|QQbrowser|SEMC Browser|Skyfire|Tear|TeaShark|UC Browser|uZard Web|wOSBrowser|Yandex.Browser mobile/i.test(navigator.userAgent)) isMobile = true;
  return isMobile;
};

var OnePageScroll = function OnePageScroll(options) {
  var currentSection = 0;
  var content = document.querySelector('.content');
  var countSections = document.querySelectorAll('.section').length;
  var listLinks = document.querySelectorAll('[' + options.attribute + ']');
  var inscroll = false;

  var swipeDetected = function swipeDetected(element) {
    var startX,
        startY,
        distX,
        distY,
        deviation = 200,
        //deviation from main direction
    threshold = 150,
        //min range for swipe
    allowedTime = 1000,
        //max time for range
    elapsedTime,
        //runtime
    startTime;
    element.addEventListener('touchstart', function (e) {
      var touchobj = e.changedTouches[0];
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime(); //time touch with sensor
    });
    element.addEventListener('touchmove', function (e) {
      return e.preventDefault();
    });
    element.addEventListener('touchend', function (e) {
      var touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX; //get horizontal move

      distY = touchobj.pageY - startY; //get vertical move

      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime <= allowedTime) {
        if (Math.abs(distY) >= threshold && Math.abs(distX) <= deviation) {
          //vertical swipe
          swipedir = distY < 0 ? slideToSection(currentSection + 1) : slideToSection(currentSection - 1);
        }
      }
    });
  };

  var slideToSection = function slideToSection(indexSection) {
    if (!inscroll) {
      if (indexSection >= 0 && indexSection < countSections) {
        currentSection = indexSection;
        inscroll = true;
        var position = indexSection * -100 + '%';
        content.style.transform = "translateY(".concat(position, ")");
        content.style.webkitTransform = "translateY(".concat(position, ")");
        setTimeout(function () {
          inscroll = false;
          var sideNavElements = document.querySelectorAll('.section-nav__item');

          for (var i = 0; i < sideNavElements.length; i++) {
            if (i !== indexSection) {
              sideNavElements[i].classList.remove('section-nav__item--active');
            } else {
              sideNavElements[i].classList.add('section-nav__item--active');
            }
          }
        }, 1000);
      }
    }
  };

  document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 40:
        slideToSection(currentSection + 1);
        break;

      case 38:
        slideToSection(currentSection - 1);
        break;
    }
  });
  listLinks.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var index = parseInt(e.target.getAttribute(options.attribute)); //fix for button-down

      if (!(index >= 0)) {
        index = parseInt(e.currentTarget.getAttribute(options.attribute));
      }

      slideToSection(index);
    });
  });
  document.addEventListener('wheel', function (e) {
    var deltaY = e.deltaY;
    var index = deltaY > 0 ? currentSection + 1 : currentSection - 1;
    slideToSection(index);
  }, 'touchmove', function (e) {
    return e.preventDefault();
  });

  if (checkMobile) {
    swipeDetected(content);
  }
};

OnePageScroll({
  content: 'content',
  section: 'section',
  sideNavigation: 'section-nav__item',
  attribute: 'data-scroll-to'
});
;

window.onload = function () {
  var video = document.querySelector("#player");
  video.addEventListener('click', playStop);
  var playButtons = document.querySelectorAll(".play");

  for (var i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener('click', playStop);
  }

  var soundButton = document.querySelector('.sound__mic');
  soundButton.addEventListener('click', soundOff);
  var durationControl = document.querySelector('.duration__range');
  durationControl.addEventListener('mousedown', stopInterval);
  durationControl.addEventListener('click', setVideoDuration);
  durationControl.min = 0;
  durationControl.value = 0;
  var soundControl = document.querySelector('.sound__range');
  soundControl.addEventListener('mouseup', changeSoundVolume);
  soundControl.min = 0;
  soundControl.max = 10;
  soundControl.value = soundControl.max;
  var videoPlayButton = document.querySelector('.video__player-pic');
  var toolPlayButton = document.querySelector('.duration__play');
  video.addEventListener('ended', function () {
    videoPlayButton.classList.toggle('video__player-pic--active');
    toolPlayButton.classList.toggle('duration__play--active');
    video.currentTime = 0;
  });
  var intervalId;

  function playStop() {
    videoPlayButton.classList.toggle('video__player-pic--active');
    toolPlayButton.classList.toggle('duration__play--active');
    durationControl.max = video.duration;

    if (video.paused) {
      video.play();
      intervalId = setInterval(updateDuration, 1000 / 66);
    } else {
      video.pause();
      clearInterval(intervalId);
    }

    ;
  }

  ;

  function stopInterval() {
    video.pause();
    clearInterval(intervalId);
  }

  ;

  function setVideoDuration() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }

    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration, 1000 / 66);
  }

  ;

  function updateDuration() {
    durationControl.value = video.currentTime;
  }

  ;

  function soundOff() {
    if (video.volume === 0) {
      video.volume = soundLevel;
      soundControl.value = soundLevel * 10;
    } else {
      soundLevel = video.volume;
      video.volume = 0;
      soundControl.value = 0;
    }
  }

  ;

  function changeSoundVolume() {
    video.volume = soundControl.value / 10;
    console.log(video.volume);
  }
};

;
/* Slider*/

var slide = function () {
  var left = document.querySelector('.slider__button-prev');
  var right = document.querySelector('.slider__button-next');
  var slider = document.querySelector('.slider__list');
  var computed = getComputedStyle(slider);
  var scroll = true;
  var slwidth = parseInt(computed.width);
  window.addEventListener('resize', function () {
    currentRight = 0;
    slider.style.right = currentRight;
    slwidth = parseInt(computed.width);
  }, true);
  var sliderCounter = slider.children.length;

  var slideMove = function slideMove(orientation) {
    orientation.addEventListener('click', function (e) {
      e.preventDefault();

      if (scroll) {
        scroll = false;

        var _currentRight = parseInt(computed.right);

        if (_currentRight < (sliderCounter - 1) * slwidth && orientation == right) {
          slider.style.right = _currentRight + slwidth + 'px';
        } else if (_currentRight >= (sliderCounter - 1) * slwidth && orientation == right) {
          slider.style.right = _currentRight - (sliderCounter - 1) * slwidth + 'px';
        }

        if (_currentRight > 0 && orientation == left) {
          slider.style.right = _currentRight - slwidth + 'px';
        } else if (_currentRight <= 0 && orientation == left) {
          slider.style.right = _currentRight + (sliderCounter - 1) * slwidth + 'px';
        }

        setTimeout(function () {
          scroll = true;
        }, 500);
      }
    });
  };

  var addListeners = function addListeners() {
    slideMove(right);
    slideMove(left);
  };

  return {
    init: addListeners
  };
}();

slide.init();

var Ingredients = function Ingredients() {
  var slider = document.querySelectorAll('.slider__list');
  var compositionClose = document.querySelector('.composition__dropdown-close');
  slider.forEach(function (composition) {
    composition.addEventListener('click', function (e) {
      e.preventDefault();
      var active = document.querySelector('.composition--active');

      if (!active) {
        composition.classList.add('composition--active');
      } else {
        composition.classList.remove('composition--active');
      }
    });
    compositionClose.addEventListener('click', function (e) {
      e.preventDefault();

      if (e.target.className === "composition") {
        composition.classList.remove("composition--active");
      }

      ;
    });
  });
};

Ingredients(); // let Ingredients = () => {
// 	let composition = document.querySelector('.composition');
// 	let compositionClose = document.querySelector('.composition__dropdown-close-pic');
// 	composition.addEventListener('click', function (e) {
// 		e.preventDefault();
// 		var target = event.target;
// 		let active = document.querySelector('.composition--active');
// 		var elem = target.closest('.composition');
// 		if (!active) {
// 			elem.classList.add('composition--active');
// 			// } else {
// 			// 	elem.classList.remove('composition--active');
// 			// }
// 		}
// 	});
// 	composition.addEventListener('mouseenter', () => {
// 		composition.classList.add('composition--active');
// 	});
// 	composition.addEventListener('mouseleave', () => {
// 		composition.classList.remove('composition--active');
// 	});
// 	compositionClose.addEventListener('click', e => {
// 		e.preventDefault();
// 		composition.classList.remove('composition--active');
// 	});
// 	compositionClose.addEventListener('touchstart', e => {
// 		e.preventDefault();
// 		composition.classList.remove('composition--active');
// 	});
// }
// Ingredients();
//   $('.composition__dropdown').on('click', function (e) {
//     var elem = $(e.target).closest(composition);
//     if (elem.length) {
//       elem.toggleClass('composition--active');
//     } else {
//       composition.removeClass('composition--active');
//     }
//   });
// });
// const left = document.querySelector('.slider__button-prev');
// const right = document.querySelector('.slider__button-next');
// const slider = document.querySelector('.slider__list');
// var sliderCounter = slider.children.length;
// let position = parseInt(getComputedStyle(slider).right);
// right.addEventListener('click', function () {
// 	event.preventDefault();
// 	console.log(position);
// 	if (position < 0) {
// 		slider.style.right = position - (sliderCounter - 1) + '%';
// 	} else {
// 		slider.style.right = position + 100 + '%';
// 	}
// 	left.addEventListener('click', function () {
// 		event.preventDefault();
// 		console.log(position);
// 		if (position > 0) {
// 			slider.style.right = position + (sliderCounter + 1) + '%';
// 		} else {
// 			slider.style.right = position + '%';
// 		};
// 		return sliderCounter++;
// 	})
// });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImZvcm1fbW9kYWwuanMiLCJoYW1idXJnZXItbWVudS5qcyIsIm1hcC5qcyIsIm9uZXBhZ2VzY3JvbGwuanMiLCJwbGF5ZXIuanMiLCJzbGlkZXIuanMiXSwibmFtZXMiOlsiYWNjb3JkaW9uVGVhbSIsImFjY29yZGlvbkxpbmsiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwibWVtYmVyTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJhY3RpdmVNZW1iZXIiLCJxdWVyeVNlbGVjdG9yIiwiYWNjb3JkaW9uRGV0YWlscyIsInN0eWxlIiwiaGVpZ2h0IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwidGFyZ2V0IiwiY3VycmVudE1lbWJlciIsImNsb3Nlc3QiLCJhZGQiLCJjdXJyZW50TWVtYmVySW5mbyIsInNjcm9sbEhlaWdodCIsInZlcnRBY2NvcmRpb24iLCJjYWxjV2lkdGgiLCJ3aW5kb3dXaWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJsaW5rcyIsImxpbmtzV2lkdGgiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsIndpZHRoIiwicmVxV2lkdGgiLCJsZW5ndGgiLCJvdmVybGF5IiwiYm9keSIsImxpbmsiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwib3Blbk92ZXJsYXkiLCJtb2RhbElkIiwiY29udGVudCIsImlubmVyT3ZlcmxheSIsImNsb3NlT3ZlcmxheSIsImtleUNvZGUiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsInNldENvbnRlbnQiLCJvcGVuIiwiY2xvc2UiLCJhamF4Rm9ybSIsImZvcm0iLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiZWxlbWVudHMiLCJuYW1lIiwidmFsdWUiLCJwaG9uZSIsImNvbW1lbnQiLCJ1cmwiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsInJlc3BvbnNlVHlwZSIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIiwic3VibWl0Zm9ybSIsInJlcXVlc3QiLCJzdGF0dXMiLCJyZXNwb25zZSIsIm1lc3NhZ2UiLCJteUZvcm0iLCJyZXZpZXdPcGVuIiwiYnV0dG9uIiwiY29udGFpbmVyIiwiY2xhc3NOYW1lIiwiaGFtYnVyZ2VyIiwib3B0aW9ucyIsIm1lbnUiLCJsaXN0IiwiX29wZW5NZW51IiwidG9nZ2xlIiwiX2Nsb3NlTWVudSIsImFkZExpc3RlbmVycyIsImluaXQiLCJ5bWFwcyIsInJlYWR5IiwicGxhY2VtYXJrcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiaGludENvbnRlbnQiLCJiYWxsb29uQ29udGVudCIsImdlb09iamVjdHMiLCJtYXAiLCJNYXAiLCJjZW50ZXIiLCJ6b29tIiwiY29udHJvbHMiLCJiZWhhdmlvcnMiLCJvYmoiLCJQbGFjZW1hcmsiLCJqb2luIiwiaWNvbkxheW91dCIsImljb25JbWFnZUhyZWYiLCJpY29uSW1hZ2VTaXplIiwiaWNvbk9mZnNldCIsImNoZWNrTW9iaWxlIiwiaXNNb2JpbGUiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiT25lUGFnZVNjcm9sbCIsImN1cnJlbnRTZWN0aW9uIiwiY291bnRTZWN0aW9ucyIsImxpc3RMaW5rcyIsImF0dHJpYnV0ZSIsImluc2Nyb2xsIiwic3dpcGVEZXRlY3RlZCIsImVsZW1lbnQiLCJzdGFydFgiLCJzdGFydFkiLCJkaXN0WCIsImRpc3RZIiwiZGV2aWF0aW9uIiwidGhyZXNob2xkIiwiYWxsb3dlZFRpbWUiLCJlbGFwc2VkVGltZSIsInN0YXJ0VGltZSIsInRvdWNob2JqIiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiRGF0ZSIsImdldFRpbWUiLCJNYXRoIiwiYWJzIiwic3dpcGVkaXIiLCJzbGlkZVRvU2VjdGlvbiIsImluZGV4U2VjdGlvbiIsInBvc2l0aW9uIiwidHJhbnNmb3JtIiwid2Via2l0VHJhbnNmb3JtIiwic2V0VGltZW91dCIsInNpZGVOYXZFbGVtZW50cyIsImkiLCJpdGVtIiwiaW5kZXgiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImN1cnJlbnRUYXJnZXQiLCJkZWx0YVkiLCJzZWN0aW9uIiwic2lkZU5hdmlnYXRpb24iLCJvbmxvYWQiLCJ2aWRlbyIsInBsYXlTdG9wIiwicGxheUJ1dHRvbnMiLCJzb3VuZEJ1dHRvbiIsInNvdW5kT2ZmIiwiZHVyYXRpb25Db250cm9sIiwic3RvcEludGVydmFsIiwic2V0VmlkZW9EdXJhdGlvbiIsIm1pbiIsInNvdW5kQ29udHJvbCIsImNoYW5nZVNvdW5kVm9sdW1lIiwibWF4IiwidmlkZW9QbGF5QnV0dG9uIiwidG9vbFBsYXlCdXR0b24iLCJjdXJyZW50VGltZSIsImludGVydmFsSWQiLCJkdXJhdGlvbiIsInBhdXNlZCIsInBsYXkiLCJzZXRJbnRlcnZhbCIsInVwZGF0ZUR1cmF0aW9uIiwicGF1c2UiLCJjbGVhckludGVydmFsIiwidm9sdW1lIiwic291bmRMZXZlbCIsImNvbnNvbGUiLCJsb2ciLCJzbGlkZSIsImxlZnQiLCJyaWdodCIsInNsaWRlciIsImNvbXB1dGVkIiwic2Nyb2xsIiwic2x3aWR0aCIsImN1cnJlbnRSaWdodCIsInNsaWRlckNvdW50ZXIiLCJjaGlsZHJlbiIsInNsaWRlTW92ZSIsIm9yaWVudGF0aW9uIiwiSW5ncmVkaWVudHMiLCJjb21wb3NpdGlvbkNsb3NlIiwiY29tcG9zaXRpb24iLCJhY3RpdmUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQSxJQUFBQSxhQUFBLEdBQUEsU0FBQUEsYUFBQSxHQUFBO0FBQ0EsTUFBQUMsYUFBQSxHQUFBQyxRQUFBLENBQUFDLGdCQUFBLENBQUEsa0JBQUEsQ0FBQTtBQUNBRixFQUFBQSxhQUFBLENBQUFHLE9BQUEsQ0FBQSxVQUFBQyxVQUFBLEVBQUE7QUFDQUEsSUFBQUEsVUFBQSxDQUFBQyxnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBQyxDQUFBLEVBQUE7QUFDQUEsTUFBQUEsQ0FBQSxDQUFBQyxjQUFBO0FBQ0EsVUFBQUMsWUFBQSxHQUFB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QTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQSIsImZpbGUiOiJhcHAubWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQWNjb3JkaW9uKi9cclxubGV0IGFjY29yZGlvblRlYW0gPSAoKSA9PiB7XHJcblx0bGV0IGFjY29yZGlvbkxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX19saW5rJyk7XHJcblx0YWNjb3JkaW9uTGluay5mb3JFYWNoKGZ1bmN0aW9uIChtZW1iZXJOYW1lKSB7XHJcblx0XHRtZW1iZXJOYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRsZXQgYWN0aXZlTWVtYmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9faXRlbS5pcy1hY3RpdmUnKTtcclxuXHRcdFx0aWYgKGFjdGl2ZU1lbWJlcikge1xyXG5cdFx0XHRcdGxldCBhY2NvcmRpb25EZXRhaWxzID0gYWN0aXZlTWVtYmVyLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb25fX2Rlc2MnKTtcclxuXHRcdFx0XHRhY2NvcmRpb25EZXRhaWxzLnN0eWxlLmhlaWdodCA9ICcwcHgnO1xyXG5cdFx0XHRcdGFjdGl2ZU1lbWJlci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFhY3RpdmVNZW1iZXIgfHwgYWN0aXZlTWVtYmVyLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb25fX2xpbmsnKSAhPT0gZS50YXJnZXQpIHtcclxuXHRcdFx0XHRsZXQgY3VycmVudE1lbWJlciA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5hY2NvcmRpb25fX2l0ZW0nKTtcclxuXHRcdFx0XHRjdXJyZW50TWVtYmVyLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xyXG5cclxuXHRcdFx0XHRsZXQgY3VycmVudE1lbWJlckluZm8gPSBjdXJyZW50TWVtYmVyLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb25fX2Rlc2MnKTtcclxuXHRcdFx0XHRjdXJyZW50TWVtYmVySW5mby5zdHlsZS5oZWlnaHQgPSBjdXJyZW50TWVtYmVySW5mby5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH0pXHJcbn07XHJcbmFjY29yZGlvblRlYW0oKTtcclxuLypWZXJ0LWFjY29yZGlvbiovXHJcbmxldCB2ZXJ0QWNjb3JkaW9uID0gKCkgPT4ge1xyXG5cdGxldCBjYWxjV2lkdGggPSAoKSA9PiB7XHJcblx0XHRsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHRcdGxldCBsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52ZXJ0LWFjY29yZGlvbl9fbGluaycpO1xyXG5cdFx0bGV0IGxpbmtzV2lkdGggPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUobGlua3NbMF0pLndpZHRoKTtcclxuXHJcblx0XHRsZXQgcmVxV2lkdGggPSB3aW5kb3dXaWR0aCAtIGxpbmtzV2lkdGggKiBsaW5rcy5sZW5ndGg7XHJcblx0XHRyZXR1cm4gcmVxV2lkdGggPiA1NTAgPyA1NTAgOiByZXFXaWR0aDtcclxuXHR9O1xyXG5cdGxldCBhY2NvcmRpb25MaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZlcnQtYWNjb3JkaW9uX19saW5rJyk7XHJcblx0YWNjb3JkaW9uTGluay5mb3JFYWNoKGZ1bmN0aW9uIChtZW1iZXJOYW1lKSB7XHJcblx0XHRtZW1iZXJOYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRsZXQgYWN0aXZlTWVtYmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZlcnQtYWNjb3JkaW9uX19pdGVtLnZlcnQtYWNjb3JkaW9uX19pdGVtLS1hY3RpdmUnKTtcclxuXHRcdFx0aWYgKGFjdGl2ZU1lbWJlcikge1xyXG5cdFx0XHRcdGxldCBhY2NvcmRpb25EZXRhaWxzID0gYWN0aXZlTWVtYmVyLnF1ZXJ5U2VsZWN0b3IoJy52ZXJ0LWFjY29yZGlvbl9fZGVzYycpO1xyXG5cdFx0XHRcdGFjY29yZGlvbkRldGFpbHMuc3R5bGUud2lkdGggPSAnMHB4JztcclxuXHRcdFx0XHRhY3RpdmVNZW1iZXIuY2xhc3NMaXN0LnJlbW92ZSgndmVydC1hY2NvcmRpb25fX2l0ZW0tLWFjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWFjdGl2ZU1lbWJlciB8fCBhY3RpdmVNZW1iZXIucXVlcnlTZWxlY3RvcignLnZlcnQtYWNjb3JkaW9uX19saW5rJykgIT09IGUudGFyZ2V0KSB7XHJcblx0XHRcdFx0bGV0IGN1cnJlbnRNZW1iZXIgPSBlLnRhcmdldC5jbG9zZXN0KCcudmVydC1hY2NvcmRpb25fX2l0ZW0nKTtcclxuXHRcdFx0XHRjdXJyZW50TWVtYmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG5cclxuXHRcdFx0XHRjdXJyZW50TWVtYmVyLmNsYXNzTGlzdC5hZGQoJ3ZlcnQtYWNjb3JkaW9uX19pdGVtLS1hY3RpdmUnKTtcclxuXHRcdFx0XHRsZXQgY3VycmVudE1lbWJlckluZm8gPSBjdXJyZW50TWVtYmVyLnF1ZXJ5U2VsZWN0b3IoJy52ZXJ0LWFjY29yZGlvbl9fZGVzYycpO1xyXG5cdFx0XHRcdGN1cnJlbnRNZW1iZXJJbmZvLnN0eWxlLndpZHRoID0gY2FsY1dpZHRoKCkgKyAncHgnO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH0pXHJcbn07XHJcbnZlcnRBY2NvcmRpb24oKTtcclxuLyovKiBBY2NvcmRpb24gdjEuMCBcclxudmFyIGFjY29yZGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FjY29yZGlvbl9faXRlbScpO1xyXG5mb3IgKHZhciBpID0gMDsgaSA8IGFjY29yZGlvbi5sZW5ndGg7IGkrKykge1xyXG5cdGFjY29yZGlvbltpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRpZiAoISh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnaXMtYWN0aXZlJykpKSB7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYWNjb3JkaW9uLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0YWNjb3JkaW9uW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG4vKlZlcnQtYWNjb3JkaW9uIHYxLjAgXHJcbnZhciB2ZXJ0QWNjb3JkaW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmVydC1hY2NvcmRpb25fX2l0ZW0nKTtcclxuZm9yICh2YXIgaSA9IDA7IGkgPCB2ZXJ0QWNjb3JkaW9uLmxlbmd0aDsgaSsrKSB7XHJcblx0dmVydEFjY29yZGlvbltpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRpZiAoISh0aGlzLmNsYXNzTGlzdC5jb250YWlucygndmVydC1hY2NvcmRpb25fX2l0ZW0tLWFjdGl2ZScpKSkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZlcnRBY2NvcmRpb24ubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHR2ZXJ0QWNjb3JkaW9uW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3ZlcnQtYWNjb3JkaW9uX19pdGVtLS1hY3RpdmUnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoJ3ZlcnQtYWNjb3JkaW9uX19pdGVtLS1hY3RpdmUnKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcbn0qLyIsIi8qIEZvcm0gYW5kIE1vZGFsKi9cclxuY29uc3Qgb3ZlcmxheSA9IChmdW5jdGlvbiAoKSB7XHJcblx0bGV0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblx0bGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblxyXG5cdGxpbmsuY2xhc3NMaXN0LmFkZCgnbW9kYWwtcmV2aWV3X19jbG9zZScpO1xyXG5cdGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcclxuXHJcblx0bGV0IG9wZW5PdmVybGF5ID0gZnVuY3Rpb24gKG1vZGFsSWQsIGNvbnRlbnQpIHtcclxuXHRcdGxldCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihtb2RhbElkKTtcclxuXHRcdGxldCBpbm5lck92ZXJsYXkgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1yZXZpZXdfX2lubmVyJyk7XHJcblxyXG5cdFx0b3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0aWYgKGUudGFyZ2V0ID09PSBvdmVybGF5KSB7XHJcblx0XHRcdFx0Y2xvc2VPdmVybGF5KG1vZGFsSWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG5cdFx0XHRpZiAoZS5rZXlDb2RlID09IDI3KSB7XHJcblx0XHRcdFx0Y2xvc2VPdmVybGF5KG1vZGFsSWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmIChjb250ZW50KSB7XHJcblx0XHRcdGlubmVyT3ZlcmxheS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cdFx0XHRpbm5lck92ZXJsYXkuYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHR9XHJcblx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRjbG9zZU92ZXJsYXkobW9kYWxJZCk7XHJcblx0XHR9KVxyXG5cdFx0b3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHRcdGJvZHkuY2xhc3NMaXN0LmFkZCgnbG9ja2VkJyk7XHJcblx0fVxyXG5cdGxldCBjbG9zZU92ZXJsYXkgPSBmdW5jdGlvbiAobW9kYWxJZCkge1xyXG5cdFx0bGV0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1vZGFsSWQpO1xyXG5cclxuXHRcdG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblx0XHRib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2xvY2tlZCcpO1xyXG5cdH1cclxuXHRsZXQgc2V0Q29udGVudCA9IGZ1bmN0aW9uIChtb2RhbElkLCBjb250ZW50KSB7XHJcblx0XHRsZXQgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobW9kYWxJZCk7XHJcblx0XHRsZXQgaW5uZXJPdmVybGF5ID0gb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcubW9kYWwtcmV2aWV3X19pbm5lcicpO1xyXG5cclxuXHRcdGlmIChjb250ZW50KSB7XHJcblx0XHRcdGlubmVyT3ZlcmxheS5pbm5lckhUTUwgPSBjb250ZW50O1xyXG5cdFx0XHRpbm5lck92ZXJsYXkuYXBwZW5kQ2hpbGQobGluayk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0b3Blbjogb3Blbk92ZXJsYXksXHJcblx0XHRjbG9zZTogY2xvc2VPdmVybGF5LFxyXG5cdFx0c2V0Q29udGVudDogc2V0Q29udGVudFxyXG5cdH1cclxufSkoKTtcclxuXHJcblxyXG5cclxudmFyIGFqYXhGb3JtID0gZnVuY3Rpb24gKGZvcm0pIHtcclxuXHRsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuXHJcblx0Zm9ybURhdGEuYXBwZW5kKFwibmFtZVwiLCBmb3JtLmVsZW1lbnRzLm5hbWUudmFsdWUpO1xyXG5cdGZvcm1EYXRhLmFwcGVuZChcInBob25lXCIsIGZvcm0uZWxlbWVudHMucGhvbmUudmFsdWUpO1xyXG5cdGZvcm1EYXRhLmFwcGVuZChcImNvbW1lbnRcIiwgZm9ybS5lbGVtZW50cy5jb21tZW50LnZhbHVlKTtcclxuXHRmb3JtRGF0YS5hcHBlbmQoXCJ0b1wiLCBcImFtYWtlaWtpbkB5YW5kZXgucnVcIik7XHJcblxyXG5cdGxldCB1cmwgPSBcImh0dHBzOi8vd2ViZGV2LWFwaS5sb2Z0c2Nob29sLmNvbS9zZW5kbWFpbC9cIjtcclxuXHJcblx0Y29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0eGhyLnJlc3BvbnNlVHlwZSA9IFwianNvblwiO1xyXG5cdHhoci5vcGVuKCdQT1NUJywgdXJsKTtcclxuXHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIlgtUmVxdWVzdGVkLVdpdGhcIiwgXCJYTUxIdHRwUmVxdWVzdFwiKTtcclxuXHR4aHIuc2VuZChmb3JtRGF0YSk7XHJcblxyXG5cdHJldHVybiB4aHI7XHJcbn1cclxuXHJcbnZhciBzdWJtaXRmb3JtID0gZnVuY3Rpb24gKGUpIHtcclxuXHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0dmFyIGZvcm0gPSBlLnRhcmdldDtcclxuXHRsZXQgcmVxdWVzdCA9IGFqYXhGb3JtKGZvcm0pO1xyXG5cclxuXHRyZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcblx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPj0gNDAwKSB7XHJcblx0XHRcdGxldCBjb250ZW50ID0gJ9Ce0YjQuNCx0LrQsCDRgdC+0LXQtNC40L3QtdC90LjRjyDRgSDRgdC10YDQstC10YDQvtC8LCDQv9C+0L/RgNC+0LHRg9C50YLQtSDQv9C+0LfQttC1JztcclxuXHJcblx0XHRcdG92ZXJsYXkub3BlbignI21vZGFsLXJldmlldycsIGAke2NvbnRlbnR9LiDQntGI0LjQsdC60LAgJHtyZXF1ZXN0LnN0YXR1c31gKVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGNvbnRlbnQgPSByZXF1ZXN0LnJlc3BvbnNlLm1lc3NhZ2U7XHJcblx0XHRcdG92ZXJsYXkub3BlbignI21vZGFsLXJldmlldycsIGNvbnRlbnQpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5sZXQgbXlGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tZm9ybScpO1xyXG5teUZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0Jywgc3VibWl0Zm9ybSk7XHJcblxyXG5cclxuXHJcbmxldCByZXZpZXdPcGVuID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuXHRsZXQgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J1dHRvbicpO1xyXG5cdGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmV2aWV3c19fbGlzdCcpO1xyXG5cclxuXHRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0bGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cdFx0aWYgKHRhcmdldC5jbGFzc05hbWUgPT09IGJ1dHRvbi5jbGFzc05hbWUpIHtcclxuXHRcdFx0b3ZlcmxheS5vcGVuKCcjbW9kYWwtcmV2aWV3JywgY29udGVudCk7XHJcblx0XHR9XHJcblx0fSlcclxuXHRjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXknKS5pbm5lckhUTUw7XHJcbn07XHJcbmxldCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI292ZXJsYXknKS5pbm5lckhUTUw7XHJcbnJldmlld09wZW4oY29udGVudCk7IiwiLyogSGFtYnVyZ2VyIG1lbnUgKi9cclxubGV0IGhhbWJ1cmdlciA9IG9wdGlvbnMgPT4ge1xyXG5cdGxldCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuYnV0dG9uKTtcclxuXHRsZXQgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5tZW51KTtcclxuXHRsZXQgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXAtbWVudV9fbGlzdFwiKTtcclxuXHJcblx0bGV0IF9vcGVuTWVudSA9IGUgPT4ge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0bWVudS5jbGFzc0xpc3QudG9nZ2xlKFwicG9wdXAtbWVudS0tYWN0aXZlXCIpO1xyXG5cdFx0YnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJoYW1idXJnZXItbWVudS1saW5rLS1hY3RpdmVcIik7XHJcblx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoXCJsb2NrXCIpO1xyXG5cdH07XHJcblxyXG5cdGxldCBfY2xvc2VNZW51ID0gZSA9PiB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0aWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJwb3B1cC1tZW51X19saW5rXCIpIHtcclxuXHRcdFx0bWVudS5jbGFzc0xpc3QucmVtb3ZlKFwicG9wdXAtbWVudS0tYWN0aXZlXCIpO1xyXG5cdFx0XHRidXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImhhbWJ1cmdlci1tZW51LWxpbmstLWFjdGl2ZVwiKTtcclxuXHJcblx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImxvY2tcIik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0bGV0IGFkZExpc3RlbmVycyA9ICgpID0+IHtcclxuXHRcdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgX29wZW5NZW51KTtcclxuXHRcdGxpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIF9jbG9zZU1lbnUpO1xyXG5cdH07XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRpbml0OiBhZGRMaXN0ZW5lcnNcclxuXHR9O1xyXG59O1xyXG5cclxuaGFtYnVyZ2VyKHtcclxuXHRidXR0b246IFwiLmhhbWJ1cmdlci1tZW51LWxpbmtcIixcclxuXHRtZW51OiBcIi5wb3B1cC1tZW51XCJcclxufSkuaW5pdCgpOyIsIi8qIFlhbmRleCBtYXAqL1xyXG5cclxueW1hcHMucmVhZHkoaW5pdCk7XHJcblxyXG52YXIgcGxhY2VtYXJrcyA9IFtcclxuXHR7XHJcblx0XHRsYXRpdHVkZTogNTkuOTY5NTYwMDYsXHJcblx0XHRsb25naXR1ZGU6IDMwLjMxMTQ0ODUwLFxyXG5cdFx0aGludENvbnRlbnQ6ICc8ZGl2IGNsYXNzPVwibWFwX19oaW50XCI+0YPQuy4g0JvQuNGC0LXRgNCw0YLQvtGA0L7Qsiwg0LQuIDE5PC9kaXY+JyxcclxuXHRcdGJhbGxvb25Db250ZW50OiBbXHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwibWFwX19iYWxsb29uXCI+JyxcclxuXHRcdFx0JzxpbWcgY2xhc3M9XCJtYXBfX2J1cmdlci1pbWdcIiBzcmM9XCIuL2ljb25zL21hcC1tYXJrZXIuc3ZnXCIgYWx0PVwi0JHRg9GA0LPQtdGAXCIvPicsXHJcblx0XHRcdCfQodCw0LzRi9C1INCy0LrRg9GB0L3Ri9C1INCx0YPRgNCz0LXRgNGLINGDINC90LDRgSEg0JfQsNGF0L7QtNC40YLQtSDQv9C+INCw0LTRgNC10YHRgzog0YPQuy4g0JvQuNGC0LXRgNCw0YLQvtGA0L7Qsiwg0LQuIDE5LiAnLFxyXG5cdFx0XHQn0KDQsNCx0L7RgtCw0LXQvCDRgSAxMDowMCDQtNC+IDIwOjAwJyxcclxuXHRcdFx0JzwvZGl2PidcclxuXHRcdF1cclxuXHR9LFxyXG5cdHtcclxuXHRcdGxhdGl0dWRlOiA1OS45Mzk5NTEwNixcclxuXHRcdGxvbmdpdHVkZTogMzAuMjUwODEyMDAsXHJcblx0XHRoaW50Q29udGVudDogJzxkaXYgY2xhc3M9XCJtYXBfX2hpbnRcIj7QnNCw0LvRi9C5INC/0YDQvtGB0L/QtdC60YIg0JIg0J4sINC0IDY0PC9kaXY+JyxcclxuXHRcdGJhbGxvb25Db250ZW50OiBbXHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwibWFwX19iYWxsb29uXCI+JyxcclxuXHRcdFx0JzxpbWcgY2xhc3M9XCJtYXBfX2J1cmdlci1pbWdcIiBzcmM9XCIuL2ljb25zL21hcC1tYXJrZXIuc3ZnXCIgYWx0PVwi0JHRg9GA0LPQtdGAXCIvPicsXHJcblx0XHRcdCfQodCw0LzRi9C1INCy0LrRg9GB0L3Ri9C1INCx0YPRgNCz0LXRgNGLINGDINC90LDRgSEg0JfQsNGF0L7QtNC40YLQtSDQv9C+INCw0LTRgNC10YHRgzog0JzQsNC70YvQuSDQv9GA0L7RgdC/0LXQutGCINCSINCeLCDQtCA2NC4gJyxcclxuXHRcdFx0J9Cg0LDQsdC+0YLQsNC10Lwg0YEgMTA6MDAg0LTQviAyMDowMCcsXHJcblx0XHRcdCc8L2Rpdj4nXHJcblx0XHRdXHJcblx0fSxcclxuXHR7XHJcblx0XHRsYXRpdHVkZTogNTkuOTI5NTM3NTYsXHJcblx0XHRsb25naXR1ZGU6IDMwLjMzOTk5NzAwLFxyXG5cdFx0aGludENvbnRlbnQ6ICc8ZGl2IGNsYXNzPVwibWFwX19oaW50XCI+0L3QsNCxLiDRgNC10LrQuCDQpNC+0L3RgtCw0L3QutC4LCDQtC4gNTY8L2Rpdj4nLFxyXG5cdFx0YmFsbG9vbkNvbnRlbnQ6IFtcclxuXHRcdFx0JzxkaXYgY2xhc3M9XCJtYXBfX2JhbGxvb25cIj4nLFxyXG5cdFx0XHQnPGltZyBjbGFzcz1cIm1hcF9fYnVyZ2VyLWltZ1wiIHNyYz1cIi4vaWNvbnMvbWFwLW1hcmtlci5zdmdcIiBhbHQ9XCLQkdGD0YDQs9C10YBcIi8+JyxcclxuXHRcdFx0J9Ch0LDQvNGL0LUg0LLQutGD0YHQvdGL0LUg0LHRg9GA0LPQtdGA0Ysg0YMg0L3QsNGBISDQl9Cw0YXQvtC00LjRgtC1INC/0L4g0LDQtNGA0LXRgdGDOiDQvdCw0LEuINGA0LXQutC4INCk0L7QvdGC0LDQvdC60LgsINC0LiA1Ni4gJyxcclxuXHRcdFx0J9Cg0LDQsdC+0YLQsNC10Lwg0YEgMTA6MDAg0LTQviAyMDowMCcsXHJcblx0XHRcdCc8L2Rpdj4nXHJcblx0XHRdXHJcblx0fSxcclxuXHR7XHJcblx0XHRsYXRpdHVkZTogNTkuOTI2NTEwMzYsXHJcblx0XHRsb25naXR1ZGU6IDMwLjQxMzY2NjQ1LFxyXG5cdFx0aGludENvbnRlbnQ6ICc8ZGl2IGNsYXNzPVwibWFwX19oaW50XCI+INCd0L7QstC+0YfQtdGA0LrQsNGB0YHQutC40Lkg0L/RgNC+0YHQv9C10LrRgiwg0LQuNDcg0LouMSA8L2Rpdj4nLFxyXG5cdFx0YmFsbG9vbkNvbnRlbnQ6IFtcclxuXHRcdFx0JzxkaXYgY2xhc3M9XCJtYXBfX2JhbGxvb25cIj4nLFxyXG5cdFx0XHQnPGltZyBjbGFzcz1cIm1hcF9fYnVyZ2VyLWltZ1wiIHNyYz1cIi4vaWNvbnMvbWFwLW1hcmtlci5zdmdcIiBhbHQ9XCLQkdGD0YDQs9C10YBcIi8+JyxcclxuXHRcdFx0J9Ch0LDQvNGL0LUg0LLQutGD0YHQvdGL0LUg0LHRg9GA0LPQtdGA0Ysg0YMg0L3QsNGBISDQl9Cw0YXQvtC00LjRgtC1INC/0L4g0LDQtNGA0LXRgdGDOtCd0L7QstC+0YfQtdGA0LrQsNGB0YHQutC40Lkg0L/RgNC+0YHQv9C10LrRgiwg0LQuNDcg0LouMS4gJyxcclxuXHRcdFx0J9Cg0LDQsdC+0YLQsNC10Lwg0YEgMTA6MDAg0LTQviAyMDowMCcsXHJcblx0XHRcdCc8L2Rpdj4nXHJcblx0XHRdXHJcblx0fVxyXG5dLFxyXG5cdGdlb09iamVjdHMgPSBbXTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcblx0dmFyIG1hcCA9IG5ldyB5bWFwcy5NYXAoJ21hcCcsIHtcclxuXHRcdGNlbnRlcjogWzU5LjkzODQ4MCwgMzAuMzEyNDgwXSxcclxuXHRcdHpvb206IDEzLFxyXG5cdFx0Y29udHJvbHM6IFsnem9vbUNvbnRyb2wnXSxcclxuXHRcdGJlaGF2aW9yczogWydkcmFnJ11cclxuXHR9KTtcclxuXHJcblx0cGxhY2VtYXJrcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdGxldCBnZW9PYmplY3RzID0gbmV3IHltYXBzLlBsYWNlbWFyayhbb2JqLmxhdGl0dWRlLCBvYmoubG9uZ2l0dWRlXSwge1xyXG5cdFx0XHRoaW50Q29udGVudDogb2JqLmhpbnRDb250ZW50LFxyXG5cdFx0XHRiYWxsb29uQ29udGVudDogb2JqLmJhbGxvb25Db250ZW50LmpvaW4oJycpXHJcblx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aWNvbkxheW91dDogJ2RlZmF1bHQjaW1hZ2UnLFxyXG5cdFx0XHRcdGljb25JbWFnZUhyZWY6ICcuL2ljb25zL21hcC1tYXJrZXIuc3ZnJyxcclxuXHRcdFx0XHRpY29uSW1hZ2VTaXplOiBbNDYsIDU3XSxcclxuXHRcdFx0XHRpY29uT2Zmc2V0OiBbLTIzLCAtNTddXHJcblx0XHRcdH0pO1xyXG5cdFx0bWFwLmdlb09iamVjdHMuYWRkKGdlb09iamVjdHMpO1xyXG5cdH0pO1xyXG59IiwiLyogT25lUGFnZVNjcm9sbCAqL1xyXG5cclxubGV0IGNoZWNrTW9iaWxlID0gKCkgPT4ge1xyXG5cdGxldCBpc01vYmlsZSA9IGZhbHNlO1xyXG5cdGlmICgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaXxPcGVyYSBNb2JpbGV8S2luZGxlfFdpbmRvd3MgUGhvbmV8UFNQfEF2YW50R298QXRvbWljIFdlYiBCcm93c2VyfEJsYXplcnxDaHJvbWUgTW9iaWxlfERvbHBoaW58RG9sZmlufERvcmlzfEdPIEJyb3dzZXJ8SmFzbWluZXxNaWNyb0J8TW9iaWxlIEZpcmVmb3h8TW9iaWxlIFNhZmFyaXxNb2JpbGUgU2lsa3xNb3Rvcm9sYSBJbnRlcm5ldCBCcm93c2VyfE5ldEZyb250fE5pbmVTa3l8Tm9raWEgV2ViIEJyb3dzZXJ8T2JpZ298T3BlbndhdmUgTW9iaWxlIEJyb3dzZXJ8UGFsbSBQcmUgd2ViIGJyb3dzZXJ8UG9sYXJpc3xQUyBWaXRhIGJyb3dzZXJ8UHVmZmlufFFRYnJvd3NlcnxTRU1DIEJyb3dzZXJ8U2t5ZmlyZXxUZWFyfFRlYVNoYXJrfFVDIEJyb3dzZXJ8dVphcmQgV2VifHdPU0Jyb3dzZXJ8WWFuZGV4LkJyb3dzZXIgbW9iaWxlL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkgaXNNb2JpbGUgPSB0cnVlO1xyXG5cdHJldHVybiBpc01vYmlsZTtcclxufTtcclxuXHJcblxyXG5sZXQgT25lUGFnZVNjcm9sbCA9IG9wdGlvbnMgPT4ge1xyXG5cdGxldCBjdXJyZW50U2VjdGlvbiA9IDA7XHJcblx0bGV0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xyXG5cdGxldCBjb3VudFNlY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlY3Rpb24nKS5sZW5ndGg7XHJcblx0bGV0IGxpc3RMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1snICsgb3B0aW9ucy5hdHRyaWJ1dGUgKyAnXScpO1xyXG5cdGxldCBpbnNjcm9sbCA9IGZhbHNlO1xyXG5cclxuXHRsZXQgc3dpcGVEZXRlY3RlZCA9IGVsZW1lbnQgPT4ge1xyXG5cdFx0bGV0IHN0YXJ0WCxcclxuXHRcdFx0c3RhcnRZLFxyXG5cdFx0XHRkaXN0WCxcclxuXHRcdFx0ZGlzdFksXHJcblx0XHRcdGRldmlhdGlvbiA9IDIwMCwgLy9kZXZpYXRpb24gZnJvbSBtYWluIGRpcmVjdGlvblxyXG5cdFx0XHR0aHJlc2hvbGQgPSAxNTAsIC8vbWluIHJhbmdlIGZvciBzd2lwZVxyXG5cdFx0XHRhbGxvd2VkVGltZSA9IDEwMDAsIC8vbWF4IHRpbWUgZm9yIHJhbmdlXHJcblx0XHRcdGVsYXBzZWRUaW1lLCAvL3J1bnRpbWVcclxuXHRcdFx0c3RhcnRUaW1lO1xyXG5cclxuXHRcdGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGUgPT4ge1xyXG5cdFx0XHRsZXQgdG91Y2hvYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xyXG5cdFx0XHRzdGFydFggPSB0b3VjaG9iai5wYWdlWDtcclxuXHRcdFx0c3RhcnRZID0gdG91Y2hvYmoucGFnZVk7XHJcblx0XHRcdHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpOyAvL3RpbWUgdG91Y2ggd2l0aCBzZW5zb3JcclxuXHRcdH0pO1xyXG5cclxuXHRcdFxyXG5cdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XHJcblxyXG5cdFx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGUgPT4ge1xyXG5cdFx0XHRsZXQgdG91Y2hvYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xyXG5cdFx0XHRkaXN0WCA9IHRvdWNob2JqLnBhZ2VYIC0gc3RhcnRYOyAvL2dldCBob3Jpem9udGFsIG1vdmVcclxuXHRcdFx0ZGlzdFkgPSB0b3VjaG9iai5wYWdlWSAtIHN0YXJ0WTsgLy9nZXQgdmVydGljYWwgbW92ZVxyXG5cdFx0XHRlbGFwc2VkVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lO1xyXG5cdFx0XHRpZiAoZWxhcHNlZFRpbWUgPD0gYWxsb3dlZFRpbWUpIHtcclxuXHRcdFx0XHRpZiAoTWF0aC5hYnMoZGlzdFkpID49IHRocmVzaG9sZCAmJiBNYXRoLmFicyhkaXN0WCkgPD0gZGV2aWF0aW9uKSB7IC8vdmVydGljYWwgc3dpcGVcclxuXHRcdFx0XHRcdHN3aXBlZGlyID0gKGRpc3RZIDwgMCkgPyBzbGlkZVRvU2VjdGlvbihjdXJyZW50U2VjdGlvbiArIDEpIDogc2xpZGVUb1NlY3Rpb24oY3VycmVudFNlY3Rpb24gLSAxKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHRsZXQgc2xpZGVUb1NlY3Rpb24gPSAoaW5kZXhTZWN0aW9uKSA9PiB7XHJcblx0XHRpZiAoIWluc2Nyb2xsKSB7XHJcblx0XHRcdGlmIChpbmRleFNlY3Rpb24gPj0gMCAmJiBpbmRleFNlY3Rpb24gPCBjb3VudFNlY3Rpb25zKSB7XHJcblxyXG5cdFx0XHRcdGN1cnJlbnRTZWN0aW9uID0gaW5kZXhTZWN0aW9uO1xyXG5cclxuXHRcdFx0XHRpbnNjcm9sbCA9IHRydWU7XHJcblxyXG5cdFx0XHRcdGxldCBwb3NpdGlvbiA9IGluZGV4U2VjdGlvbiAqIC0xMDAgKyAnJSc7XHJcblxyXG5cdFx0XHRcdGNvbnRlbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHtwb3NpdGlvbn0pYDtcclxuXHRcdFx0XHRjb250ZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7cG9zaXRpb259KWA7XHJcblxyXG5cclxuXHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRpbnNjcm9sbCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0bGV0IHNpZGVOYXZFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWN0aW9uLW5hdl9faXRlbScpO1xyXG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaWRlTmF2RWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0aWYgKGkgIT09IGluZGV4U2VjdGlvbikge1xyXG5cdFx0XHRcdFx0XHRcdHNpZGVOYXZFbGVtZW50c1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWN0aW9uLW5hdl9faXRlbS0tYWN0aXZlJyk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0c2lkZU5hdkVsZW1lbnRzW2ldLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb24tbmF2X19pdGVtLS1hY3RpdmUnKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0sIDEwMDApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0XHJcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG5cdFx0c3dpdGNoIChlLmtleUNvZGUpIHtcclxuXHRcdFx0Y2FzZSA0MDpcclxuXHRcdFx0XHRzbGlkZVRvU2VjdGlvbihjdXJyZW50U2VjdGlvbiArIDEpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIDM4OlxyXG5cdFx0XHRcdHNsaWRlVG9TZWN0aW9uKGN1cnJlbnRTZWN0aW9uIC0gMSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdFxyXG5cdGxpc3RMaW5rcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG5cdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGxldCBpbmRleCA9IHBhcnNlSW50KChlLnRhcmdldCkuZ2V0QXR0cmlidXRlKG9wdGlvbnMuYXR0cmlidXRlKSk7XHJcblx0XHRcdC8vZml4IGZvciBidXR0b24tZG93blxyXG5cdFx0XHRpZiAoIShpbmRleCA+PSAwKSkge1xyXG5cdFx0XHRcdGluZGV4ID0gcGFyc2VJbnQoKGUuY3VycmVudFRhcmdldCkuZ2V0QXR0cmlidXRlKG9wdGlvbnMuYXR0cmlidXRlKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c2xpZGVUb1NlY3Rpb24oaW5kZXgpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG5cclxuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIGUgPT4ge1xyXG5cdFx0bGV0IGRlbHRhWSA9IGUuZGVsdGFZO1xyXG5cdFx0bGV0IGluZGV4ID0gZGVsdGFZID4gMCA/IGN1cnJlbnRTZWN0aW9uICsgMSA6IGN1cnJlbnRTZWN0aW9uIC0gMTtcclxuXHJcblx0XHRzbGlkZVRvU2VjdGlvbihpbmRleCk7XHJcblx0fSwgJ3RvdWNobW92ZScsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcclxuXHJcblxyXG5cclxuXHRcclxuXHRpZiAoY2hlY2tNb2JpbGUpIHtcclxuXHRcdHN3aXBlRGV0ZWN0ZWQoY29udGVudCk7XHJcblx0fVxyXG59O1xyXG5cclxuT25lUGFnZVNjcm9sbCh7XHJcblx0Y29udGVudDogJ2NvbnRlbnQnLFxyXG5cdHNlY3Rpb246ICdzZWN0aW9uJyxcclxuXHRzaWRlTmF2aWdhdGlvbjogJ3NlY3Rpb24tbmF2X19pdGVtJyxcclxuXHRhdHRyaWJ1dGU6ICdkYXRhLXNjcm9sbC10bydcclxufSk7Iiwid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRsZXQgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllclwiKTtcclxuXHJcblx0dmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5U3RvcCk7XHJcblx0bGV0IHBsYXlCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGF5XCIpO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgcGxheUJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHBsYXlCdXR0b25zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheVN0b3ApO1xyXG5cdH1cclxuXHJcblx0bGV0IHNvdW5kQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvdW5kX19taWMnKTtcclxuXHRzb3VuZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNvdW5kT2ZmKTtcclxuXHJcblx0bGV0IGR1cmF0aW9uQ29udHJvbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kdXJhdGlvbl9fcmFuZ2UnKTtcclxuXHRkdXJhdGlvbkNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc3RvcEludGVydmFsKTtcclxuXHRkdXJhdGlvbkNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZXRWaWRlb0R1cmF0aW9uKVxyXG5cclxuXHRkdXJhdGlvbkNvbnRyb2wubWluID0gMDtcclxuXHRkdXJhdGlvbkNvbnRyb2wudmFsdWUgPSAwO1xyXG5cclxuXHRsZXQgc291bmRDb250cm9sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvdW5kX19yYW5nZScpO1xyXG5cdHNvdW5kQ29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgY2hhbmdlU291bmRWb2x1bWUpO1xyXG5cclxuXHRzb3VuZENvbnRyb2wubWluID0gMDtcclxuXHRzb3VuZENvbnRyb2wubWF4ID0gMTA7XHJcblxyXG5cdHNvdW5kQ29udHJvbC52YWx1ZSA9IHNvdW5kQ29udHJvbC5tYXg7XHJcblxyXG5cdGxldCB2aWRlb1BsYXlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW9fX3BsYXllci1waWMnKTtcclxuXHRsZXQgdG9vbFBsYXlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZHVyYXRpb25fX3BsYXknKTtcclxuXHJcblx0dmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHR2aWRlb1BsYXlCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgndmlkZW9fX3BsYXllci1waWMtLWFjdGl2ZScpO1xyXG5cdFx0dG9vbFBsYXlCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnZHVyYXRpb25fX3BsYXktLWFjdGl2ZScpO1xyXG5cdFx0dmlkZW8uY3VycmVudFRpbWUgPSAwO1xyXG5cdH0pXHJcblxyXG5cdGxldCBpbnRlcnZhbElkO1xyXG5cdGZ1bmN0aW9uIHBsYXlTdG9wKCkge1xyXG5cclxuXHRcdHZpZGVvUGxheUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCd2aWRlb19fcGxheWVyLXBpYy0tYWN0aXZlJyk7XHJcblx0XHR0b29sUGxheUJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKCdkdXJhdGlvbl9fcGxheS0tYWN0aXZlJyk7XHJcblx0XHRkdXJhdGlvbkNvbnRyb2wubWF4ID0gdmlkZW8uZHVyYXRpb247XHJcblxyXG5cdFx0aWYgKHZpZGVvLnBhdXNlZCkge1xyXG5cclxuXHRcdFx0dmlkZW8ucGxheSgpO1xyXG5cdFx0XHRpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodXBkYXRlRHVyYXRpb24sIDEwMDAgLyA2NilcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0dmlkZW8ucGF1c2UoKTtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcclxuXHJcblx0XHR9O1xyXG5cdH07XHJcblxyXG5cdGZ1bmN0aW9uIHN0b3BJbnRlcnZhbCgpIHtcclxuXHRcdHZpZGVvLnBhdXNlKCk7XHJcblx0XHRjbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG5cdH07XHJcblxyXG5cdGZ1bmN0aW9uIHNldFZpZGVvRHVyYXRpb24oKSB7XHJcblx0XHRpZiAodmlkZW8ucGF1c2VkKSB7XHJcblx0XHRcdHZpZGVvLnBsYXkoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZpZGVvLnBhdXNlKCk7XHJcblx0XHR9XHJcblx0XHR2aWRlby5jdXJyZW50VGltZSA9IGR1cmF0aW9uQ29udHJvbC52YWx1ZTtcclxuXHRcdGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh1cGRhdGVEdXJhdGlvbiwgMTAwMCAvIDY2KTtcclxuXHR9O1xyXG5cclxuXHRmdW5jdGlvbiB1cGRhdGVEdXJhdGlvbigpIHtcclxuXHRcdGR1cmF0aW9uQ29udHJvbC52YWx1ZSA9IHZpZGVvLmN1cnJlbnRUaW1lO1xyXG5cdH07XHJcblxyXG5cdGZ1bmN0aW9uIHNvdW5kT2ZmKCkge1xyXG5cclxuXHRcdGlmICh2aWRlby52b2x1bWUgPT09IDApIHtcclxuXHRcdFx0dmlkZW8udm9sdW1lID0gc291bmRMZXZlbDtcclxuXHRcdFx0c291bmRDb250cm9sLnZhbHVlID0gc291bmRMZXZlbCAqIDEwO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c291bmRMZXZlbCA9IHZpZGVvLnZvbHVtZTtcclxuXHRcdFx0dmlkZW8udm9sdW1lID0gMDtcclxuXHRcdFx0c291bmRDb250cm9sLnZhbHVlID0gMDtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRmdW5jdGlvbiBjaGFuZ2VTb3VuZFZvbHVtZSgpIHtcclxuXHRcdHZpZGVvLnZvbHVtZSA9IHNvdW5kQ29udHJvbC52YWx1ZSAvIDEwO1xyXG5cdFx0Y29uc29sZS5sb2codmlkZW8udm9sdW1lKVxyXG5cdH1cclxufTsiLCIvKiBTbGlkZXIqL1xyXG5jb25zdCBzbGlkZSA9IChmdW5jdGlvbiAoKSB7XHJcblx0Y29uc3QgbGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2J1dHRvbi1wcmV2Jyk7XHJcblx0Y29uc3QgcmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19idXR0b24tbmV4dCcpO1xyXG5cdGxldCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19saXN0Jyk7XHJcblx0Y29uc3QgY29tcHV0ZWQgPSBnZXRDb21wdXRlZFN0eWxlKHNsaWRlcik7XHJcblx0bGV0IHNjcm9sbCA9IHRydWU7XHJcblx0bGV0IHNsd2lkdGggPSBwYXJzZUludChjb21wdXRlZC53aWR0aCk7XHJcblxyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRjdXJyZW50UmlnaHQgPSAwO1xyXG5cdFx0c2xpZGVyLnN0eWxlLnJpZ2h0ID0gY3VycmVudFJpZ2h0O1xyXG5cdFx0c2x3aWR0aCA9IHBhcnNlSW50KGNvbXB1dGVkLndpZHRoKTtcclxuXHR9LCB0cnVlKTtcclxuXHJcblx0dmFyIHNsaWRlckNvdW50ZXIgPSBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoO1xyXG5cclxuXHRsZXQgc2xpZGVNb3ZlID0gZnVuY3Rpb24gKG9yaWVudGF0aW9uKSB7XHJcblx0XHRvcmllbnRhdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0aWYgKHNjcm9sbCkge1xyXG5cdFx0XHRcdHNjcm9sbCA9IGZhbHNlO1xyXG5cdFx0XHRcdGxldCBjdXJyZW50UmlnaHQgPSBwYXJzZUludChjb21wdXRlZC5yaWdodCk7XHJcblxyXG5cdFx0XHRcdGlmIChjdXJyZW50UmlnaHQgPCAoc2xpZGVyQ291bnRlciAtIDEpICogc2x3aWR0aCAmJiBvcmllbnRhdGlvbiA9PSByaWdodCkge1xyXG5cdFx0XHRcdFx0c2xpZGVyLnN0eWxlLnJpZ2h0ID0gY3VycmVudFJpZ2h0ICsgc2x3aWR0aCArICdweCc7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChjdXJyZW50UmlnaHQgPj0gKHNsaWRlckNvdW50ZXIgLSAxKSAqIHNsd2lkdGggJiYgb3JpZW50YXRpb24gPT0gcmlnaHQpIHtcclxuXHRcdFx0XHRcdHNsaWRlci5zdHlsZS5yaWdodCA9IGN1cnJlbnRSaWdodCAtIChzbGlkZXJDb3VudGVyIC0gMSkgKiBzbHdpZHRoICsgJ3B4JztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGN1cnJlbnRSaWdodCA+IDAgJiYgb3JpZW50YXRpb24gPT0gbGVmdCkge1xyXG5cdFx0XHRcdFx0c2xpZGVyLnN0eWxlLnJpZ2h0ID0gY3VycmVudFJpZ2h0IC0gc2x3aWR0aCArICdweCc7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChjdXJyZW50UmlnaHQgPD0gMCAmJiBvcmllbnRhdGlvbiA9PSBsZWZ0KSB7XHJcblx0XHRcdFx0XHRzbGlkZXIuc3R5bGUucmlnaHQgPSBjdXJyZW50UmlnaHQgKyAoc2xpZGVyQ291bnRlciAtIDEpICogc2x3aWR0aCArICdweCc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0c2Nyb2xsID0gdHJ1ZTtcclxuXHRcdFx0XHR9LCA1MDApO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblx0bGV0IGFkZExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHNsaWRlTW92ZShyaWdodCk7XHJcblx0XHRzbGlkZU1vdmUobGVmdCk7XHJcblx0fVxyXG5cdHJldHVybiB7IGluaXQ6IGFkZExpc3RlbmVycyB9XHJcbn0pKCk7XHJcbnNsaWRlLmluaXQoKTtcclxuXHJcbmxldCBJbmdyZWRpZW50cyA9ICgpID0+IHtcclxuXHRsZXQgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlcl9fbGlzdCcpO1xyXG5cdGxldCBjb21wb3NpdGlvbkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXBvc2l0aW9uX19kcm9wZG93bi1jbG9zZScpO1xyXG5cdHNsaWRlci5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb3NpdGlvbikge1xyXG5cdFx0Y29tcG9zaXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGxldCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcG9zaXRpb24tLWFjdGl2ZScpO1xyXG5cdFx0XHRpZiAoIWFjdGl2ZSkge1xyXG5cdFx0XHRcdGNvbXBvc2l0aW9uLmNsYXNzTGlzdC5hZGQoJ2NvbXBvc2l0aW9uLS1hY3RpdmUnKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb21wb3NpdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdjb21wb3NpdGlvbi0tYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRjb21wb3NpdGlvbkNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcImNvbXBvc2l0aW9uXCIpIHtcclxuXHRcdFx0XHRjb21wb3NpdGlvbi5jbGFzc0xpc3QucmVtb3ZlKFwiY29tcG9zaXRpb24tLWFjdGl2ZVwiKTtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH0pXHJcbn07XHJcbkluZ3JlZGllbnRzKCk7XHJcbi8vIGxldCBJbmdyZWRpZW50cyA9ICgpID0+IHtcclxuLy8gXHRsZXQgY29tcG9zaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcG9zaXRpb24nKTtcclxuLy8gXHRsZXQgY29tcG9zaXRpb25DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wb3NpdGlvbl9fZHJvcGRvd24tY2xvc2UtcGljJyk7XHJcbi8vIFx0Y29tcG9zaXRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4vLyBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyBcdFx0dmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuLy8gXHRcdGxldCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcG9zaXRpb24tLWFjdGl2ZScpO1xyXG4vLyBcdFx0dmFyIGVsZW0gPSB0YXJnZXQuY2xvc2VzdCgnLmNvbXBvc2l0aW9uJyk7XHJcbi8vIFx0XHRpZiAoIWFjdGl2ZSkge1xyXG4vLyBcdFx0XHRlbGVtLmNsYXNzTGlzdC5hZGQoJ2NvbXBvc2l0aW9uLS1hY3RpdmUnKTtcclxuLy8gXHRcdFx0Ly8gfSBlbHNlIHtcclxuLy8gXHRcdFx0Ly8gXHRlbGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBvc2l0aW9uLS1hY3RpdmUnKTtcclxuLy8gXHRcdFx0Ly8gfVxyXG4vLyBcdFx0fVxyXG4vLyBcdH0pO1xyXG4vLyBcdGNvbXBvc2l0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbi8vIFx0XHRjb21wb3NpdGlvbi5jbGFzc0xpc3QuYWRkKCdjb21wb3NpdGlvbi0tYWN0aXZlJyk7XHJcbi8vIFx0fSk7XHJcblxyXG4vLyBcdGNvbXBvc2l0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbi8vIFx0XHRjb21wb3NpdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdjb21wb3NpdGlvbi0tYWN0aXZlJyk7XHJcbi8vIFx0fSk7XHJcbi8vIFx0Y29tcG9zaXRpb25DbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4vLyBcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuLy8gXHRcdGNvbXBvc2l0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBvc2l0aW9uLS1hY3RpdmUnKTtcclxuLy8gXHR9KTtcclxuLy8gXHRjb21wb3NpdGlvbkNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBlID0+IHtcclxuLy8gXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbi8vIFx0XHRjb21wb3NpdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdjb21wb3NpdGlvbi0tYWN0aXZlJyk7XHJcbi8vIFx0fSk7XHJcbi8vIH1cclxuLy8gSW5ncmVkaWVudHMoKTtcclxuXHJcbi8vICAgJCgnLmNvbXBvc2l0aW9uX19kcm9wZG93bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4vLyAgICAgdmFyIGVsZW0gPSAkKGUudGFyZ2V0KS5jbG9zZXN0KGNvbXBvc2l0aW9uKTtcclxuLy8gICAgIGlmIChlbGVtLmxlbmd0aCkge1xyXG4vLyAgICAgICBlbGVtLnRvZ2dsZUNsYXNzKCdjb21wb3NpdGlvbi0tYWN0aXZlJyk7XHJcbi8vICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICBjb21wb3NpdGlvbi5yZW1vdmVDbGFzcygnY29tcG9zaXRpb24tLWFjdGl2ZScpO1xyXG4vLyAgICAgfVxyXG4vLyAgIH0pO1xyXG4vLyB9KTtcclxuXHJcbi8vIGNvbnN0IGxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyX19idXR0b24tcHJldicpO1xyXG4vLyBjb25zdCByaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2J1dHRvbi1uZXh0Jyk7XHJcbi8vIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXJfX2xpc3QnKTtcclxuLy8gdmFyIHNsaWRlckNvdW50ZXIgPSBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoO1xyXG4vLyBsZXQgcG9zaXRpb24gPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHNsaWRlcikucmlnaHQpO1xyXG5cclxuLy8gcmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbi8vIFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuLy8gXHRjb25zb2xlLmxvZyhwb3NpdGlvbik7XHJcbi8vIFx0aWYgKHBvc2l0aW9uIDwgMCkge1xyXG4vLyBcdFx0c2xpZGVyLnN0eWxlLnJpZ2h0ID0gcG9zaXRpb24gLSAoc2xpZGVyQ291bnRlciAtIDEpICsgJyUnO1xyXG4vLyBcdH0gZWxzZSB7XHJcbi8vIFx0XHRzbGlkZXIuc3R5bGUucmlnaHQgPSBwb3NpdGlvbiArIDEwMCArICclJztcclxuLy8gXHR9XHJcbi8vIFx0bGVmdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuLy8gXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbi8vIFx0XHRjb25zb2xlLmxvZyhwb3NpdGlvbik7XHJcbi8vIFx0XHRpZiAocG9zaXRpb24gPiAwKSB7XHJcbi8vIFx0XHRcdHNsaWRlci5zdHlsZS5yaWdodCA9IHBvc2l0aW9uICsgKHNsaWRlckNvdW50ZXIgKyAxKSArICclJztcclxuXHJcbi8vIFx0XHR9IGVsc2Uge1xyXG4vLyBcdFx0XHRzbGlkZXIuc3R5bGUucmlnaHQgPSBwb3NpdGlvbiArICclJztcclxuXHJcbi8vIFx0XHR9O1xyXG4vLyBcdFx0cmV0dXJuIHNsaWRlckNvdW50ZXIrKztcclxuLy8gXHR9KVxyXG5cclxuLy8gfSk7Il19
