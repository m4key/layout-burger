/* Hamburger menu */
let hamburger = options => {
	let button = document.querySelector(options.button);
	let menu = document.querySelector(options.menu);
	let list = document.querySelector(".popup-menu__list");

	let _openMenu = e => {
		e.preventDefault();
		menu.classList.toggle("popup-menu--active");
		button.classList.toggle("hamburger-menu-link--active");
		document.body.classList.toggle("lock");
	};

	let _closeMenu = e => {
		e.preventDefault();

		if (e.target.className === "popup-menu__link") {
			menu.classList.remove("popup-menu--active");
			button.classList.remove("hamburger-menu-link--active");

			document.body.classList.remove("lock");
		}
	};

	let addListeners = () => {
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

/* Slider*/
const slide = (function () {
	const left = document.querySelector('.slider__button-prev');
	const right = document.querySelector('.slider__button-next');
	const slider = document.querySelector('.slider__list');
	const computed = getComputedStyle(slider);
	let scroll=true;
	let slwidth = parseInt(computed.width);
	
	window.addEventListener('resize', function () {
		currentRight = 0;
		slider.style.right = currentRight;
		slwidth = parseInt(computed.width);
	}, true);

	var sliderCounter = slider.children.length;

	let slideMove = function (orientation) {
		orientation.addEventListener('click', function (e) {
			e.preventDefault();
			if (scroll) {
				scroll = false;
				let currentRight = parseInt(computed.right);

				if (currentRight < (sliderCounter - 1) * slwidth && orientation == right) {
					slider.style.right = currentRight + slwidth + 'px';
				} else if (currentRight >= (sliderCounter - 1) * slwidth && orientation == right) {
					slider.style.right = currentRight - (sliderCounter - 1) * slwidth + 'px';
				}
				if (currentRight > 0 && orientation == left) {
					slider.style.right = currentRight - slwidth + 'px';
				} else if (currentRight <= 0 && orientation == left) {
					slider.style.right = currentRight + (sliderCounter - 1) * slwidth + 'px';
				}
				setTimeout(function(){
					scroll=true;
				}, 500);
			}
		});
	}
	let addListeners = function () {
		slideMove(right);
		slideMove(left);
	}
	return { init: addListeners }
})();
slide.init();

let Ingredients = () => {
	let ingredientsButton = document.querySelector('.composition');
	let ingredientsCloseButton = document.querySelector('.composition__dropdown-close');

	ingredientsCloseButton.addEventListener('click', e => {
		e.preventDefault();

		ingredientsButton.classList.remove('composition--active');
	});
	ingredientsCloseButton.addEventListener('touchstart', e => {
		e.preventDefault();

	ingredientsButton.classList.remove('composition--active');
	});

	let active = document.querySelector('.composition--active');
	if (active) {
		ingredientsButton.addEventListener('click', e => {
			e.preventDefault();
		ingredientsButton.classList.add('composition--active');
		});
	}
	ingredientsButton.addEventListener('mouseenter', () => {
		ingredientsButton.classList.add('composition--active');
	});

	ingredientsButton.addEventListener('mouseleave', () => {
		ingredientsButton.classList.remove('composition--active');
	});
};
Ingredients();

// $(function () {
//   var composition = $('.composition');

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

/* Accordion*/
let accordionTeam = () => {
	let accordionLink = document.querySelectorAll('.accordion__link');
	accordionLink.forEach(function (memberName) {
		memberName.addEventListener('click', function (e) {
			e.preventDefault();
			let activeMember = document.querySelector('.accordion__item.is-active');
			if (activeMember) {
				let accordionDetails = activeMember.querySelector('.accordion__desc');
				accordionDetails.style.height = '0px';
				activeMember.classList.remove('is-active');
			}

			if (!activeMember || activeMember.querySelector('.accordion__link') !== e.target) {
				let currentMember = e.target.closest('.accordion__item');
				currentMember.classList.add('is-active');

				let currentMemberInfo = currentMember.querySelector('.accordion__desc');
				currentMemberInfo.style.height = currentMemberInfo.scrollHeight + 'px';
			}
		})
	})
};
accordionTeam();
/*Vert-accordion*/
let vertAccordion = () => {
	let calcWidth = () => {
		let windowWidth = window.innerWidth;
		let links = document.querySelectorAll('.vert-accordion__link');
		let linksWidth = parseFloat(getComputedStyle(links[0]).width);

		let reqWidth = windowWidth - linksWidth * links.length;
		return reqWidth > 550 ? 550 : reqWidth;
	};
	let accordionLink = document.querySelectorAll('.vert-accordion__link');
	accordionLink.forEach(function (memberName) {
		memberName.addEventListener('click', function (e) {
			e.preventDefault();
			let activeMember = document.querySelector('.vert-accordion__item.vert-accordion__item--active');
			if (activeMember) {
				let accordionDetails = activeMember.querySelector('.vert-accordion__desc');
				accordionDetails.style.width = '0px';
				activeMember.classList.remove('vert-accordion__item--active');
			}

			if (!activeMember || activeMember.querySelector('.vert-accordion__link') !== e.target) {
				let currentMember = e.target.closest('.vert-accordion__item');
				currentMember.classList.remove('hidden');

				currentMember.classList.add('vert-accordion__item--active');
				let currentMemberInfo = currentMember.querySelector('.vert-accordion__desc');
				currentMemberInfo.style.width = calcWidth() + 'px';
			}
		})
	})
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

/* Form and Modal*/
const overlay = (function () {
	let body = document.querySelector('body');
	let link = document.createElement('a');

	link.classList.add('modal-review__close');
	link.setAttribute('href', '#');

	let openOverlay = function (modalId, content) {
		let overlay = document.querySelector(modalId);
		let innerOverlay = overlay.querySelector('.modal-review__inner');

		overlay.addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target === overlay) {
				closeOverlay(modalId);
			}
		})

		document.addEventListener('keydown', (e) => {
			if (e.keyCode == 27) {
				closeOverlay(modalId);
			}
		});
		if (content) {
			innerOverlay.innerHTML = content;
			innerOverlay.appendChild(link);
		}
		link.addEventListener('click', (e) => {
			e.preventDefault();
			closeOverlay(modalId);
		})
		overlay.classList.add('active');
		body.classList.add('locked');
	}
	let closeOverlay = function (modalId) {
		let overlay = document.querySelector(modalId);

		overlay.classList.remove('active');
		body.classList.remove('locked');
	}
	let setContent = function (modalId, content) {
		let overlay = document.querySelector(modalId);
		let innerOverlay = overlay.querySelector('.modal-review__inner');

		if (content) {
			innerOverlay.innerHTML = content;
			innerOverlay.appendChild(link);
		}
	}

	return {
		open: openOverlay,
		close: closeOverlay,
		setContent: setContent
	}
})();


var ajaxForm = function (form) {
	let formData = new FormData();

	formData.append("name", form.elements.name.value);
	formData.append("phone", form.elements.phone.value);
	formData.append("comment", form.elements.comment.value);
	formData.append("to", "amakeikin@yandex.ru");

	let url = "https://webdev-api.loftschool.com/sendmail/";

	const xhr = new XMLHttpRequest();
	xhr.responseType = "json";
	xhr.open('POST', url);
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr.send(formData);

	return xhr;
}

var submitform = function (e) {
	e.preventDefault();
	var form = e.target;
	let request = ajaxForm(form);

	request.addEventListener('load', () => {
		if (request.status >= 400) {
			let content = 'Ошибка соединения с сервером, попробуйте позже';

			overlay.open('#modal-review', `${content}. Ошибка ${request.status}`)
		} else {
			let content = request.response.message;
			overlay.open('#modal-review', content);
		}
	});
}

let myForm = document.querySelector('#main-form');
myForm.addEventListener('submit', submitform);


let reviewOpen = function (content) {
	let button = document.querySelector('#button');
	let container = document.querySelector('.reviews__list');

	container.addEventListener('click', function (e) {
		e.preventDefault();
		let target = e.target;
		if (target.className === button.className) {
			overlay.open('#modal-review', content);
		}
	});


}

content = document.querySelector('#overlay').innerHTML;
reviewOpen(content);

//////////////////

let checkMobile = () => {
	let isMobile = false;
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Opera Mobile|Kindle|Windows Phone|PSP|AvantGo|Atomic Web Browser|Blazer|Chrome Mobile|Dolphin|Dolfin|Doris|GO Browser|Jasmine|MicroB|Mobile Firefox|Mobile Safari|Mobile Silk|Motorola Internet Browser|NetFront|NineSky|Nokia Web Browser|Obigo|Openwave Mobile Browser|Palm Pre web browser|Polaris|PS Vita browser|Puffin|QQbrowser|SEMC Browser|Skyfire|Tear|TeaShark|UC Browser|uZard Web|wOSBrowser|Yandex.Browser mobile/i.test(navigator.userAgent)) isMobile = true;
	return isMobile;
};


let OnePageScroll = options => {
	let currentSection = 0;
	let content = document.querySelector('.content');
	let countSections = document.querySelectorAll('.section').length;
	let listLinks = document.querySelectorAll('[' + options.attribute + ']');
	let inscroll = false;
	
	let swipeDetected = element => {
		let startX,
			startY,
			distX,
			distY,
			deviation = 200, //deviation from main direction
			threshold = 150, //min range for swipe
			allowedTime = 1000, //max time for range
			elapsedTime, //runtime
			startTime;

		element.addEventListener('touchstart', e => {
			let touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime(); //time touch with sensor
		});

	//disable touchmove
		element.addEventListener('touchmove', e => e.preventDefault());

		element.addEventListener('touchend', e => {
			let touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX; //get horizontal move
			distY = touchobj.pageY - startY; //get vertical move
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime) {
				if (Math.abs(distY) >= threshold && Math.abs(distX) <= deviation) { //vertical swipe
					swipedir = (distY < 0) ? slideToSection(currentSection + 1) : slideToSection(currentSection - 1)
				}
			}
		});
	};
	let slideToSection = (indexSection) => {
		if (!inscroll) {
			if (indexSection >= 0 && indexSection < countSections) {
				
				currentSection = indexSection;

				inscroll = true;

				let position = indexSection * -100 + '%';

				content.style.transform = `translateY(${position})`;
				content.style.webkitTransform = `translateY(${position})`;

				

				setTimeout(() => {
					inscroll = false;
					let sideNavElements = document.querySelectorAll('.section-nav__item');
				for (let i = 0; i < sideNavElements.length; i++) {
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

	//handlers for keyboard
	document.addEventListener('keydown', e => {
		switch (e.keyCode) {
			case 40: 
				slideToSection(currentSection + 1);
				break;
			case 38: 
				slideToSection(currentSection - 1);
				break;
		}
	});

	//handlers for links
	listLinks.forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();
			let index = parseInt((e.target).getAttribute(options.attribute));
			//fix for button-down
			if (!(index >= 0)) {
				index = parseInt((e.currentTarget).getAttribute(options.attribute));
			}
			slideToSection(index);
		});
	});

	//handlers for wheel
	document.addEventListener('wheel', e => {
		let deltaY = e.deltaY;
		let index = deltaY > 0 ? currentSection + 1 : currentSection - 1;

		slideToSection(index);
	},'touchmove', e => e.preventDefault());
	
	

 //handlers for swipe
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




let video;
let durationControl; 
let soundControl;
let intervalId;

// документ полностью загружен
$().ready(function(){

    video = document.getElementById("player"); 

    // вешаем обработчик события onclick на тег video
    video.addEventListener('click', playStop);

    // обработчики событий для кнопок play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length;i++){
        playButtons[i].addEventListener('click',playStop);
    }

    // обработчик событий для кнопки динамик
    let micControl = document.getElementById("mic");
    micControl.addEventListener('click',soundOf)
    
    // обработчики событий для ползунка продолжительности видео
    durationControl = document.getElementById("durationLevel");  
    durationControl.addEventListener('mousedown', stopInterval);   
    // durationControl.addEventListener('click',setVideoDuration);
    durationControl.addEventListener('mouseup', setVideoDuration); 

    durationControl.min = 0;
    durationControl.value = 0;    

    // обработчики событий для ползунка громокости
    soundControl = document.getElementById("micLevel");    
    // soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('mouseup', changeSoundVolume); 

    // задаем максимальные и минимальные значения громокости
    soundControl.min = 0;
    soundControl.max = 10;
    // присваиваем ползунку максимальное значение
    soundControl.value = soundControl.max;

    //обрабатываем окончание видео
    video.addEventListener('ended', function () {
        $(".video__player-img").toggleClass("video__player-img--active");
        video.currentTime = 0;
    }, false);
});

/*
 Воспроизведение видео
*/
function playStop(){
    // показывает или скрывает белую кнопку play
    $(".video__player-img").toggleClass("video__player-img--active");  
    // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
    durationControl.max = video.duration;

    // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
    if (video.paused){
        // video.webkitRequestFullScreen(); //возможность открыть в полноэкранном режиме
        // запускаем видео
        video.play();
        intervalId = setInterval(updateDuration,1000/66)
        
    }else{
        // video.webkitExitFullscreen(); //выйти из полноэкранного режима
        // останавливаем видео
        video.pause();  
        clearInterval(intervalId);
        
    }
}

function stopInterval(){
    video.pause();
    clearInterval(intervalId);
}

/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration(){
    if (video.paused){
        video.play();
    }else{
        video.pause();  
    }
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration,1000/66);
}


/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration(){    
    durationControl.value = video.currentTime;
    // console.log(video.currentTime)
}


/*
    Управление звуком
*/
function soundOf(){    
    /*
        Делаем проверку уровня громкости. 
        Если у нас нашего видео есть звук, то мы его выключаем. 
        Предварительно запомнив текущую позицию громкости в переменную soundLevel
    */
    if (video.volume === 0){
        video.volume = soundLevel;
        soundControl.value = soundLevel*10;
    }else{
        /*
            Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
            Хранится в перменной soundLevel
        */
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }    
}

/*
    Управление звуком видео
*/
function changeSoundVolume(){
    /*
        Св-во volume может принимать значения от 0 до 1
        Делим на 10 для того что бы, была возможность более точной регулировки видео. 
         video.volume 0 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9  1 
   soundControl.value 0   1   2   3   4   5   6   7   8   9  10
        */
   
    video.volume = soundControl.value/10; 
    console.log(video.volume) 
}