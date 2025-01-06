import { Popover, Button, Modal } from "antd";
import { useState } from "react";

const OptionsForTasks = ({
  children,
  selectedtask,
  dispatch ,
  todoistObj,
  tasksData}
) => {
    const [ taskname , settaskname ] = useState('' || selectedtask.content) ;
    const [ taskdesc , settaskdesc ] = useState( '' || selectedtask.description);
    const [mode , setmode ] = useState(false) ;
    function editTask(){
      let temp = {} ;
      temp.content = taskname ;
      temp.description  = taskdesc ;
      todoistObj.updateTask( selectedtask.id , temp ) 
      .then(( data ) => {
        let tempData = tasksData.map(( item ) => item.id == selectedtask.id ? data : item )
        settaskname('') ;
        settaskdesc('') ;
        dispatch({ type : "update_task" , payload :  tempData  }) ;
      })
      setmode( false ) ;
    }

    function deleteTask() {
        todoistObj.deleteTask(selectedtask.id  )
        .then(() => {
            let newData = tasksData.filter((item) => item.id != selectedtask.id) ;
            dispatch({ type : "delete_task" , payload : newData } ) ;
        })
        .catch(( err ) => console.log( err ) ) ;
        setmode( false ) ;
    }
    function handleCancel() {
        setmode( false ) ;
    }

  return (
    <Popover
      trigger="hover"
      content={
        <>
          <Button style={{ width: "100%", border: "none" }} onClick={() => {setmode(true)}}>Edit</Button>
          { mode ? <Modal open = {mode} onCancel={handleCancel} closable = {false } onOk={editTask}>
              <textarea type = "text" value={taskname} onChange={(e) => { settaskname( e.target.value)} } style={{width:"100%" , border : '0.5px solid grey' }} />
              <textarea type = "text" value={taskdesc } onChange={(e) => { settaskdesc( e.target.value)} } style={{width:"100%" , border : '0.5px solid grey'}}/>
          </Modal> : <></>}
          <Button style={{ width: "100%", border: "none", color: "red" }} onClick={deleteTask}>
            Delete
          </Button>
        </>
      }
    >
      {children}
    </Popover>
  );
};

export default OptionsForTasks;
