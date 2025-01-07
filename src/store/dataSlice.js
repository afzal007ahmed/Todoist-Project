import { createSlice  } from "@reduxjs/toolkit";


let initialState = {
    projectData : [] ,
    tasksData : []
}
const data = createSlice({
    name : 'data' ,
    initialState ,
    reducers: {
        addDataProjects : (state , action ) => { 
            state.projectData = action.payload ;
         } ,
        addDataTasks : (state , action) => {
            state.tasksData = action.payload ;
        } ,
        addSingleProject : ( state , action ) => {
            state.projectData.push( action.payload ) ;
        } ,

        addSingleTask : ( state , action ) => {
            state.tasksData.push( action.payload) ;
        } ,
        updateTasks : (state , action ) => { 
            state.tasksData = state.tasksData.map(( item ) => item.id != action.payload.id ? item : action.payload  ) ;
        },
        updateProjects : ( state , action ) => {
            console.log('working') 
            state.projectData = state.projectData.filter(( item ) => item.id != action.payload.id ) ;
            state.projectData.push( action.payload ) ;
        },
        deleteTask : (state , action ) => {
            state.tasksData = state.tasksData.filter(( item ) => item.id != action.payload.id ) ;
        }, 
        deleteProject : ( state , action ) => {
            state.projectData = state.projectData.filter(( item ) => item.id != action.payload.id ) ;
        }
    }


})

export const { addDataProjects , addDataTasks , updateTasks , updateProjects , deleteTask , deleteProject , addSingleProject , addSingleTask } = data.actions ;
export default data.reducer ; 