import placeOrder from './place-order-component.html';
import style from './place-order-component.scss';

import '../../../node_modules/select2/dist/js/select2.full';

$("app-place-order").replaceWith('<div id="place-order" class="d-none">' + placeOrder + '</div>');
var html = '<style>' + style + '</style>';
$("#place-order").append(html);

function init(){
    $('.select2').select2()
}

init();