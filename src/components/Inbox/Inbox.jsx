import { Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import OptionsForTasks from "../../OptionsForTasks";
const Inbox = ({ projectData, tasksData , setTasksData ,todoistObj}) => {
  let tempData = [...projectData];
  let projectIds = [];

  tempData = tempData.filter((item) => {
    if (item.isInboxProject) {
      projectIds.push(item.id);
      return item;
    }
  });

  let tempTasksData = [...tasksData];
  tempTasksData = tempTasksData.filter((item) =>
    projectIds.includes(item.projectId)
  );

  console.log(tempTasksData, projectIds);
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
      {" "}
      <h1>Inbox</h1>
      {tempTasksData.length != 0 ? (
        <>
          {tempTasksData.map((item) => (
            <Button
              style={{
                display: "block",
                width: "100%",
                margin: "auto",
                marginBottom: "15px",
                textAlign: "left",
                borderRadius: "0px",
                paddingBottom: "9px",
                padding: "0px",
                border : 'none' ,
                height: "inherit",
              }}
            >
              <div
                style={{
                  borderColor: "lightgrey",
                  display : 'flex',
                  justifyContent : 'space-between'
                }}
              >
                <div>
                {item.content}
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
    </div>
  );
};

export default Inbox;
