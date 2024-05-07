
import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";

export default function TrainingGrid(props) {
    const gridRef = useRef();

    const columns = [
        {
            headerName: "Date",
            field: "date",
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
        {
            headerName: "Duration",
            field: "duration",
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
        {
            headerName: "Activity",
            field: "activity",
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
        {
            headerName: "Firstname",
            field: "customer.firstname",
            valueGetter: (params) => {
                const customer = params.data.customer;
                if (customer && customer.firstname) {
                    return `${customer.firstname}`;
                }
                else {
                    return '';
                }
            },
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
        {
            headerName: "Lastname",
            field: "customer.lastname",
            valueGetter: (params) => {
                const customer = params.data.customer;
                if (customer && customer.lastname) {
                    return `${customer.lastname}`
                }
                else {
                    return '';
                }
            },
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
        {
            cellRenderer: params =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => props.deleteTraining(params)}>
                    Delete
                </Button>,
            width: 120
        }
    ];

    return (
        <div className="ag-theme-material" style={{ height: '700px', width: '95%', margin: 'auto' }}>
            <AgGridReact
                rowData={props.trainings}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={8}
                rowSelection="single"
                onGridReady={params => gridRef.current = params.api}
            />
        </div>
    );
}