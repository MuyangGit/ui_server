import './App.css'

import { useState } from 'react';
import Menu from "./menu/menu.tsx"
import LiveBody from "./live/body.tsx"
import AnalysisBody from "./analysis/analysis_body"
import ReportBody from "./report/report_body"
import AccountBody from "./account/account_body"


export default function App() {
    const [selectedMenu, setSelectedMenu] = useState('live');

    const renderBody = () => {
        switch (selectedMenu) {
            case 'live':
                return <LiveBody />;
            case 'analysis':
                return <AnalysisBody />;
            case 'report':
                return <ReportBody />;
            case 'account':
                return <AccountBody />;
            default:
                return <LiveBody />;
        }
    };

    return (
        <>
            <Menu selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
            <div id="content">
                {renderBody()}
            </div>
        </>
    );
}
