import React, { Component } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Countries from './components/Countries';
import ChosenCountry from './components/ChosenCountry';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      shownCountries: [],
      keyword: '',
    };

    this.updateKeyword = this.updateKeyword.bind(this);
    this.getFilteredCountries = this.getFilteredCountries.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(({ data }) => {
        this.setState({
          countries: data,
          shownCountries: data,
        });
      });
  }

  getFilteredCountries(keyword) {
    return this.state.countries.filter(({ name }) => (
      name.toLowerCase().includes(keyword.toLocaleLowerCase())
    ));
  }

  updateKeyword({ target: { value: keyword }}) {
    this.setState({
      keyword,
      shownCountries: this.getFilteredCountries(keyword),
    });
  }

  clickHandler(name) {
    this.updateKeyword({ target: { value: name }});
  }

  render() {
    const chosenCountryEl = this.state.shownCountries.length === 1
      ? <ChosenCountry country={this.state.shownCountries[0]} />
      : undefined;

    return (
      <div>
        <h1>Kumpula world factbook</h1>
        <Filter keyword={this.state.keyword} updateKeyword={this.updateKeyword} />
        { !chosenCountryEl && <Countries countries={this.state.shownCountries} clickHandler={this.clickHandler} /> }
        { chosenCountryEl }
      </div>
    );
  }
}

export default App;
