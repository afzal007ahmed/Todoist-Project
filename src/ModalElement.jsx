import { Modal, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import SelectForProjects from "./SelectForProjects";
import { useDispatch, useSelector } from "react-redux";
import { addSingleProject } from "./store/dataSlice";
const ModalElement = ({ open, setopen , todoistObj}) => {
  const [ content , setcontent ] = useState('') ;
  const [ desc , setdesc ] = useState('') ;

  let projectData = useSelector(state => state.data.projectData) ;
  let dispatch = useDispatch() ;
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
      dispatch(addSingleProject({data})) ;
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
