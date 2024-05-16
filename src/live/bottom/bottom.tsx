import { useState } from 'react';
import './bottom.css'
import ChartComponent from './chart'
import { CatSelection, DateInput, TimeFromInput, TimeToInput } from "./chart_meta"

export default function Bottom() {

    const [endTime, setEndTime] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date(endTime.getTime() - 60 * 60 * 1000));
    const [catId, setCatId] = useState(0);

    function setDate (endTime:any) {
        setEndTime(endTime);
        setStartTime(new Date(endTime.getTime() - 60 * 60 * 1000))
        }

    return (
        <div id="bottom-row" className="body-top-block">
            <div id="selection-bar">
                <DateInput date={endTime} onDateChange={setDate} />
                <TimeFromInput startTime={startTime} onStartTimeChange={setStartTime} />
                <TimeToInput endTime={endTime} onEndTimeChange={setEndTime} />
                <CatSelection catId={catId} onCatIDChange={setCatId} />
            </div>
            <ChartComponent startDate={startTime} endDate={endTime} catId={catId} />
        </div>
        )
    }