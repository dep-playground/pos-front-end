import { Item, upItem } from "../model/item";

let items: Array<Item> =[];
let loaded = false;

export function getAllItems(): Promise<Array<Item>> {

    return new Promise((resolve, reject)=>{

        if(!loaded){

            $.ajax({
                method: "GET",
                url: 'http://localhost:8080/pos/items'
            }).then((data)=>{
                items = data;
                loaded = true;
                resolve(items);
            }).fail(()=>{
                reject();
            })


        }else{
            resolve(items);
        }
    

        // //(1) Initiate the XMLHttpRequest
        // let http = new XMLHttpRequest();

        // //(2) Setting up the callback function
        // http.onreadystatechange = function(){
        //     if(http.readyState === 4){
        //         items = JSON.parse(http.responseText);
        //         resolve(items);
        //     }
            
        // }

        // //(3) Let's open the request
        // http.open('GET', 'http://localhost:8080/pos/items',true);

        // //(4) If we have to set headers

        // //(5) send
        // http.send();

    });
}

export function saveItem(item: Item): Promise<void> {

    return new Promise((resolve, reject)=>{

        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/pos/items',
            contentType: 'application/json',
            data: JSON.stringify(item)
        }).then(()=>{
            items.push(item);
            resolve();
        }).fail(()=>{
            reject();
        })
    })
}

export function updateItem(item: upItem,code:string): Promise<void>{
    return new Promise((resolve, reject)=>{
        

        $.ajax({
            method: "PUT",
            url: `http://localhost:8080/pos/items?code=${code}`,
            contentType: 'application/json',
            data: JSON.stringify(item)
        }).then(()=>{
            items[items.findIndex((elm)=>elm.code===code)].description = item.description;
            items[items.findIndex((elm)=>elm.code===code)].qty = item.qty;
            items[items.findIndex((elm)=>elm.code===code)].unitprice = item.unitprice;
            resolve(); 
        }).catch(()=>{
            reject();
        })

    });
} 

export function deleteItem(code: string): Promise<void>{
    return new Promise((resolve, reject)=>{
        
/*         let http = new XMLHttpRequest();
        http.onreadystatechange = () => {
            if (http.readyState == 4) {
                if (http.status == 204){
                    customers.splice(customers.findIndex((elm)=>elm.id===id),1);
                    resolve();
                }else{
                    reject();    
                } 
            }
        };
        http.open('DELETE', `http://localhost:8080/pos/customers?id=${id}`, true);
        http.send(); */

        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/pos/items?code=${code}`
        }).then(()=>{
            items.splice(items.findIndex((elm)=>elm.code===code),1);
            resolve(); 
        }).catch(()=>{
            reject();
        })

    });
} 