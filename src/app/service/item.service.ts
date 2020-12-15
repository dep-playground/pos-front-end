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