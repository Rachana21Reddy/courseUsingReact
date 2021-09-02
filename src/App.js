// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const SyllabusForm = props => {
  const [syllabusTitle, setTitle] = useState(props.syllabusData.syllabusTitle);
  const [description, setDescription] = useState(props.syllabusData.description);
  const [objective, setObjective] = useState(props.syllabusData.objective);

  const handleChange = event => {
    if(event.target.name === "syllabusTitle") setTitle(event.target.value);
    if(event.target.name === "description") setDescription(event.target.value);
    if(event.target.name === "objective") setObjective(event.target.value);
  }

  const Syllabus={
    "syllabusTitle":syllabusTitle,
    "description":description,
    "objective":objective
  };

  const handleSave = () => props.onSave(props.index,Syllabus);

  const handleCancel = () => props.onCancel(props.index);

  return(
    <div id="form">
    <br></br><strong>{props.index+1}</strong><br></br>
    <label>Syllabus Title</label>
    <input type="text" name="syllabusTitle" id="syllabusTitle" value={syllabusTitle} onChange={handleChange}></input>
    <br></br>
    <label>Description</label>
    <input type="text" name="description" id="description" value={description} onChange={handleChange}></input>
    <br></br>
    <label>Objective</label>
    <input type="text" name="objective" id="objective" value={objective} onChange={handleChange}></input>
    <br></br>
    <button onClick={handleSave} id="save">save</button>
    <button onClick={handleCancel} id="cancel">cancel</button>
    <br></br>
    </div>
  );
}

const SyllabusCard = props => {
  const editSyllabus = () => props.edit(props.index);
  const deleteSyllabus = () => props.delete(props.index);
  return (
    <div class="card">
      <br></br><label class="index">{props.index+1}</label><br></br>
      <label>syllabusTitle:{props.syllabusData.syllabusTitle}</label><br></br>
      <label>Description:{props.syllabusData.description}</label><br></br>
      <label>Objective:{props.syllabusData.objective}</label><br></br>
      <button onClick={editSyllabus} id="edit">Edit</button>
      <button onClick={deleteSyllabus} id="delete">Delete</button><br></br>
    </div>
  );
}


function App() {
 
  const [syllabusItems, setSyllabusItems] =  useState([]);
  const DisplayForm = () => {
    const syllabusItemsClone = [ ...syllabusItems];
    syllabusItemsClone.push({
      syllabusTitle: "",
      description: "",
      objective: "",
      editMode: true
    });
    setSyllabusItems(syllabusItemsClone);
  }
  
  const save = (index, Syllabus) => {
    const syllabusItemsClone = [...syllabusItems];
    console.log(Syllabus);
    syllabusItemsClone[index] = Syllabus;
    syllabusItemsClone[index].editMode = false;
    console.log(syllabusItemsClone)
    setSyllabusItems(syllabusItemsClone);
  }

  const cancel = index => {
    const syllabusItemsClone = [...syllabusItems];
    if(syllabusItemsClone[index].syllabusTitle === "" && syllabusItemsClone[index].description === "" && syllabusItemsClone[index].objective === "") {
      syllabusItemsClone.pop();
    }
    else {
      syllabusItemsClone[index].editMode = false;
    }
    setSyllabusItems(syllabusItemsClone);
  }

  const handleEdit = index => {
    const syllabusItemsClone = [...syllabusItems];
    syllabusItemsClone[index].editMode = true;
    setSyllabusItems(syllabusItemsClone);
  }

  const handleDelete = index => {
    const syllabusItemsClone = [...syllabusItems];
    syllabusItemsClone.splice(index,1);
    setSyllabusItems(syllabusItemsClone);
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