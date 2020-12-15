import manageItem from './manage-item-component.html';
import style from './manage-item-component.scss';

$("app-manage-item").replaceWith('<div id="manage-item" class="d-none">' + manageItem + '</div>');
var html = '<style>' + style + '</style>';
$("#manage-item").append(html);
