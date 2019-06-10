/* Slider*/
const slide = (function () {
	const left = document.querySelector('.slider__button-prev');
	const right = document.querySelector('.slider__button-next');
	let slider = document.querySelector('.slider__list');
	const computed = getComputedStyle(slider);
	let scroll = true;
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
				setTimeout(function () {
					scroll = true;
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
	let slider = document.querySelectorAll('.slider__list');
	let compositionClose = document.querySelector('.composition__dropdown-close');
	slider.forEach(function (composition) {
		composition.addEventListener('click', (e) => {
			e.preventDefault();
			let active = document.querySelector('.composition--active');
			if (!active) {
				composition.classList.add('composition--active');
			} else {
				composition.classList.remove('composition--active');
			}
		})
		compositionClose.addEventListener('click', (e) => {
			e.preventDefault();
			if (e.target.className === "composition") {
				composition.classList.remove("composition--active");
			};
		});
	})
};
Ingredients();
// let Ingredients = () => {
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