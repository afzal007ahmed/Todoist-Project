import { Button, Popover } from "antd";
import EditModalProject from "./EditModalProject";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProject, updateProjects } from "./store/dataSlice";
const ModalForOptions = ({
  children,
  item,
  todoistObj,
}) => {

  const [ openModal , setopenModal ] = useState( false ) ;  

  let dispatch = useDispatch() ;
  function handleDeleteProject() {
    todoistObj
      .deleteProject(item.id)
      .then(() => { 
        dispatch(deleteProject({item } ) ) ;
      })
      .catch((err) => console.log(err));
  }

  function handleAddToFavorites() {
    let temp = {...item};
    temp.isFavorite = true;
    todoistObj
      .updateProject(item.id, temp)
      .then((data) => {
        dispatch(updateProjects(data  ) ) ;
      })
      .catch((err) => console.log(err));
  }
  
  function handleRemoveFavorites() {
    if( item.isFavorite == false ) {
        return ;
    }
    let temp = {...item} ;
    temp.isFavorite = false ;
    todoistObj.updateProject( item.id , temp ) 
    .then(( data ) => {
      dispatch(updateProjects( data  ) ) ;
    })
  }
  return (
    <>
    <Popover
    trigger="hover"
      content={
        <div style={{ paddingRight: "20px", paddingLeft: "20px" }}>
          <Button style={{ border : '0px' , display :'block' }} onClick={ (e) => {setopenModal( true ) ; e.stopPropagation()}} >Edit</Button>
          <Button onClick={(e)=>{ e.stopPropagation() ; handleAddToFavorites() ; }} style={{ border : '0px' , display :'block' }} >Add to Favorite</Button>
          <Button style={{ border : '0px' , display :'block' }} onClick={(e) => { e.stopPropagation() ; handleRemoveFavorites()}}>Remove from Favorites</Button>
          <Button style={{ border : '0px' , display :   'block' , color : 'red'}} onClick={(e) => { e.stopPropagation() ; handleDeleteProject()}}>
            Delete
          </Button>
        </div>
      }
    >
      {children}
    </Popover>
 <EditModalProject
        openModal={openModal}
        setopenModal={setopenModal}
        item={item}
        todoistObj={todoistObj}
      />
    </>
  );
};

export default ModalForOptions;
