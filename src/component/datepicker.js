import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Calender extends React.Component{
    render(){
      return(
        <div>
          <DatePicker
          selected={this.props.startDate}
          onChange={this.props.handleStartDate}
          showTimeSelect
          dateFormat="MMMM d, yyyy 'at' h:mm aa"
          />
        </div>
      );
    }
}

export default Calender;
