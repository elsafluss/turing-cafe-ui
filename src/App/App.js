import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      reservations: [],
      name: '',
      date: '',
      time: '',
      number: '',
      id: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/reservations')
    .then(response => response.json())
    .then(response => this.setState({ reservations: response }))
    .catch(error => console.log(error))
  }

  saveReservation(reservation) {
    fetch('http://localhost:3001/api/v1/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservation)
    })
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
      number: this.state.number,
      id: Date.now()
    }
    this.setState({ reservations: [...this.state.reservations, newReservation]})
    this.saveReservation(newReservation)
    this.clearInputs()
  }

  deleteReservation = (event) => {
    event.preventDefault()
    const id = Number(event.target.closest('div').id)
    fetch(`http://localhost:3001/api/v1/reservations/${id}`, {
      method: "DELETE"
    })
    .then(response => console.log(response.json()))
    .catch(error => console.log(error))
    const updatedReservations = this.state.reservations.filter(item => item.id !== id)
    this.setState({ reservations: updatedReservations })    
  }

  render() {
    const showReservations = this.state.reservations.map(item => 
      <div className="resy" key={item.id} id={item.id}>
        <p className="resy-name" key={item.name}>for: {item.name}</p>
        <p className="resy-date" key={item.date}>on: {item.date}</p>
        <p className="resy-time" key={item.time}>at: {item.time}</p>
        <p className="resy-number" key={item.number}>guests: {item.number}</p>
        <button className="cancel" onClick={this.deleteReservation}>Cancel Reservation</button>
      </div>
    )
    return (
      <div className="App">
        <h1 className='app-title'>Turing Cafe Reservations</h1>
        <form className='resy-form'>
          <input className="name-input" type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange}></input>
          <input className="date-input" type="date" name="date" placeholder="date" value={this.state.date} onChange={this.handleChange}></input>
          <input className="time-input" type="time" name="time" placeholder="time" value={this.state.time} onChange={this.handleChange}></input>
          <input className="number-input" type="number" name="number" placeholder="number" value={this.state.number} onChange={this.handleChange}></input>
          <button className="submit-button" type='submit' onClick={this.addReservation}>Make Reservation</button>
        </form>
        <div className='resy-container'>
          <>
          {showReservations}
          </>
        </div>
      </div>
    )
  }
}

export default App;
