import "./menu.css"
import React, { useState } from 'react';

export default function Menu() {
    const [mainPage, setMainPage] = useState('live');


    return (
        <div id="menu-row" className="body-top-block">
            <button id='logo'>Cat Monitor</button>
            <ul className="nav justify-content-end nav-pills">
                <li className="nav-item">
                    <a className={`nav-link ${mainPage === 'live' ? 'active' : ''}`} onClick={() => setMainPage("live")} href="#">Live</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${mainPage === 'report' ? 'active' : ''}`} onClick={() => setMainPage("report")} href="#">Report</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${mainPage === 'analysis' ? 'active' : ''}`} onClick={() => setMainPage("analysis")} href="#">Analysis</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${mainPage === 'acount' ? 'active' : ''}`} onClick={() => setMainPage("acount")} href="#">Acount</a>
                </li>
            </ul>
        </div>
        )
    }