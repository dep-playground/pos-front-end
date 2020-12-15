
import manageCustomer from './manage-customer.component.html';
import style from './manage-customer.component.scss';

import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { deleteCustomer, getAllCustomers } from '../service/customer.service';

$("app-manage-customer").replaceWith('<div id="manage-customer" class="d-none">' + manageCustomer + '</div>');
var html = '<style>' + style + '</style>';
$("#manage-customer").append(html);

let dataTable: any = null;
let customerSelected: boolean = false;

async function loadAllCustomers() {

    customerSelected = false;

    let customers = await getAllCustomers();

    if (dataTable){
        ($("#tbl-customers") as any).DataTable().destroy();
        $("#tbl-customers tbody tr").remove();
   } 
   

    for (const customer of customers) {
        $("#tbl-customers tbody").append(`
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
        `)
    }
    dataTable = ($("#tbl-customers") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 5,
        "ordering": false
    });
    //dataTable.page(Math.ceil(customers.length / 5)-1).draw(false);

    $("#cus-count").text(customers.length)

}

$("#tbl-customers tbody").on('click', 'tr .fas', async (event: Event)=>{
    let id = ($(event.target as any).parents("tr").find("td:first-child").text());
    try{
        await deleteCustomer(id);
        alert("Customer has been deleted successfully");
        loadAllCustomers();
    }catch(error){
        alert("Failed to delete the customer");
    }
});

loadAllCustomers();



