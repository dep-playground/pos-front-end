
import manageCustomer from './manage-customer.component.html';
import style from './manage-customer.component.scss';

import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';
import { deleteCustomer, getAllCustomers, saveCustomer, updateCustomer } from '../service/customer.service';
import { Customer, upCustomer } from '../model/customer';

$("app-manage-customer").replaceWith('<div id="manage-customer" class="d-none">' + manageCustomer + '</div>');
var html = '<style>' + style + '</style>';
$("#manage-customer").append(html);

// Global Variables
let dataTable: any = null;
let customerSelected: boolean = false;

// Functions
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
                <td><i data-toggle="modal" data-target="#cusexampleModal" class="fas fa-edit"></i></td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
        `)
    }
    dataTable = ($("#tbl-customers") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 4,
        "ordering": false
    });
    //dataTable.page(Math.ceil(customers.length / 5)-1).draw(false);

    $("#cus-count").text(customers.length)

}


//--------------= Event Handlers----------------

// trash-btn
$("#tbl-customers tbody").on('click', 'tr .fa-trash', async (event: Event)=>{
    let id = ($(event.target as any).parents("tr").find("td:first-child").text());
    try{
        await deleteCustomer(id);
        alert("Customer has been deleted successfully");
        loadAllCustomers();
    }catch(error){
        alert("Failed to delete the customer");
    }
});

// edit-btn
$("#tbl-customers tbody").on('click', 'tr .fa-edit', (event: Event)=>{
    $("#txt-id").val($(event.target as any).parents("tr").find("td").eq(0).text());
    $("#txt-name").val($(event.target as any).parents("tr").find("td").eq(1).text());
    $("#txt-address").val($(event.target as any).parents("tr").find("td").eq(2).text());
    $("#txt-id").prop("disabled",true);
    customerSelected = true;
});

$("#btn-save-customer").click(async ()=>{

    if(!customerSelected){
        let id = <string> $("#txt-id").val();
        let name = <string> $("#txt-name").val();
        let address = <string> $("#txt-address").val();

        try{
            await saveCustomer(new Customer(id, name, address));
            alert("saved!");
            loadAllCustomers();
        } catch (error) {
            alert("Failed!")
        }
    }else{
        let id = <string> $("#txt-id").val();
        let name = <string> $("#txt-name").val();
        let address = <string> $("#txt-address").val();
        try{
            await updateCustomer(new upCustomer(name, address),id);
            alert("updated!");
            loadAllCustomers();

        }catch(error){
            alert("Failed to Update!")
        }
    }
    
});




// Call Functions
loadAllCustomers();



