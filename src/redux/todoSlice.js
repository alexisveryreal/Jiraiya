import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';



// THUNKS -----

// getTodos async so that when we refresh
// the same todos are present
export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async() => {
        const response = await fetch('http://localhost:7000/todos');

        // return all the todos if the response is good
        if(response.ok){
            const todos = await response.json();
            return { todos };
        }
    }
);


// adds all the new todo async 
// so that the get todo gets them from here
export const addTodoAsync = createAsyncThunk(
    'todos/addTodoAsync',
    async(payload) => {
        const response = await fetch('http://localhost:7000/todos',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: payload.title}),
        });
        if(response.ok){
            const todo = await response.json();
            return { todo };
        }
    }
);

// this is responsible for making sure that when users refresh
// whether a task was marked as complete or not is saved
export const toggleCompleteAsync = createAsyncThunk(
    'todos/completeTodoAsync',
    async(payload) => {
        // using backticks because we need the payload id
        // in order to make sure we are marking and returning
        // the correct todo with the unique id
        const response = await fetch(`http://localhost:7000/todos/${payload.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completed: payload.completed
            }),
        });

        // sending an object of the id of the todo
        // as well as the complete status
        if(response.ok){
            const todo = await response.json();
            return { id: todo.id, completed: todo.completed };
        }
    }
);

// responsible for delete stating consisten upon refreshes
export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'DELETE',
        });

        if(response.ok){
            return {id: payload.id};
        }
    }
);


const todoSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        // all of the reducers for the app
        // will have these and also async ones

        // addTodo with redux
        addTodo: (state, action) => {
            const newTodo = {
                // nanoID so that we have a unique ID
                id: nanoid(),
                title: action.payload.title,
                completed: false
            };
            // we can push here, redux takes care of immutability
            state.push(newTodo);
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex((todo) => todo.id ===action.payload.id);

            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        },
    },
    // extraReducers for our async thunks
    extraReducers: {
        [getTodosAsync.pending]: (state, action) => {
            console.log('fetching data...');
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            console.log('fetched data successfully...');
            // request was fullfilled get the todos loaded in
            return action.payload.todos;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            // same code from our earlier addTodo reducer
            // except we use the actions todo
            state.push(action.payload.todo);
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            // same code from normal reducer
            const index = state.findIndex((todo) => todo.id === action.payload.id);

            // update the compelted property
            state[index].completed = action.payload.completed;
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        },
    }
});

// exporting our reducers
export const {
    addTodo,
    toggleComplete,
    deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;