import React from 'react';
import './App.css';
import { uid } from 'uid';
import Calender from './component/datepicker.js';
import ListOutput from './component/listoutput.js';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      startDate: new Date(),
      lists: [
        {id: 1, names: "Cycling", times: "Jun 25, 2022 at 07:00 AM"},
        {id: 2, names: "Play Game", times: "Jul 25, 2022 at 10:00 AM"},
        {id: 3, names: "Learn React", times: "Sept 25, 2022 at 01:00 PM"}
      ],
      idIsUpdate: null,
      statusIsUpdate: false,
      names: '',
      times: ''
    };

    this.handleStartDate = this.handleStartDate.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  };

  handleStartDate(date){
    this.setState({
      startDate: date
    });
  };
  
  handleListChange(event){
    let data = event.target.value;
    this.setState({
      names: data
    })
  }

  handleSubmit(event){
    event.preventDefault();

    let startDate = this.state.startDate;
    let hours = startDate.getHours();
    let minutes = startDate.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    let strTime = `${hours}:${minutes} ${ampm}`;
  
    let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = `${month[startDate.getMonth()]} ${startDate.getDate()}, ${startDate.getFullYear()}`;
    this.state.times = date + ' at ' + strTime

    let data = [...this.state.lists];
    if(this.state.statusIsUpdate){
      data.forEach((list) => {
        if(list.id === this.state.idIsUpdate){
          list.names = this.state.names;
          list.times = this.state.times;
        }
      })
    } else {
      data.push({
        id: uid(),
        names: this.state.names,
        times: this.state.times
      });
    }
    data.slice(0).sort((a,b) => a.times.localeCompare(b.times))
    this.setState({
      lists: data,
      names: '',
      times: '',
      idIsUpdate: null,
      statusIsUpdate: false
    })
  }

  handleDelete(id){
    let data = [...this.state.lists];
    let filterData = data.filter((list) => list.id !== id);
    this.setState({
      lists: filterData
    })
  }

  handleEdit(id){
    let data = [...this.state.lists];
    let foundData = data.find((list) => list.id === id);
    this.setState({
      names: foundData.names,
      times: foundData.times,
      idIsUpdate: id,
      statusIsUpdate: true
    })
  }

  handleReset(){
    this.setState({
      startDate: new Date(),
      lists: [      ],
      idIsUpdate: null,
      statusIsUpdate: false,
      names: '',
      times: ''
    })
  }

  render(){
    return(
      <div className='container'>
        <div className='app-wrapper'>
          <header>
            <h1>THINGS TO DO</h1>
          </header>
          <main>
            <form onSubmit={this.handleSubmit}>
              <input
              className='input-list' 
              name='names'
              type='text'
              value={this.state.names}
              onChange={this.handleListChange}
              placeholder='Add a task...'
              required
              ></input>
              <Calender 
              startDate={this.state.startDate}
              handleStartDate={this.handleStartDate}
              />
              <div className='button-form-wrapper'>
                <button className='add-button'>Add List</button>
                <button className='reset-button' onClick={this.handleReset}>Reset List</button>
              </div>
            </form> 
            <ListOutput 
              lists={this.state.lists}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          </main>
        </div>
      </div>
    )
  }
};

export default App;


