import React, {useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';


// Import Components
import Todo from './Todo'

const TodoList = () => {

    const dispatch = useDispatch();

    // state has entire state tree
    // we specify todos to display
    const todos = useSelector((state) => state.todos);

    // useEffect hook gets called when the components loads the first time

    useEffect(() =>{
        dispatch(
            getTodosAsync()
        );
    }, [dispatch]);

    return(
        <div className="todo-container">
            <ul className="todo-list">
                {
                    todos.map(todo => (
                        <Todo
                            id={todo.id} 
                            key={todo.id} 
                            title={todo.title}
                            completed={todo.completed} 
                        />
                    ))
                }
            </ul>
            
        </div>
    );
};

export default TodoList;