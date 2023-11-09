import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import nextId from "react-id-generator";
import { addTodo } from "../../../redux/modules/todos.js";

const Form = () => {

  const id = nextId();

  const dispatch = useDispatch(); 
  
  // Removed the id initialization here since it will be set upon form submission
  const [todo, setTodo] = useState({
    id: '', // Changed from 0 to an empty string as 0 is a valid ID
    title: "",
    body: "",
    isDone: false,
  });
  
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (todo.title.trim() === "" || todo.body.trim() === "") return;
    
    // Dispatch the addTodo action with a new ID each time a todo is added
    dispatch(addTodo({
      ...todo,
      id: nextId(), // Generate a unique ID for each new todo
    }));

    // Reset the todo state to clear the form fields
    setTodo({
      id: '',
      title: "",
      body: "",
      isDone: false,
    });
  };

  return (
    <StAddForm onSubmit={onSubmitHandler}>
      <StInputGroup>
        <StFormLabel>Title</StFormLabel>
        <StAddInput
          type="text"
          name="title"
          value={todo.title}
          onChange={onChangeHandler}
        />
        <StFormLabel>Contents</StFormLabel>
        <StAddInput
          type="text"
          name="body"
          value={todo.body}
          onChange={onChangeHandler}
        />
      </StInputGroup>
      <StAddButton>Add</StAddButton>
    </StAddForm>
  );
};

export default Form;

const StInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StFormLabel = styled.label`
  font-size: 16px;
  font-weight: 700;
`;

const StAddForm = styled.form`
  background-color: #eee;
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  gap: 20px;
`;

const StAddInput = styled.input`
  height: 40px;
  width: 240px;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
`;

const StAddButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;
