import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../redux/todoSlice';

const Form = () =>{

  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  
  const submitTodoHandler = (event) => {
    event.preventDefault();
    // dispatch todo async here
    dispatch(
      addTodoAsync({
        title: value,
      })
    )
    console.log('user entered ' + value);
    setValue('');
  };
    
    return(
      <form onSubmit={submitTodoHandler}>
        <input 
          value={value} 
          onChange={(event) => setValue(event.target.value)} 
          type="text"
          placeholder="Add todo..." 
          className="todo-input" 
        />
        <button type='submit' className="todo-button">
          <i className="fas fa-plus-square"></i>
        </button>
      </form>
    );
}

export default Form;