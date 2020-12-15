
import manageCustomer from './manage-customer.component.html';
import style from './manage-customer.component.scss';

import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';

$("app-manage-customer").replaceWith('<div id="manage-customer" class="d-none">' + manageCustomer + '</div>');
var html = '<style>' + style + '</style>';
$("#manage-customer").append(html);



