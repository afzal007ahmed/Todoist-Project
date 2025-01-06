import { Modal, Button, Select, Switch } from "antd";
import { useState } from "react";
const ModalElementAddProject = ({
  open2,
  setProjectsData,
  todoistObj,
  projectsData,
  setopen2,
}) => {
  const [projectName, setProjectName] = useState("");
  const [projectColor, setProjectColor] = useState("charcoal");
  const [checkbox, setcheckbox] = useState(false);
  let addProjectObj = {};

  function handleClick( e) {
    e.stopPropagation() ;
  }

  function handleClose() {
    setopen2(false);
  }
  function addData() {
    setopen2(false);
    addProjectObj.name = projectName;
    addProjectObj.color = projectColor;
    setProjectColor('charcoal');
    if (checkbox) {
      addProjectObj.isFavorite = true;
    }
    console.log(addProjectObj);
    todoistObj
      .addProject(addProjectObj)
      .then((data) => {
        console.log(data);
        let temp = [...projectsData, data];
        console.log(temp);
        setProjectsData(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changingToggle() {
    setcheckbox((prev) => !prev);
  }
  return (
    <Modal
      open={open2}
      closable={false}
      footer={
        <div>
          <Button
            style={{ backgroundColor: "#E5E5E5", border: "none" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#c3392c",
              color: "white",
              border: "none",
              marginLeft: "10px",
            }}
            disabled={projectName.trim().length == 0}
            onClick={addData}
          >
            Add Project
          </Button>{" "}
        </div>
      }
    >
      <form>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="project-name" style={{ marginBottom: "10px" }}>
            {" "}
            Name
          </label>
          <input
            type="text"
            id="project-name"
            style={{
              marginBottom: "10px",
              height: "30px",
              borderRadius: "5px",
              borderColor: "lightgrey",
            }}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />

          <label style={{ marginBottom: "10px" }}>Color</label>
          <Select
            value={projectColor}
            onChange={(value) => {
              setProjectColor(value);
            }}
            style={{ width: "100%" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Select.Option value="charcoal">Charcoal</Select.Option>
            <Select.Option value="blue">Blue</Select.Option>
            <Select.Option value="red">Red</Select.Option>
          </Select>
        </div>
      </form>
      <p>Favorite</p>
      <Switch style = {{marginTop : '10px'}} checked={checkbox} onChange={changingToggle} onClick={handleClick}></Switch>
    </Modal>
  );
};

export default ModalElementAddProject;
