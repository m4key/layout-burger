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