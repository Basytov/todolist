import React, { useReducer, useState } from "react";
import styled from "styled-components";



const initialState = {
  todos: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todos: [...state.todos, { text: action.payload, completed: false }],
      };
    case "REMOVE":
      return {
        ...state,
        todos: state.todos.filter((todo, index) => index !== action.payload),
      };
    case "TOGGLE":
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "CLEAR":
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [todoText, setTodoText] = useState("");

  function handleAddTodo(text) {
    if (!text) return;
    dispatch({ type: "ADD", payload: text });
    setTodoText("");
  }
 

  function handleRemoveTodo(index) {
    dispatch({ type: "REMOVE", payload: index });
  }

  function handleToggleTodo(index) {
    dispatch({ type: "TOGGLE", payload: index });
  }

  function handleClearTodos() {
    dispatch({ type: "CLEAR" });
  }

  function handleInputChange(e) {
    setTodoText(e.target.value);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTodo(todoText);
        }}
      >
        <StyledInput
          type="text"
          value={todoText}
          onChange={handleInputChange}
          placeholder="Add Todo"
        />
        <StyledButton2 type="submit">+</StyledButton2>
      </form>
      <Ol>
        {state.todos.map((todo, index) => (
          <StyledLi key={index}>
            <Title> {todo.text}</Title>

            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(index)}
            />

            <StyledButton onClick={() => handleRemoveTodo(index)}>
              Delete
            </StyledButton>
          </StyledLi>
        ))}
      </Ol>
      <StyledButton3 onClick={handleClearTodos}>Clear Todos</StyledButton3>
    </div>
  );
}
export default TodoList;


const Ol = styled.ol`
  margin-left: 520px;
`

const StyledLi = styled.li`
 

  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 16px;
  width: 20vw;
  height: 8vh;
  background-color: #bb0d0d;
  border: 3px solid black;
  margin: 1rem;
`;

const StyledButton = styled.button`
  background-color: #4d0609;
  color: #f5f5f5a0;
  margin-left: 50px;
  text-align: center;
`;
const StyledButton3 = styled.button`
  background-color: #c30909;
  width: 90px;
  height: 30px;
`;

const StyledInput = styled.input`
  /* width: 18rem;
  height: 40px;
  border: 2px solid ; */
margin-top: 20px;
  font-size: 20px;
  background-color: white;
  width: 300px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;


`;

const StyledButton2 = styled.button`
   width: 80px;
  height: 45px;
   width: 50px;
  justify-content: center;
  align-items: center;
  background-color: #a71d1d;
  margin-bottom: 20px;
  border-radius: 50px;
`
const Title = styled.p`
  display: flex;
  flex-wrap: wrap;
  width: 10vw;
  align-items: center;
`;