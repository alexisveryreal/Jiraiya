import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// ***Components **
import Form from './components/Form'
import TodoList from './components/TodoList'
import TotalCompleteItems from './components/TotalCompleteItems';

const App = () => {

  return (
    <div className="App">
      <header>
        <h1>Jiraiya</h1>
      </header>
      <TotalCompleteItems />
      <Form />
      <TodoList />
    </div>
  );
};

export default App;
