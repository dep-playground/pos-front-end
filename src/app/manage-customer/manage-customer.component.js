
import manageCustomer from './manage-customer.component.html';
import style from './manage-customer.component.scss';

$("app-manage-customer").replaceWith('<div id="manage-customer" class="d-none">' + manageCustomer + '</div>');
var html = '<style>' + style + '</style>';
$("#manage-customer").append(html);



