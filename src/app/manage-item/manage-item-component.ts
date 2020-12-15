import '../../../node_modules/admin-lte/plugins/datatables/jquery.dataTables.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/dataTables.responsive.min.js';
import '../../../node_modules/admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4.min.js';

import { Item, upItem } from '../model/item';
import { deleteItem, getAllItems, saveItem, updateItem } from '../service/item.service';
import manageItem from './manage-item-component.html';
import style from './manage-item-component.scss';

$("app-manage-item").replaceWith('<div id="manage-item" class="d-none">' + manageItem + '</div>');
var html = '<style>' + style + '</style>';
$("#manage-item").append(html);

//Global Variables
let dataTable: any = null;
let itemSelected: boolean = false;

// Functions
async function loadAllItems() {

    itemSelected = false;

    let items = await getAllItems();

    if (dataTable){
        ($("#tbl-items") as any).DataTable().destroy();
        $("#tbl-items tbody tr").remove();
   } 
   

    for (const item of items) {
        $("#tbl-items tbody").append(`
            <tr>
                <td>${item.code}</td>
                <td>${item.description}</td>
                <td>${item.qty}</td>
                <td>${item.unitprice}</td>
                <td><i data-toggle="modal" data-target="#itemexampleModal" class="fas fa-edit"></i></td>
                <td><i class="fas fa-trash"></i></td>
            </tr>
        `)
    }
    dataTable = ($("#tbl-items") as any).DataTable({
        "info": false,
        "searching": false,
        "lengthChange": false,
        "pageLength": 4,
        "ordering": false
    });
    //dataTable.page(Math.ceil(customers.length / 5)-1).draw(false);

    $("#item-count").text(items.length)

}


//--------------= Event Handlers----------------

// trash-btn
$("#tbl-items tbody").on('click', 'tr .fa-trash', async (event: Event)=>{
    let code = ($(event.target as any).parents("tr").find("td:first-child").text());
    try{
        await deleteItem(code);
        alert("Item has been deleted successfully");
        loadAllItems();
    }catch(error){
        alert("Failed to delete the item");
    }
});

// edit-btn
$("#tbl-items tbody").on('click', 'tr .fa-edit', (event: Event)=>{
    $("#txt-code").val($(event.target as any).parents("tr").find("td").eq(0).text());
    $("#txt-description").val($(event.target as any).parents("tr").find("td").eq(1).text());
    $("#txt-qty").val($(event.target as any).parents("tr").find("td").eq(2).text());
    $("#txt-unitprice").val($(event.target as any).parents("tr").find("td").eq(3).text());
    $("#txt-code").prop("disabled",true);
    itemSelected = true;
});

$("#btn-save-item").click(async ()=>{
    let code = <string> $("#txt-code").val();
    let description = <string> $("#txt-description").val();
    let qty = <string> $("#txt-qty").val();
    let unitprice = <string> $("#txt-unitprice").val();

    if(!itemSelected){

        try{
            await saveItem(new Item(code, description, +qty, unitprice));
            alert("saved!");
            loadAllItems();
        } catch (error) {
            alert("Failed!")
        }
    }else{
        try{
            await updateItem(new upItem(description, +qty, unitprice),code);
            alert("updated!");
            loadAllItems();

        }catch(error){
            alert("Failed to Update!")
        }
    }
    
});




// Call Functions
loadAllItems();