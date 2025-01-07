import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import {
  MenuFoldOutlined,
  DownOutlined,
  RightOutlined,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Select, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalElement from "./ModalElement";
import ModalElementAddProject from "./ModalElementAddProject";
import ModalForOptions from "./ModalForOptions";
import { useSelector } from "react-redux";
const SideBar = ({
  todoistObj,
  sideBarCollapse,
}) => {

  let projectsData = useSelector(state => state.data.projectData) ;
  let tasksData = useSelector( state => state.data.tasksData ) ;
  const [open, setopen] = useState(false);
  const [open2, setopen2] = useState(false);
  const [arrowforFav, setarrowforFav] = useState(false);
  const [arrow, setarrow] = useState(false);

  let favorite = [];
  let navigate = useNavigate();

  let tasksPerProject = {};

  if (tasksData != undefined) {
    for (let i = 0; i < tasksData.length; i++) {
      if (tasksPerProject[tasksData[i].projectId] == undefined) {
        tasksPerProject[tasksData[i].projectId] = 1;
      } else {
        tasksPerProject[tasksData[i].projectId]++;
      }
    }
  }

  function addProjects() {
    setopen2(true);
  }

  let tempData = [...projectsData];
  tempData = tempData.filter((item) => {
    if (item.isFavorite) {
      favorite.push(item);
    }
    if (item.isInboxProject == false) {
      return true;
    }
    return false;
  });

  return (
    <Sider
      style={{
        backgroundColor: "#FCFAF8",
        width: `${sideBarCollapse ? "0px" : "auto"}`,
        paddingTop: "30px",
      }}
      width={"300px"}
      collapsible
      collapsed={sideBarCollapse}
      collapsedWidth={`${sideBarCollapse ? "0px" : "auto"}`}
    >
      <Button
        onClick={() => {
          setopen(true);
        }}
        style={{
          display: "block",
          width: "100%",
          border: "0px",
          boxShadow: "none",
          textAlign: "left",
          margin: "auto",
          backgroundColor: "#FCFAF8",
          color: "maroon",
          fontWeight: "600",
        }}
      >
        Add Task
      </Button>

      {open ? (
        <ModalElement
          open={open}
          setopen={setopen}
          todoistObj={todoistObj}
        />
      ) : (
        <></>
      )}
      <Button
        key={"1"}
        mode="inline"
        onClick={() => {
          navigate("/");
        }}
        style={{
          marginTop: "15px",
          display: "block",
          width: "100%",
          border: "0px",
          boxShadow: "none",
          textAlign: "left",
          margin: "auto",
          backgroundColor: "#FCFAF8",
        }}
      >
        Inbox
      </Button>

      {favorite.length != 0 ? (
        <>
          <Button
            style={{
              marginTop: "15px",
              display: "block",
              width: "100%",
              border: "0px",
              boxShadow: "none",
              textAlign: "left",
              margin: "auto",
              backgroundColor: "#FCFAF8",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "black" }}>Favorites</span>
              <div>
                {arrowforFav ? (
                  <DownOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      setarrowforFav(false);
                    }}
                    style={{ fontSize: "12px", color: "black" }}
                  />
                ) : (
                  <RightOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      setarrowforFav(true);
                    }}
                    style={{ fontSize: "12px", color: "black" }}
                  />
                )}
              </div>
            </div>
          </Button>
        </>
      ) : (
        <></>
      )}

      {arrowforFav
        ? favorite.map((item, index) => {
            return (
              <Button
                style={{
                  display: "block",
                  width: "95%",
                  border: "none",
                  textAlign: "left",
                  margin: "auto",
                  marginTop: "5px",
                  backgroundColor: "#FCFAF8",
                }}
                key={item.id}
                onClick={() => navigate(`/projects/${item.id}`)}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem", color: item.color }}>
                      #
                    </span>{" "}
                    <span>&nbsp; {item.name}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <>
                      <ModalForOptions
                        item={item}
                        todoistObj={todoistObj}
                      >
                        <EllipsisOutlined
                          style={{ fontWeight: "600", fontSize: "1.1rem" }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      </ModalForOptions>
                    </>
                  </div>
                </div>
              </Button>
            );
          })
        : null}
      <Button
        style={{
          marginTop: "15px",
          display: "block",
          width: "100%",
          border: "0px",
          boxShadow: "none",
          textAlign: "left",
          margin: "auto",
          backgroundColor: "#FCFAF8",
        }}
        key={"2"}
        mode="inline"
        onClick={() => {
          navigate("/projects");
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontWeight: "600", color: "gray" }}>My Projects</span>
          <div>
            <PlusOutlined
              onClick={(e) => {
                e.stopPropagation();
                addProjects();
              }}
              style={{ fontSize: "12px" }}
            />
            {arrow ? (
              <DownOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  setarrow(false);
                }}
                style={{ fontSize: "12px", marginLeft: "10px" }}
              />
            ) : (
              <RightOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  setarrow(true);
                }}
                style={{ fontSize: "12px", marginLeft: "10px" }}
              />
            )}
          </div>
        </div>
      </Button>
      {open2 ? (
        <ModalElementAddProject
          open2={open2}
          todoistObj={todoistObj}
          setopen2={setopen2}
        />
      ) : (
        <></>
      )}
      {arrow
        ? tempData.map((item, index) => {
            return (
              <Button
                style={{
                  position: "relative",
                  display: "block",
                  width: "95%",
                  boxShadow: "none",
                  margin: "auto",
                  marginTop: "5px",
                  border: "none",
                  backgroundColor: "#FCFAF8",
                }}
                key={item.name}
                onClick={() => navigate(`/projects/${item.id}`)}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem", color: item.color }}>
                      # &nbsp;
                    </span>{" "}
                    {item.name}
                  </span>{" "}
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <ModalForOptions
                        item={item}
                        todoistObj={todoistObj}
                      >
                        <EllipsisOutlined
                          style={{ fontWeight: "600", fontSize: "1.1rem" }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      </ModalForOptions>
                    </div>
                  </div>
                </div>
              </Button>
            );
          })
        : null}
    </Sider>
  );
};

export default SideBar;
