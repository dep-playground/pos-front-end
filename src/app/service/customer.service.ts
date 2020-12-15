import { Customer, upCustomer } from "../model/customer";

let customers: Array<Customer> =[];
let loaded = false;

export function getAllCustomers(): Promise<Array<Customer>> {

    return new Promise((resolve, reject)=>{

        if(!loaded){
            $.ajax({
                method: "GET",
                url:  'http://localhost:8080/pos/customers'
            }).then((data)=>{
                customers = data;
                loaded = true;
                resolve(customers);
            }).fail(()=>{
                reject();
            })

        }else{
            resolve(customers);
        }

    });
}

export function saveCustomer(customer: Customer): Promise<void> {

    return new Promise((resolve, reject)=>{

        $.ajax({
            method: 'POST',
            url: 'http://localhost:8080/pos/customers',
            contentType: 'application/json',
            data: JSON.stringify(customer)
        }).then(()=>{
            customers.push(customer);
            resolve();
        }).fail(()=>{
            reject();
        })
    })
}
export function deleteCustomer(id: string): Promise<void>{
    return new Promise((resolve, reject)=>{
        
        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/pos/customers?id=${id}`
        }).then(()=>{
            customers.splice(customers.findIndex((elm)=>elm.id===id),1);
            resolve(); 
        }).catch(()=>{
            reject();
        })

    });
} 

export function updateCustomer(customer: upCustomer,id:string): Promise<void>{
    return new Promise((resolve, reject)=>{
        

        $.ajax({
            method: "PUT",
            url: `http://localhost:8080/pos/customers?id=${id}`,
            contentType: 'application/json',
            data: JSON.stringify(customer)
        }).then(()=>{
            customers[customers.findIndex((elm)=>elm.id===id)].name = customer.name;
            customers[customers.findIndex((elm)=>elm.id===id)].address = customer.address;
            resolve(); 
        }).catch(()=>{
            reject();
        })

    });
} 