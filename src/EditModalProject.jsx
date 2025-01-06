import { Modal, Select,Button, Switch } from "antd";
import { useState } from "react";

const EditModalProject = ({
  openModal,
  setopenModal,
  item,
  todoistObj,
  projectsData,
  setProjectsData,
}) => {
  const [inputValue, setinputValue] = useState(item.name || "");
  const [color, setcolor] = useState(item.color || "charcoal");
  const [ checked , setchecked ] = useState( false ) ;
  function handleCancel() {
    setopenModal(false);
  }

  function handleClick( e) {
    e.stopPropagation() ;
  }

  function projectEdit() {
    let updatedItem = { ...item, name: inputValue, color : color };
    if( checked ) {
        updatedItem.isFavorite = true ;
    }
    setopenModal(false);
    todoistObj
      .updateProject(item.id, updatedItem)
      .then((data) => {
        let updatedProjects = projectsData.map((i) =>
          i.id === item.id ? data : i
        );
        console.log( data.color ) ;
        setProjectsData(updatedProjects);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Modal
      open={openModal}
      onCancel={handleCancel}
      onOk={projectEdit}
      maskClosable={false}
      keyboard={false}
      footer = {<>
                <Button style={{backgroundColor : '#E5E5E5' , border : 'none'}} onClick={(e) => {e.stopPropagation() ;  handleCancel()}} >Cancel</Button>
                <Button style={{backgroundColor : '#c3392c' , color : 'white' , border : 'none' , marginLeft : '10px'}}  onClick={(e)=>{ e.stopPropagation() ; projectEdit() ; }}>Update</Button>{" "}</>}
    >
      <textarea
        onClick={(e) => {
          e.stopPropagation();
        }}
        type="text"
        placeholder="Enter Your Project Name"
        required
        value={inputValue}
        onChange={(e) => setinputValue(e.target.value)}
        style={{
          width: "100%",
          borderRadius: "5px",
        }}
      />
      <Select
        value={color}
        onChange={(value) => {setcolor(value)}}
        style={{ width: "100%" }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Select.Option value="charcoal">Charcoal</Select.Option>
        <Select.Option value="blue">Blue</Select.Option>
        <Select.Option value="red">Red</Select.Option>
      </Select>
      <p>Favorite</p>
      <Switch checked = {checked} onChange={() => { setchecked((prev ) => !prev )}} onClick={handleClick}/>
    </Modal>
  );
};

export default EditModalProject;
