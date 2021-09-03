// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
// import Axios from 'axios';

const SyllabusForm = props => {
  const [syllabusTitle, setTitle] = useState(props.syllabusData.syllabusTitle);
  const [description, setDescription] = useState(props.syllabusData.description);
  const [objectives, setObjectives] = useState(props.syllabusData.objectives);

  const handleChange = event => {
    if(event.target.name === "syllabusTitle") setTitle(event.target.value);
    if(event.target.name === "description") setDescription(event.target.value);
    if(event.target.name === "objectives") setObjectives(event.target.value);
  }

  const syllabus={
    "syllabusTitle":syllabusTitle,
    "description":description,
    "objectives":objectives
  };

  const handleSave = () => props.onSave(props.index,syllabus);
  const handleCancel = () => props.onCancel(props.index);

  return(
    <div id="form">
    <br></br><strong>{props.index+1}</strong><br></br>
    <label>syllabus Title</label>
    <input type="text" name="syllabusTitle" id="syllabusTitle" value={syllabusTitle} onChange={handleChange}></input>
    <br></br>
    <label>Description</label>
    <input type="text" name="description" id="description" value={description} onChange={handleChange}></input>
    <br></br>
    <label>objectives</label>
    <input type="text" name="objectives" id="objectives" value={objectives} onChange={handleChange}></input>
    <br></br>
    <button onClick={handleSave} id="save">save</button>
    <button onClick={handleCancel} id="cancel">cancel</button>
    <br></br>
    </div>
  );
}

const SyllabusCard = props => {
  const editsyllabus = () => props.edit(props.index);
  const deletesyllabus = () => props.delete(props.index);
  return (
    <div class="card">
      <br></br><label class="index">{props.index+1}</label><br></br>
      <label>syllabusTitle:{props.syllabusData.syllabusTitle}</label><br></br>
      <label>Description:{props.syllabusData.description}</label><br></br>
      <label>objectives:{props.syllabusData.objectives}</label><br></br>
      <button onClick={editsyllabus} id="edit">Edit</button>
      <button onClick={deletesyllabus} id="delete">Delete</button><br></br>
    </div>
  );
}

function App() {
  const [syllabusItems, setsyllabusItems] =  useState([]);
  const DisplayForm = () => {
    const syllabusItemsClone = [ ...syllabusItems];
    syllabusItemsClone.push({
      syllabusTitle: "",
      description: "",
      objectives: "",
      editMode: true
    });
    setsyllabusItems(syllabusItemsClone);
  }

  useEffect(() => {
    fetch("http://localhost:4000/api/syllabus", {
      method: 'GET'
    }).then(response => response.json())
    .then((data)=> {
      const syllabuses = data;
      console.log(data);
      syllabuses.forEach(syllabus => {
        syllabus["editMode"] = false;
        setsyllabusItems(syllabuses);
        console.log(syllabuses);
      }); 
  })
    .catch((error) => console.log(error))
  }, [])
  
  const save = (index, syllabus) => {
    const syllabusItemsClone = [...syllabusItems];
    syllabusItemsClone[index] = syllabus;
    syllabusItemsClone[index].editMode = false;
    const fetchOptions = {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({syllabusTitle:syllabus.syllabusTitle, description:syllabus.description, objectives:syllabus.objectives})
    }
    fetch("http://localhost:4000/api/syllabus", fetchOptions)
    .then((result)=> {if(result.status === 201) setsyllabusItems(syllabusItemsClone);})
    .catch((error) => console.log(error))
  }
  
  const cancel = index => {
    const syllabusItemsClone = [...syllabusItems];
    if(syllabusItemsClone[index].syllabusTitle === "" && syllabusItemsClone[index].description === "" && syllabusItemsClone[index].objectives === "") {
      syllabusItemsClone.pop();
    }
    else {
      syllabusItemsClone[index].editMode = false;
    }
    setsyllabusItems(syllabusItemsClone);
  }

  const handleEdit = index => {
    const syllabusItemsClone = [...syllabusItems];
    syllabusItemsClone[index].editMode = true;
    setsyllabusItems(syllabusItemsClone);
  }
  
  const handleDelete = index => {
    const syllabusItemsClone = [...syllabusItems];
    const id=syllabusItemsClone[index].syllabusId;
    const url = "http://localhost:4000/api/syllabus/"+id;
    fetch(url,{ method:'DELETE' })
    .then(result => {
      if(result.status === 204) {
        syllabusItemsClone.splice(index,1);
        setsyllabusItems(syllabusItemsClone);
      }
    })
  }
  
  return (
    <div>
      <button onClick={DisplayForm} id="syllabusBtn">Add syllabus</button>
      {syllabusItems.map((syllabusItem, index) => {
        console.log(syllabusItem.editMode);
        return((syllabusItem.editMode === true ? 
          (<SyllabusForm key={`SyllabusForm-${index}`} syllabusData={syllabusItem} index={index} onSave={save} onCancel={cancel}></SyllabusForm>)
          :(<SyllabusCard key={`SyllabusCard-${index}`} syllabusData={syllabusItem} index={index} edit={handleEdit} delete={handleDelete}></SyllabusCard>)))}
      )}
    </div>
    )
  }
  
  export default App;