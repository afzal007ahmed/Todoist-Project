
const SelectForProjects = ({currProjectId , setCurrProjId , projectData }) => {
  return (
    <select style={{outline :'none' , border : 'none' , backgroundColor :'white' , color :'grey'}} onChange={(e) => { setCurrProjId( e.target.value ) }}  value={currProjectId} >
    { projectData.map((item) => {
     return (
       <option key = {item.id} style={{ border : 'none' , outline : 'none'}} value={item.id}># &nbsp; {item.name}</option>
     )
    })}
   </select>
  )
}

export default SelectForProjects