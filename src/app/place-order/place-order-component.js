import placeOrder from './place-order-component.html';
import style from './place-order-component.scss';

$("app-place-order").replaceWith('<div id="place-order" class="d-none">' + placeOrder + '</div>');
var html = '<style>' + style + '</style>';
$("#place-order").append(html);