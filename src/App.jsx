import { TodoistApi } from "@doist/todoist-api-typescript";
import { useDispatch } from "react-redux";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout} from "antd";
import { MenuFoldOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";
import Inbox from "./components/Inbox/Inbox.jsx";
import SideBar from "./SideBar.jsx";
import { Projects } from "./components/Projects/Projects.jsx";
import { SingleProject } from "./SingleProject.jsx";
import { addDataProjects, addDataTasks } from "./store/dataSlice.js";
function App() {
  let todoistObj = new TodoistApi("0cb66c0fca00727467301d32ca815b8b18eecece");
  const [sideBarCollapse, setsideBarCollapse] = useState(false);
  
  let dispatch = useDispatch() ;
  function reverseCollapse() {
    setsideBarCollapse((prev) => !prev);
  }



  useEffect(() => { 
    todoistObj
      .getProjects()
      .then((data) => {
        console.log( data ) ;
        dispatch( addDataProjects( data ) ) ;
      })
      .catch((err) => {
        console.log(err);
      });
    todoistObj
      .getTasks()
      .then((data) => {
        dispatch( addDataTasks( data ) ) ;
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);



  return (
    <>
      <Layout
        style={{ minHeight: "100vh", backgroundColor: "#FFFFFF", margin: "0px" }}
      >
        <BrowserRouter>
          <SideBar
            todoistObj = {todoistObj}
            sideBarCollapse = {sideBarCollapse} 
            setsideBarCollapse = {setsideBarCollapse}

          />
          <div style={{paddingTop:'15px' , paddingLeft : '10px'}}>
          <MenuFoldOutlined onClick={(e) => { e.stopPropagation() ; reverseCollapse() } }/>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Inbox todoistObj={todoistObj}/>
                </>
              }
            />
            <Route
              path="/projects"
              element={
                <>
                  <Projects todoistObj = {todoistObj}/>
                </>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <>
                  {" "}
                  <SingleProject
                    todoistObj = { todoistObj }
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
