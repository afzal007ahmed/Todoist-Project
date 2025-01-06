import { Modal, Button, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import SelectForProjects from "./SelectForProjects";
const ModalElement = ({ open, tasksData , dispatch , setopen , projectData  , todoistObj}) => {
  const [ content , setcontent ] = useState('') ;
  const [ desc , setdesc ] = useState('') ;

  function handleClose() {
    setopen(false);
  }
  
  const [currProjectId , setCurrProjId ] = useState('' || `${projectData[ 0 ].id}`) ;


  function handlechange(value) {
       setcontent( value ) ;
  } 

  function addTasks(){
    let addTaskObj = {} ;
    addTaskObj.content = content ;
    addTaskObj.description = desc ;
    addTaskObj.projectId = currProjectId ;
    console.log( addTaskObj ) ;
    todoistObj.addTask( addTaskObj )
    .then((data) => { 
      let tempData = [ ...tasksData ,  data ] ;
      dispatch({ type : "add_task" , payload : tempData } ) ;
    }) 
    .catch(( err ) => {
      console.log( err ) ;
    }) 
    setopen( false )
  }
  
  return (
    <Modal
    closable = {false}
      open={open}
      
      footer={
        <div style={{display :'flex' , justifyContent : 'space-between'}}>
          {" "}
           <SelectForProjects currProjectId = {currProjectId } setCurrProjId = {setCurrProjId} projectData = {projectData}/>
            <div>
          <Button style={{backgroundColor : '#E5E5E5' , border : 'none'}} onClick={handleClose} >Cancel</Button>
          <Button style={{backgroundColor : '#c3392c' , color : 'white' , border : 'none' , marginLeft : '10px'}}  disabled = {content.trim().length == 0 } onClick={addTasks}>Add Task</Button>{" "}
          </div>
        </div>
      }
    >
      <TextArea
        placeholder="Enter about your task"
        style={{
          width: "100%",
          border: "0",
          height: "30px",
          fontSize: "1.1rem",
          outline: "none",
          marginTop: "10px",
          wordBreak: "break-all",
          fontWeight: "600",
        }}
        value = { content } 
        onChange = { (e) => handlechange( e.target.value )}
      />
      <TextArea
        placeholder="Description"
        style={{ height: "10px", border: "0", marginTop: "5px" }}
        value={desc}
        onChange={(e) => { setdesc( e.target.value ) }} 
      />
    </Modal>
  );
};

export default ModalElement;
