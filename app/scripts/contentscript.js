'use strict';

// Найдём в DOM id плеера
var player = document.querySelector('#player');

function removeAd() {
    // Если в DOM присутствуют элементы управления воспроизведеним рекламы, то скрываем рекламу.
    if (document.getElementsByClassName('videoAdUi').length > 0) {
        document.getElementsByClassName('video-stream html5-main-video')[0].src = '';
    }
}

function removeAdContainer() {
    // Скрываем обёртку
    var overlayAdContainer = document.getElementsByClassName('ad-container ad-container-single-media-element-annotations')[0];
    if (overlayAdContainer && overlayAdContainer.style.display !== 'none') {
        overlayAdContainer.style.display = 'none';
    }
}

function clearAds() {
    removeAd();
    removeAdContainer();
}

function DOMSTlistener(e) {
    if (e.target.innerHTML.length > 0) {
        clearAds();
    }
}

function init() {

    var videoAdContainer = document.getElementsByClassName('video-ads')[0];

    if (videoAdContainer) {
        player.removeEventListener('DOMSubtreeModified', init);
        videoAdContainer.addEventListener('DOMSubtreeModified', DOMSTlistener);
    }
}

//Вешаем обработчик событий только на YouTube
if (/https?:\/\/(\w*.)?youtube.com/i.test(window.location.href.toLowerCase())) {
    player.addEventListener('DOMSubtreeModified', init);
}
