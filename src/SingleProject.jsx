import { useParams } from "react-router-dom";
import { Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import OptionsForTasks from "./OptionsForTasks";
import ModalElement from "./ModalElement";
export const SingleProject = ({ projectData, tasksData , setTasksData ,todoistObj}) => {
  let param = useParams();
  let tempData = [...projectData];
  const [ open , setopen ] = useState( false ) ;
  tempData = tempData.filter((item) => item.id == param.id);
  let tempTasksData = [...tasksData];
  tempTasksData = tasksData.filter((item) => item.projectId == param.id);
  return tempData.length != 0 ? (
    <div style={{ width: "50%", margin: "auto", marginTop: "5%" }}>
      {" "}
      <h1>{tempData[0].name}</h1>
      {tempTasksData.length != 0 ? (
        <>
          {tempTasksData.map((item) => (
            <Button
              key={item.id}
              style={{
                width: "100%",
                marginBottom: "10px",
                border: "none",
                display: "block",
                textAlign: "left",
                padding: "0px",
                height: "inherit",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p>{item.content}</p>
                  <p
                    style={{
                      marginTop: "4px",
                      fontSize: "0.85rem",
                      color: "grey",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
                <OptionsForTasks selectedtask = { item } setTasksData = {setTasksData} todoistObj = {todoistObj} tasksData = {tasksData}>
                  <EllipsisOutlined
                    style={{ fontSize: "1.5rem" }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </OptionsForTasks>
              </div>
            </Button>
          ))}
        </>
      ) : (
        <></>
      )}
    <ModalElement open = {open} setopen={setopen} projectData={projectData} setTasksData = {setTasksData} todoistObj ={todoistObj} />
     <Button style={{ color : 'maroon' , fontSize : '1.1rem' , fontWeight : '600' , width : '100%' , justifyContent :'flex-start' , border : 'none' , padding: '0px'}} onClick={() => { setopen(true)}}>Add Task</Button> 
    </div>
  ) : (
    <></>
  );
};
