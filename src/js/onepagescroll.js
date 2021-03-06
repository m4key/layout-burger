/* OnePageScroll */

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


	document.addEventListener('wheel', e => {
		let deltaY = e.deltaY;
		let index = deltaY > 0 ? currentSection + 1 : currentSection - 1;

		slideToSection(index);
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