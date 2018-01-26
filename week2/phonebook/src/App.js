import React from 'react';

import Form from './components/Form';
import Filter from './components/Filter';
import Contacts from './components/Contacts';
import Notification from './components/Notification';

import personService from './person-service';

import './App.css';


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
    this.deletePerson = this.deletePerson.bind(this);
    this.clearNotification = this.clearNotification.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillMount() {
    personService
      .getAll()
      .then(persons => {
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

  deletePerson(id) {
    const toDel = this.state.persons.find(p => id === p.id).name;
    const confirm = window.confirm(`Poistetaanko ${toDel}?`);
    if (confirm) personService
      .remove(id)
      .then(() => {
        this.setState({
          persons: this.state.persons.filter(p => id !== p.id),
          notification: { message: `Poistettiin ${toDel}`, type: 'alert' },
        }, this.clearNotification);
      });
  }

  clearNotification() {
    setTimeout(() => {
      this.setState({
        notification: undefined,
      });
    }, 5000);
  }

  handleAdd(persons, notification) {
    this.setState({
      persons,
      newName: '',
      newNumber: '',
      notification,
    }, this.clearNotification);
  }

  addName(event) {
    event.preventDefault();
    const match = this.state.persons.find(p => p.name === this.state.newName)
    if (!match) {
      personService
        .add({ name: this.state.newName, number: this.state.newNumber })
        .then(person => {
          this.handleAdd(
            [...this.state.persons, person],
            { message: `Lisättiin ${person.name}`, type: 'success' }
          );
        });
    } else {
      const confirm = window.confirm(`Päivitetäänkö ${match.name}?`);
      if (confirm) personService
        .replace({ name: match.name, number: this.state.newNumber, id: match.id })
        .then(person => {
          this.handleAdd(
            this.state.persons.map(p => p.id === person.id ? person : p),
            { message: `Päivitettiin ${person.name}`, type: 'success' }
          );
        })
        .catch(error => {
          if (error.toString().includes('404'))
            this.handleAdd(
              this.state.persons.filter(p => p.name !== this.state.newName),
              {
                message: `Näyttäisi siltä ettei henkilöä ${this.state.newName} enää löydy, ehkä kaverisi poisti hänet?`,
                type: 'alert'
              },
            );
        });
    }
  }

  render() {
    return (
      <div className="root">
        <h2>Puhelinluettelo</h2>
        {
          this.state.notification && 
            <Notification
              message={this.state.notification.message}
              notiType={this.state.notification.type}
            />
        }
        <Form
          name={this.state.newName}
          changeName={this.changeName}
          addName={this.addName}
          changeNumber={this.changeNumber}
          number={this.state.newNumber}
        />
        <Contacts persons={this.state.persons} filterWith={this.state.filterWith} deletePerson={this.deletePerson} />
        <Filter name={this.state.filterWith} filterName={this.filterName} />
      </div>
    )
  }
}

export default App
