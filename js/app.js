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


window.onload = function() {
		let video = document.querySelector("#player"); 
		
    video.addEventListener('click', playStop);
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length;i++){
        playButtons[i].addEventListener('click', playStop);
    }

		let soundButton = document.querySelector('.sound__mic');
    soundButton.addEventListener('click', soundOff);

    let durationControl = document.querySelector('.duration__range');
    durationControl.addEventListener('mousedown', stopInterval);
    durationControl.addEventListener('click', setVideoDuration)

    durationControl.min = 0;
		durationControl.value = 0;    
		
		let soundControl = document.querySelector('.sound__range');
    soundControl.addEventListener('mouseup', changeSoundVolume); 
	
		soundControl.min = 0;
    soundControl.max = 10;

    soundControl.value = soundControl.max;

		let videoPlayButton = document.querySelector('.video__player-pic');
    let toolPlayButton = document.querySelector('.duration__play');

    video.addEventListener('ended', function(){
        videoPlayButton.classList.toggle('video__player-pic--active');
        toolPlayButton.classList.toggle('duration__play--active');
        video.currentTime = 0;
		})
	
		let intervalId;
		function playStop(){
			
			videoPlayButton.classList.toggle('video__player-pic--active');
			toolPlayButton.classList.toggle('duration__play--active');
			durationControl.max = video.duration;

    if (video.paused){

        video.play();
        intervalId = setInterval(updateDuration,1000/66)
        
    }else{

        video.pause();  
        clearInterval(intervalId);
				
			};
		};
		
	function stopInterval() {
		video.pause();
		clearInterval(intervalId);
	};

function setVideoDuration(){
    if (video.paused){
        video.play();
    }else{
        video.pause();  
    }
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration,1000/66);
};

function updateDuration(){    
    durationControl.value = video.currentTime;
};

function soundOff(){    

    if (video.volume === 0){
        video.volume = soundLevel;
        soundControl.value = soundLevel*10;
    }else{
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }    
};

function changeSoundVolume(){
    video.volume = soundControl.value/10; 
    console.log(video.volume) 
}
};

ymaps.ready(init);

var placemarks = [
	{
		latitude: 59.96956006,
		longitude: 30.31144850,
		hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
		balloonContent: [
			'<div class="map__balloon">',
			'<img class="map__burger-img" src="./icons/map-marker.svg" alt="Бургер"/>',
			'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19. ',
			'Работаем с 10:00 до 20:00',
			'</div>'
		]
	},
	{
		latitude: 59.93995106, 
		longitude: 30.25081200,
		hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
		balloonContent: [
			'<div class="map__balloon">',
			'<img class="map__burger-img" src="./icons/map-marker.svg" alt="Бургер"/>',
			'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д 64. ',
			'Работаем с 10:00 до 20:00',
			'</div>'
		]
	},
	{
		latitude: 59.92953756,
		longitude: 30.33999700,
		hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
		balloonContent: [
			'<div class="map__balloon">',
			'<img class="map__burger-img" src="./icons/map-marker.svg" alt="Бургер"/>',
			'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д. 56. ',
			'Работаем с 10:00 до 20:00',
			'</div>'
		]
	},
	{
		latitude: 59.92651036,  
		longitude: 30.41366645,  
		hintContent: '<div class="map__hint"> Новочеркасский проспект, д.47 к.1 </div>',
		balloonContent: [
			'<div class="map__balloon">',
			'<img class="map__burger-img" src="./icons/map-marker.svg" alt="Бургер"/>',
			'Самые вкусные бургеры у нас! Заходите по адресу:Новочеркасский проспект, д.47 к.1. ',
			'Работаем с 10:00 до 20:00',
			'</div>'
		]
	}
],
	geoObjects = [];

function init() {
	var map = new ymaps.Map('map', {
		center: [59.938480, 30.312480],
		zoom: 13,
		controls: ['zoomControl'],
		behaviors: ['drag']
	});

	placemarks.forEach( function(obj) {
		let geoObjects = new ymaps.Placemark([obj.latitude, obj.longitude], {
				hintContent: obj.hintContent,
				balloonContent: obj.balloonContent.join('')
		},
		{
				iconLayout: 'default#image',
				iconImageHref: './icons/map-marker.svg',
				iconImageSize: [46,57],
				iconOffset: [-23,-57]
		});
	map.geoObjects.add(geoObjects);
});
}