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
			let currentRight = parseInt(computed.right);

			if (currentRight < (sliderCounter - 1) * slwidth && orientation == right) {
				slider.style.right = currentRight + slwidth + 'px';
			}else if(currentRight > (sliderCounter - 1) * slwidth && orientation == right){
				slider.style.right =currentRight - sliderCounter * slwidth + 'px';

			}
			if (currentRight > 0 && orientation == left) {
				slider.style.right = currentRight - slwidth + 'px';
			}else if(currentRight < 0 && orientation == left){
				slider.style.right =currentRight + (sliderCounter) * slwidth + 'px';
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