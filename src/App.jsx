import { TodoistApi } from "@doist/todoist-api-typescript";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { useEffect, useReducer, useState } from "react";
import Inbox from "./components/Inbox/Inbox.jsx";
import SideBar from "./SideBar.jsx";
import { Projects } from "./components/Projects/Projects.jsx";
import { SingleProject } from "./SingleProject.jsx";
function App() {
  let todoistObj = new TodoistApi("0cb66c0fca00727467301d32ca815b8b18eecece");

  let initialstate = {
    projectsData: [],
    tasksData: [],
    sideBarCollapse: false,
  };

  function reduce(state, action) {
    switch (action.type) {
      case "set_projects":
        return { ...state, projectsData: action.payload };
      case "set_tasks":
        return { ...state, tasksData: action.payload };
      case "side_bar_collapse" :
        return { ...state , sideBarCollapse : !state.sideBarCollapse } ;
      case "add_task":
        return { ...state , tasksData : action.payload } ;
    }
  }
  const [state, dispatch] = useReducer(reduce, initialstate);
 

  useEffect(() => {
    todoistObj
      .getProjects()
      .then((data) => {
        console.log(data);
        dispatch({ type: "set_projects", payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
    todoistObj
      .getTasks()
      .then((data) => {
        dispatch({ type: "set_tasks", payload: data });
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "#FFFFFF",
          margin: "0px",
        }}
      >
        <BrowserRouter>
          <SideBar
            projectsData={state.projectsData}
            dispatch={dispatch}
            todoistObj={todoistObj}
            sideBarCollapse={state.sideBarCollapse}
            tasksData={state.tasksData}
          />
          <div style={{ paddingTop: "15px", paddingLeft: "10px" }}>
            <MenuFoldOutlined
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type : "side_bar_collapse"})
              }}
            />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Inbox
                    projectData={state.projectsData}
                    tasksData={state.tasksData}
                    dispatch= {dispatch}
                    todoistObj={state.todoistObj}
                  />
                </>
              }
            />
            <Route
              path="/projects"
              element={
                <>
                  <Projects
                    projectsData={state.projectsData}
                    dispatch={dispatch}
                    todoistObj={state.todoistObj}
                  />
                </>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <>
                  {" "}
                  <SingleProject
                    projectData={state.projectsData}
                    tasksData={state.tasksData}
                    dispatch={dispatch}
                    todoistObj={state.todoistObj}
                  />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
}

export default App;
