import "./menu.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

export default function Menu( {selectedMenu, setSelectedMenu} ) {
    console.log("selectedMenu", selectedMenu)
    return (
        <div id="menu-row">
            <button id='logo'>Cat Monitor</button>
            <ul className="nav justify-content-end nav-pills">
                <li className="nav-item">
                    <a className={`nav-link ${selectedMenu === 'live' ? 'active' : ''}`} onClick={() => setSelectedMenu("live")} >Live</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${selectedMenu === 'report' ? 'active' : ''}`} onClick={() => setSelectedMenu("report")} >Report</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${selectedMenu === 'analysis' ? 'active' : ''}`} onClick={() => setSelectedMenu("analysis")} >Analysis</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${selectedMenu === 'account' ? 'active' : ''}`} onClick={() => setSelectedMenu("account")} >Account</a>
                </li>
            </ul>
        </div>
        )
    }