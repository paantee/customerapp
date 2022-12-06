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
import Addtraining from "./Addtraining";
import moment from "moment";
import { PropertyKeys } from "ag-grid-community";

export default function Traininglist() {


  const gridRef = useRef();
  const [training, setTraining] = useState([]);
  const [open, setOpen] = useState(false);
  
  useEffect(() => fetchData(), []);
  
  const columns = [
      {
          field: 'date',
          sortable: true,
          filter: true,
          valueFormatter: (params) => moment(params.value).format('DD/MM/YYYY HH:mm')
      },
      {
          field: 'duration',
          sortable: true,
          filter: true
      },
      {
          field: 'activity',
          sortable: true,
          filter: true
      },
      {
        field: 'customer',
        sortable: true,
        filter: true,
        valueGetter: (params) => params.data.customer.firstname + ' ' + params.data.customer.lastname
      },
      {
          sortable: false,
          filter: false,
          width: 120,
          headerName: '',
          field: 'id',
          cellRenderer: row => <Button color = 'error' startIcon={<DeleteIcon />} onClick={() => deleteTraining(row.value)}>Delete</Button>
      }
      
  ]
  
  const fetchData = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTraining(data))
      console.log("trainings")
  }
  

  const deleteTraining = (id) => {
    if (window.confirm('Are you sure?')) {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + id, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
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
            
            </li>
          </ul>
        </nav>
          <h1>Training List</h1>
        <div className="ag-theme-material"style={{height: '800px', width: '50%', margin: 'auto'}} >
            <AgGridReact className='grid'
            columnDefs={columns}
            rowData={training}
            animateRows={true}
            ref={gridRef}
            onGridReady={params => gridRef.current = params.api}
            rowSelection='single'>
            </AgGridReact>
            </div>

        </div>
    );
}