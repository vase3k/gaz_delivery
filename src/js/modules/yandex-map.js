function initiateYandexMap() {
    if (typeof ymaps3 === 'undefined') return;

    ymaps3.ready.then(() => {
        const map = new ymaps3.YMap(document.querySelector('.footer__map'), {
            location: { center: [37.771668, 55.547159], zoom: 17 },
            controls: [], // убирает панели
        });

        // добавляем слой для маркеров
        const featuresLayer = new ymaps3.YMapDefaultFeaturesLayer();
        map.addChild(featuresLayer);

        // Слой с дорогами и зданиями
        const schemeLayer = new ymaps3.YMapDefaultSchemeLayer();
        map.addChild(schemeLayer);

        const marker = new ymaps3.YMapMarker({ coordinates: [37.771668, 55.547159] });

        const icon = document.createElement('img');
        icon.src = 'src/img/footer/footer__placeholder.svg';
        icon.alt = 'Метка офиса';
        icon.style.maxWidth = '74px';
        icon.style.height = '74px';
        icon.style.transform = 'translate(-50%, -100%)'; // якорь снизу

        marker.element = icon;

        // добавляем маркер на слой
        featuresLayer.addChild(marker);
    });
}

export default initiateYandexMap;
