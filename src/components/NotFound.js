import { Button } from "@mui/material";
import {  BrowserRouter,  Routes,  Route,  Link} from "react-router-dom";


export default function NotFound() {
        return (
          <div>
            <h2>Nothing to see here!</h2>
            <p>
              <Button id="homebutton"><Link to="/">Go to the home page</Link></Button>
            </p>
          </div>
        );
      }

