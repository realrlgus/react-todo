import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToDoContainer = styled.div`
  width: 40%;
  border-radius: 40px;
  min-width: 340px;
  margin: 0px 20px;
  padding: 35px;
  height: 70%;
  background-color: white;
`;

const ToDoTitle = styled.div`
  text-align: center;
  font-size: 2em;
  padding-bottom: 35px;
`;

const ToDoForm = styled.form`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`;

const ToDoInput = styled.input`
  flex: 4;
  border: 0px;
  appearance: none;
  border-bottom: 2px solid #b2bec3;
  margin-right: 20px;
  transition: border-bottom-color 0.5s ease-in;
  font-size: 1.3em;
  &:focus {
    outline: none;
    border-bottom-color: #00cec9;
  }
`;

const ToDoButton = styled.button`
  flex: 1;
  text-align: center;
  padding: 12px 4px;
  border-radius: 15px;
  color: white;
  font-size: 1.1em;
  background-color: #ff7675;
`;

const ToDoList = styled.div`
  height: 400px;
  margin-top: 25px;
  overflow-y: auto;
`;

const ToDoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0px;
`;

const ToDoColumn = styled.div`
  display: flex;
  align-items: center;
  min-width: 0px;
`;

const ToDoItemCheck = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  border-radius: 15px;
  border: 2px solid #636e72;
  background-color: ${({ checked }) => (checked ? "#fd79a8" : "#dfe6e9")};
`;

const ToDoItemTitle = styled.div`
  max-width: 75%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ToDoItemButton = styled.button``;

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "텍스트",
      isChecked: false,
    },
  ]);
  const [todoTitle, setTodoTitle] = useState("");

  const addToDo = (e) => {
    e.preventDefault();
    setTodos((prev) => [
      ...prev,
      { id: prev[prev.length - 1].id + 1, title: todoTitle, isChecked: false },
    ]);
    setTodoTitle("");
  };

  const deleteToDo = (id) => {
    setTodos((prev) => prev.filter((prevItem) => prevItem.id !== id));
  };

  const checkToDo = (id) => {
    setTodos((prev) =>
      prev.map((prevItem) =>
        prevItem.id === id
          ? { ...prevItem, isChecked: !prevItem.isChecked }
          : { ...prevItem }
      )
    );
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <ToDoContainer>
          <ToDoTitle>To Do List</ToDoTitle>
          <ToDoForm onSubmit={addToDo}>
            <ToDoInput
              placeholder="해야 할 일 입력"
              onChange={(e) => setTodoTitle(e.target.value)}
              value={todoTitle}
            />
            <ToDoButton onClick={addToDo}>+</ToDoButton>
          </ToDoForm>
          <ToDoList>
            {todos.map((todo) => (
              <ToDoItem key={todo.id}>
                <ToDoColumn>
                  <ToDoItemCheck
                    checked={todo.isChecked}
                    onClick={() => checkToDo(todo.id)}
                  />
                  <ToDoItemTitle>{todo.title}</ToDoItemTitle>
                </ToDoColumn>
                <ToDoColumn>
                  <ToDoItemButton onClick={() => deleteToDo(todo.id)}>
                    삭제
                  </ToDoItemButton>
                </ToDoColumn>
              </ToDoItem>
            ))}
          </ToDoList>
        </ToDoContainer>
      </Container>
    </>
  );
};

export default App;
