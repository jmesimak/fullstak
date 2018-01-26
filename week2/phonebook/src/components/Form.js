import React from 'react';


const Form = ({ name, changeName, addName, changeNumber, number }) => {

  return (
    <form>
      <label htmlFor='name'>nimi</label>
      <input value={name} name='name' onChange={changeName} />
      <label htmlFor='number'>numero</label>
      <input value={number} name='number' onChange={changeNumber} />
      <button onClick={addName}>lisää</button>
    </form>
  )
};


export default Form;
