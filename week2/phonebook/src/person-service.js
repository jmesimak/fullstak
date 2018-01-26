import axios from 'axios';

const baseUrl = 'http://localhost:3001';
const personsUrl = `${baseUrl}/persons`;

const personService = {
  getAll: () => {
    return axios
      .get(personsUrl)
      .then(({ data: persons }) => persons);
  },
  add: person => {
    return axios
      .post(personsUrl, person)
      .then(({ data: createdPerson }) => createdPerson);
  },
  remove: id => {
    return axios
      .delete(`${personsUrl}/${id}`);
  },
  replace: person => {
    return axios
      .put(`${personsUrl}/${person.id}`, person)
      .then(({ data: updatedPerson }) => updatedPerson);
  }
};

export default personService;
