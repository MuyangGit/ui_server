import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export const DateInput = ({date, onDateChange}:any) => {
    return (
        <DatePicker
            id="chart-date"
            onChange={(date: any) => onDateChange(date)}
            selected={date}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            placeholderText="Select a date"
        />
        )
    }

export const TimeFromInput = ({startTime, onStartTimeChange}:any) => {
    return (
            <DatePicker
                id="chart-start-time"
                selected={startTime}
                onChange={(date: any) => onStartTimeChange(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="form-control"
                placeholderText="Select a time"
            />
        )
    }

export const TimeToInput = ({endTime, onEndTimeChange}:any) => {

    return (
            <DatePicker
                id="chart-end-time"
                selected={endTime}
                onChange={(date: any) => onEndTimeChange(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="form-control"
                placeholderText="Select a time"
            />
        )
    }

export const CatSelection = ({catId, onCatIDChange}:any) => {
    console.log(catId, catId===0)
    return (
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className= {`btn btn-sm btn-light ${catId === 0 ? 'active' : ''}`}>
            <input type="radio" name="options" id="option_qb" onChange={() => onCatIDChange(0)} checked={catId == 0} /> Qb
          </label>
          <label className={`btn btn-sm btn-light ${catId === 1 ? 'active' : ''}`}>
            <input type="radio" name="options" id="option_qbo" onChange={() => onCatIDChange(1)} checked={catId == 1} /> Qbo
          </label>
          <label className={`btn btn-sm btn-light ${catId === 2 ? 'active' : ''}`}>
            <input type="radio" name="options" id="option_yuki" onChange={() => onCatIDChange(2)} checked={catId == 2} /> Yuki
          </label>
        </div>
        )
    }