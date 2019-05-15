import React, { Component } from 'react';
import { BrowserRouter, Route, Link ,Switch} from "react-router-dom";
class Navbar extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="navbar navbar-expand-sm bg-light justify-content-center">
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="/">HOME</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/users">users</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/customers?user=5cda1daa39dc4b4cbb831474">customers</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/orders?user=5cda1daa39dc4b4cbb831474&customer=5ccfa3c28e822a0ed97a867a">orders</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/status">status</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/status_transfer">status_transfer</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/products">products</Link></li>
                </ul>
            </nav>
        );
    }
}
 
export default Navbar;