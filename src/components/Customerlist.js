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


export default function Customerlist() {

    const gridRef = useRef();
    const [cars, setCars] = useState([]);
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
            field: 'links.href',
            
        }
        
    ]

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCars(data.content))
        console.log("customers")
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
          </ul>
        </nav>
        <h1>Customer List</h1>
        <div className="ag-theme-material"style={{height: '900px', width: '90%', margin: 'auto'}} >
            <AgGridReact className='grid'
            columnDefs={columns}
            rowData={cars}
            animateRows={true}
            ref={gridRef}
            onGridReady={params => gridRef.current = params.api}
            rowSelection='single'>
            </AgGridReact>
            </div>
        </div>
    );
}