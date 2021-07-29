import React, {useContext, useEffect, useState} from 'react';
import {baseUrl} from "../Utils/Links";
import {useAuth} from "./AuthProvider";

const TasksContext = React.createContext(null);

const TasksProvider = ({children}) => {
  const tasksApi = baseUrl + 'api/v1/tasks';
  const {token} = useAuth();
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    (async () => {
      token && await getTasks();
    })()
  }, [token])

  const getTasks = async () => {
    await fetch(tasksApi, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(response => response.json())
      .then(async data => setTasks(data))
  }

  return (
    <TasksContext.Provider
      value={{
        tasks
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

const useTasks = () => {
  const event = useContext(TasksContext);
  if (event == null) {
    throw new Error('useTasks() called outside of a AuthProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return event;
};

export {TasksProvider, useTasks};
