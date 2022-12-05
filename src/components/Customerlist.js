import {Link} from"react-router-dom";
import './List.css';
import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";


export default function Customerlist() {

    const gridRef = useRef();
    const [customer, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);


    useEffect(() => fetchData(), []);

    const columns = [
        {
            field: 'firstname',
            sortable: true,
            filter: true
        },
        {
            field: 'lastname',
            sortable: true,
            filter: true
        },
        {
            field: 'streetaddress',
            sortable: true,
            filter: true
        },
        {
            field: 'postcode',
            sortable: true,
            filter: true
        },
        {
            field: 'city',
            sortable: true,
            filter: true
        },
        {
            field: 'email',
            sortable: true,
            filter: true
        },
        {
            field: 'phone',
            sortable: true,
            filter: true
        },
        {
            sortable: false,
            filter: false,
            width: 100, 
            valueGetter: (row) => row.data.links[0].href,
            cellRenderer: row => <Editcustomer updateCustomer={updateCustomer} customer={row.data} url={row.value}/>
        },
        {
            sortable: false,
            filter: false,
            width: 120,
            headerName: '',
            field: 'link',
            valueGetter: (row) => row.data.links[0].href,
            cellRenderer: row => <Button color = 'error' startIcon={<DeleteIcon />} onClick={() => deleteCustomer(row.value)}>Delete</Button>
        }
        
    ]

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        console.log("customers")
    }


    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
      }
    
      const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
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
        .then(res => fetchData())
        .catch(err => console.error(err))
      }

    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Customer List</Link>
            </li>
            <li>
              <Link to="/traininglist">Training List</Link>
            </li>
            <li>
            <Addcustomer saveCustomer={saveCustomer}/>
            </li>
          </ul>
        </nav>
        <h1>Customer List</h1>
        <div className="ag-theme-material"style={{height: '900px', width: '90%', margin: 'auto'}} >
            <AgGridReact className='grid'
            columnDefs={columns}
            rowData={customer}
            animateRows={true}
            ref={gridRef}
            onGridReady={params => gridRef.current = params.api}
            rowSelection='single'>
            </AgGridReact>
            </div>
        </div>
    );
}