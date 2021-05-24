import React from 'react';
import { useSelector } from 'react-redux';


const TotalCompleteItems = () => {

    const completedTodos = useSelector((state) =>
        // filters out all the todos that have complete set to true
        // we then use the lenfth of this array to display on the screen
        state.todos.filter((todo) => todo.completed === true)
    );


    return (
        
        <h4 className='text-center'>
            Total Complete Items: {completedTodos.length}            
        </h4>
        
        
    );
};

export default TotalCompleteItems;
