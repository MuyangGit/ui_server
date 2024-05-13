import "./middle.css"

import LiveLocation from "./chart-live-location"
import TimeLine from "./chart-timeline"

export default function Middle() {
    return (
        <div id="middle-row" className="body-top-block">
            <div id="timeline">
                <TimeLine />
            </div>
            <div id="middle-right">
                <div id="live-location">
                    <LiveLocation />
                </div>
                <div id="live-status">
                    status
                </div>
            </div>
        </div>
        )
    }