import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {  IoLeafSharp, IoSkullSharp } from "react-icons/io5";
import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoSlice';




const Todo = ({id, title, completed}) => {

    const dispatch = useDispatch();


    // dispatches our deleteTodo from our reducers
    const deleteHandler = () => {
        dispatch(
            deleteTodoAsync({
                id: id
            })
        );
        
    };

    // dispatches our toggleComplete from our reducers
    const completeHandler = () => {
        dispatch(
            toggleCompleteAsync({
                id: id,
                completed: !completed
            })
        );
    };

    return (
        <motion.li
            initial={{ x: '150vw', transition: { type: "spring", duration: 2}}}
            animate={{ x: 0, transition: {type: "spring", duration: 2}}}
            whileHover={{
                scale: 0.9,
                transition: { type: "spring", duration: 0.1},
            }}
            exit={{
                x: "-60vw",
                scale: [1, 0],
                tranistion: { duration: 0.5},
                backgroundColor: "rgba(255, 0, 0, 1)",
            }}
            key={id}
            className="card"
        >
            <div className="btns">
                <span className={`todo-item ${completed ? "completed" : ''}`}>
                    {title}
                </span>
                <motion.button
                    whileHover={{scale: 1.4}}
                    whileTap={{ scale: 0.9}}
                    style={{color: "green"}}
                    onClick={completeHandler}
                >
                    <IoLeafSharp />
                </motion.button>
                
                <motion.button
                    whileHover={{ scale: 1.4 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ color: "red" }}
                    onClick={deleteHandler}
                >
                    {" "}
                    <IoSkullSharp />
                </motion.button>{" "}
            </div>
        </motion.li>
        
    );
};

export default Todo;