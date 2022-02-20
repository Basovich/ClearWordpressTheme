// assets
import './assets/libs/animation_stopper.min.js';
import './assets/libs/scroll-locker';
import './assets/polyffils/polyfills-closest';
import 'core-js/stable/dom-collections/for-each';

// main function



// Init Functions
window.addEventListener('load', HandleOnLoadPage);

function HandleOnLoadPage() {
    initStopAnimationOnResize();
}