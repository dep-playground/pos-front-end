import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min';
import 'admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min';
import 'admin-lte/dist/js/adminlte';
import app from  './app.component.html';

import style from './app.component.scss';

$("app-root").replaceWith('<div id="app">' + app + '</div>');
var html = '<style>' + style  +'</style>';
$("#app").append(html);


$("#app #main-menu a").click(function () {
    $("#main-menu a").removeClass("active");
    $(this).addClass("active");
    $("#app #outlet>div").addClass("d-none");
    switch ($(this).attr("data-menu")) {
        case "DASHBOARD":
            $("#dashboard").removeClass("d-none");
            break;
        case "MANAGE_CUSTOMERS":
            $("#manage-customer").removeClass("d-none");
            break;
        case "MANAGE_ITEMS":
            $("#manage-item").removeClass("d-none");
            break;
        case "PLACE_ORDERS":
            $("#place-order").removeClass("d-none");
            break;
        default:
            break;
    }
});
