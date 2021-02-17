import React, { Component } from 'react';
import './App.css';



class App extends Component {
  constructor() {
    super()
    this.state = {
      reservations: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/reservations')
    .then(response => response.json())
    .then(response => this.setState({ reservations: response }))
    .catch(error => console.log(error))
  }

  render() {
    const showReservations = this.state.reservations.map(item => 
      <>
        <p key={`${item.id}${item.name}`}>{item.name}</p>
        <p key={`${item.id}${item.date}`}>{item.date}</p>
        <p key={`${item.id}${item.number}`}>{item.number}</p>
        <p key={`${item.id}${item.time}`}>{item.time}</p>
      </>
    )
    return (
      <div className="App">
        <h1 className='app-title'>Turing Cafe Reservations</h1>
        <div className='resy-form'>

        </div>
        <div className='resy-container'>
          {showReservations}
        </div>
      </div>
    )
  }
}

export default App;
