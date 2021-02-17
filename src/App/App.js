import React, { Component } from 'react';
import './App.css';

// {name: <String>, date: <String>, time: <String>, number: <Number>}

class App extends Component {
  constructor() {
    super()
    this.state = {
      reservations: [],
      name: '',
      date: '',
      time: '',
      number: '',
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/reservations')
    .then(response => response.json())
    .then(response => this.setState({ reservations: response }))
    .catch(error => console.log(error))
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  clearInputs = () => {
    this.setState({ name: '', date: '', time: '', number: '' })
  }

  addReservation = (event) => {
    event.preventDefault()
    const newReservation = {
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
      number: this.state.number
    }
    this.setState({ reservations: [...this.state.reservations, newReservation]})
    this.clearInputs()
  }

  render() {
    const showReservations = this.state.reservations.map(item => 
      <>
        <p className="resy" key={`${item.id}${item.name}`}>{item.name}</p>
        <p className="resy" key={`${item.id}${item.date}`}>{item.date}</p>
        <p className="resy" key={`${item.id}${item.time}`}>{item.time}</p>
        <p className="resy" key={`${item.id}${item.number}`}>{item.number}</p>
      </>
    )
    return (
      <div className="App">
        <h1 className='app-title'>Turing Cafe Reservations</h1>
        <form className='resy-form'>
          <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange}></input>
          <input type="date" name="date" placeholder="date" value={this.state.date} onChange={this.handleChange}></input>
          <input type="time" name="time" placeholder="time" value={this.state.time} onChange={this.handleChange}></input>
          <input type="number" name="number" placeholder="number" value={this.state.number} onChange={this.handleChange}></input>
          <button type='submit' onClick={this.addReservation}>Make Reservation</button>
        </form>
        <div className='resy-container'>
          {showReservations}
        </div>
      </div>
    )
  }
}

export default App;
