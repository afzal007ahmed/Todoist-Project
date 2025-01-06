import { TodoistApi } from "@doist/todoist-api-typescript";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout} from "antd";
import { MenuFoldOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";
import Inbox from "./components/Inbox/Inbox.jsx";
import SideBar from "./SideBar.jsx";
import { Projects } from "./components/Projects/Projects.jsx";
import { SingleProject } from "./SingleProject.jsx";
function App() {
  let todoistObj = new TodoistApi("0cb66c0fca00727467301d32ca815b8b18eecece");
  const [projectsData, setProjectsData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [sideBarCollapse, setsideBarCollapse] = useState(false);

  function reverseCollapse() {
    setsideBarCollapse((prev) => !prev);
  }



  useEffect(() => {
    todoistObj
      .getProjects()
      .then((data) => {
        console.log( data ) ;
        setProjectsData(data);
      })
      .catch((err) => {
        console.log(err);
      });
    todoistObj
      .getTasks()
      .then((data) => {
        setTasksData(data);
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
            projectsData={projectsData} 
            setProjectsData = {setProjectsData}
            todoistObj = {todoistObj}
            setTasksData = {setTasksData}
            sideBarCollapse = {sideBarCollapse} 
            setsideBarCollapse = {setsideBarCollapse}
            tasksData = { tasksData }

          />
          <div style={{paddingTop:'15px' , paddingLeft : '10px'}}>
          <MenuFoldOutlined onClick={(e) => { e.stopPropagation() ; reverseCollapse() } }/>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Inbox projectData={projectsData} tasksData={tasksData}  setTasksData={setTasksData} todoistObj={todoistObj}/>
                </>
              }
            />
            <Route
              path="/projects"
              element={
                <>
                  <Projects projectsData={projectsData} setProjectsData = {setProjectsData} todoistObj = {todoistObj}/>
                </>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <>
                  {" "}
                  <SingleProject
                    projectData={projectsData}
                    tasksData={tasksData}
                    setTasksData = {setTasksData}
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
