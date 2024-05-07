import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import Addcustomer from './addCustomer';
import Editcustomer from './editCustomer';
import Addtraining from './addTraining';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);



    const fetchData = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err))
    }

    const deleteCustomer = (params) => {
        if (window.confirm("Are you sure")) {
            fetch(params.data._links.customer.href, { method: "Delete" })
                .then(response => {
                    if (response.ok) {
                        fetchData();
                    }
                })
        }
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => fetchData())
            .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => fetchData())
        .catch(err => console.error(err))
    }

    const saveTrainingForCustomer = (training, customerLink) => {
        let trainingWithCustomer = {...training, customer: customerLink}
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainingWithCustomer)
        })
        .then(response => fetchData()) 
        .catch(err => console.error(err))
    }

    const [columnDefs, setColumnDefs] = useState([

        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { cellRenderer: (params) => <Addtraining saveTraining={saveTrainingForCustomer} params={params} />, },
        { cellRenderer: (params) => <Editcustomer updateCustomer={updateCustomer} params={params} />, },
        {
            cellRenderer: (params) =>
                <Button size="small" color="error" onClick={() => deleteCustomer(params)}>Delete</Button>
            , width: 120
        }

    ]);

    return (
        <>
            
            <Addcustomer saveCustomer={saveCustomer} />
            <div className="ag-theme-material" style={{ width: 1280, height: 1000 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </>
    );
}