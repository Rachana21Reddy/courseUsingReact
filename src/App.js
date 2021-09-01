// import logo from './logo.svg';
import './App.css';
import React, { useState, useRef } from 'react';

function App() {
  const syllabusTitle = useRef(null);
  const description = useRef(null);
  const objective = useRef(null);

  const [syllabusItems, setSyllabusItems] =  useState([]);
  const syllabusItemsClone = [ ...syllabusItems];
  const DisplayForm = () => {
     syllabusItemsClone.push({
        syllabusTitle: "",
        description: "",
        objective: "",
        editMode: true
      });
      setSyllabusItems(syllabusItemsClone);
  }

  const SyllabusForm = (props) => {
    return(
      <>
      <br></br>
      <lable>Syllabus Title</lable>
      <input type="text" defaultvalue={props.syllabusData.syllabusTitle} ref={syllabusTitle}></input>
      <br></br>
      <lable>Description</lable>
      <input type="text" defaultvalue={props.syllabusData.description} ref={description}></input>
      <br></br>
      <lable>Objective</lable>
      <input type="text" defaultvalue={props.syllabusData.objective} ref={objective}></input>
      <br></br>
      <button onClick={Save}>save</button>
      <br></br>
      </>
    );
  }
  
  const Save = () => {
    syllabusItemsClone.pop();
    syllabusItemsClone.push({
      syllabusTitle: syllabusTitle.current.value,
      description: description.current.value,
      objective: objective.current.value,
      editMode: false
    });
    console.log(syllabusItemsClone);
    setSyllabusItems(syllabusItemsClone);
  }
  
  const SyllabusCard = (props) => {
    return (
      <>
        <br></br><strong>{props.number}</strong><br></br>
        <lable>syllabusTitle:{props.syllabusData.syllabusTitle}</lable><br></br>
        <lable>Description:{props.syllabusData.description}</lable><br></br>
        <label>Objective:{props.syllabusData.objective}</label><br></br>
        <button>Edit</button><br></br>
      </>
    );
  }

  return (
    <div>
      <button onClick={DisplayForm}>Add syllabus</button>
      {syllabusItems.map((syllabusItem, index) => {
        return((syllabusItem.editMode === false ? 
        (<SyllabusCard key={`SyllabusCard.${index}`} syllabusData={syllabusItem} number={index+1}></SyllabusCard>)
        :(<SyllabusForm syllabusData={syllabusItem}></SyllabusForm>)))}
      )}
    </div>
    )
  }
  
  export default App;