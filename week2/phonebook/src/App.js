import React from 'react';
import axios from 'axios';

import Form from './components/Form';
import Filter from './components/Filter';
import Contacts from './components/Contacts';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filterWith: '',
    }

    this.changeName = this.changeName.bind(this);
    this.changeNumber = this.changeNumber.bind(this);
    this.filterName = this.filterName.bind(this);
    this.addName = this.addName.bind(this);
  }

  componentWillMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(({ data: persons }) => {
        this.setState({
          persons,
        });
      });
  }
  
  changeName(event) {
    this.setState({
      newName: event.target.value,
    });
  }

  changeNumber(event) {
    this.setState({
      newNumber: event.target.value,
    });
  }

  filterName(event) {
    this.setState({
      filterWith: event.target.value,
    });
  }

  addName(event) {
    event.preventDefault();
    this.setState({
      persons: this.state.persons.map(p => p.name).includes(this.state.newName)
        ? [...this.state.persons]
        : [...this.state.persons, { name: this.state.newName, number: this.state.newNumber }],
      newName: '',
      newNumber: '',
    });
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Form
          name={this.state.newName}
          changeName={this.changeName}
          addName={this.addName}
          changeNumber={this.changeNumber}
          number={this.state.newNumber}
        />
        <Contacts persons={this.state.persons} filterWith={this.state.filterWith} />
        <Filter name={this.state.filterWith} filterName={this.filterName} />
      </div>
    )
  }
}

export default App
