import axios from 'axios';

const baseUrl = '/api/persons';

const personService = {
  getAll: () => {
    return axios
      .get(baseUrl)
      .then(({ data: persons }) => persons);
  },
  add: person => {
    return axios
      .post(baseUrl, person)
      .then(({ data: createdPerson }) => createdPerson);
  },
  remove: id => {
    return axios
      .delete(`${baseUrl}/${id}`);
  },
  replace: person => {
    return axios
      .put(`${baseUrl}/${person.id}`, person)
      .then(({ data: updatedPerson }) => updatedPerson);
  }
};

export default personService;
