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
	})
	content = document.querySelector('#overlay').innerHTML;
};
let content = document.querySelector('#overlay').innerHTML;
reviewOpen(content);