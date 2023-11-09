import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTodoByID } from "../redux/modules/todos.js";

const Detail = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todo);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTodoByID(id)); // Fetch the todo item when the component mounts
  }, [dispatch, id]); // Add dependencies to the dependency array

  // The useEffect hook above will dispatch the getTodoByID action with the 'id' from useParams.
  // This will load the todo item into the component's state when the component mounts or the 'id' changes.

  return (
    <StContainer>
      <StDialog>
        <div>
          <StDialogHeader>
            <div>ID: {todo.id}</div> {/* Displays the ID */}
            <StButton
              borderColor="#ddd"
              onClick={() => {
                navigate("/"); // Navigates back to the homepage
              }}
            >
              Back
            </StButton>
          </StDialogHeader>
          <StTitle>{todo.title}</StTitle> {/* Displays the title */}
          <StBody>{todo.body}</StBody> {/* Displays the body */}
        </div>
      </StDialog>
    </StContainer>
  );
};

export default Detail;


const StContainer = styled.div`
  border: 2px solid #eee;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StDialog = styled.div`
  width: 600px;
  height: 400px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StDialogHeader = styled.div`
  display: flex;
  height: 80px;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
`;

const StTitle = styled.h1`
  padding: 0 24px;
`;

const StBody = styled.main`
  padding: 0 24px;
`;

const StButton = styled.button`
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;
