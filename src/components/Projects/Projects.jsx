import { Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalForOptions from "../../ModalForOptions";
import ModalElementAddProject from "../../ModalElementAddProject";
export const Projects = ({ todoistObj}) => {
  let projectsData = useSelector( state => state.data.projectData ) ;
  let tempData = [...projectsData];
  const [ open , setopen ] = useState( false ) ;
  let navigate = useNavigate();
  const [input, setinput] = useState("");
  if (input != "") {
    tempData = tempData.filter((item) => {
      return item.name.toLowerCase().indexOf(input.toLowerCase()) != -1;
    });
  }

  tempData = tempData.filter((item) => {
    return item.isInboxProject == false;
  });

  return (
    <div
      style={{
        maxWidth: "800px",
        width: "100%",
        padding: "30px",
        margin: "auto",
        marginTop: "0px",
      }}
    >
      <h1>My Projects</h1>
      <p>Free Plan</p>
      <input
        type="text"
        placeholder="Search Projects"
        value={input}
        onChange={(e) => setinput(e.target.value)}
        style={{ height: "30px", width: "100%", padding: "20px" }}
      />

      <div>
        <h4>{tempData.length} Projects</h4>
        {tempData.map((item, index) => {
          return (
            <>
              <Button 
              key = { item.id }
                style={{
                  display: "block",
                  width: "100%",
                  margin: "auto",
                  marginBottom: "15px",
                  textAlign: "left",
                  border: "0px",
                  borderRadius: "0px",
                  paddingBottom: "9px",
                  borderColor: "lightgrey",
                  padding: "0px",
                  boxShadow: "none",
                }}
                onClick={() => navigate(`/projects/${item.id}`)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "1.2rem", color: tempData[index].color }}>#</span>{" "}
                    <span>&nbsp;{item.name}</span>
                  </div>
                  <div> 
                      <>
                        <ModalForOptions
                          item={item}
                          todoistObj={todoistObj}
                        >
                          <EllipsisOutlined style={{ fontSize: "1.5rem" }} onClick={(e) => { e.stopPropagation()}}/>
                        </ModalForOptions>
                      </>
                  
                  </div>
                </div>
              </Button>
            </>
          );
        })}
        
       {
        open ? <ModalElementAddProject open2={open} todoistObj ={todoistObj}  setopen2={setopen}  /> : <></>
       }  

      <Button style={{ width : '100%' , border : 'none' , textAlign : 'left' , justifyContent : 'flex-start' , padding : '0px' , fontSize : '1.05rem' , fontWeight:'600' , color :'maroon'}} onClick={() => { setopen( true )}}>
        Add Project
      </Button>
      </div>

    </div>
  );
};
