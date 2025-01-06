import { Button, Popover } from "antd";
import EditModalProject from "./EditModalProject";
import { useState } from "react";
const ModalForOptions = ({
  children,
  projectsData,
  item,
  dispatch,
  todoistObj,
}) => {
  console.log( "modalforoptions" , dispatch ) ;
  const [ openModal , setopenModal ] = useState( false ) ;  

  
  function handleDeleteProject() {
    let temp = projectsData.filter((i) =>{return  i.id != item.id });

    todoistObj
      .deleteProject(item.id)
      .then(() => { 
        dispatch({ type : "delete_project" , payload : temp}) } )
      .catch((err) => console.log(err));
  }

  function handleAddToFavorites() {
    let temp = {...item};
    temp.isFavorite = true;
    todoistObj
      .updateProject(item.id, temp)
      .then((data) => {
        console.log( 'color' , data ) ; 
        temp = projectsData.map((i) => {
          if (i.id == item.id) {
            return data;
          }
          return i;
         });
         dispatch({type : "update_project" , payload : temp }) ;
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
        let tempData = projectsData.filter((i) => i.id != item.id) ;
        tempData = [...tempData , data ] ;
        dispatch({type  :"update_project" , payload : tempData } ) ;
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
        projectsData={projectsData}
        dispatch = {dispatch}
      />
    </>
  );
};

export default ModalForOptions;
