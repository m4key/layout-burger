/* Yandex map*/

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

	placemarks.forEach(function (obj) {
		let geoObjects = new ymaps.Placemark([obj.latitude, obj.longitude], {
			hintContent: obj.hintContent,
			balloonContent: obj.balloonContent.join('')
		},
			{
				iconLayout: 'default#image',
				iconImageHref: './icons/map-marker.svg',
				iconImageSize: [46, 57],
				iconOffset: [-23, -57]
			});
		map.geoObjects.add(geoObjects);
	});
}