// import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

function SyllabusForm(props) {
  return(
    <>
    <lable>Syllabus Title</lable>
    <input type="text" value={props.syllabusData.syllabusTitle}></input>
    <br></br>
    <lable>Description</lable>
    <input type="text" value={props.syllabusData.description}></input>
    <br></br>
    <lable>Objective</lable>
    <input type="text" value={props.syllabusData.objective}></input>
    <br></br><br></br>
    </>
  );
}

function SyllabusCard(props) {
  return (
    <>
      <p>{props.syllabusData.syllabusTitle}</p>
      <p>{props.syllabusData.description}</p>
      <p>{props.syllabusData.objective}</p>
    </>
  );
}

function Display(props) {
  const syllabusItems= props.syllabusItems;
  return(
    syllabusItems.map((syllabusItem) => {
    if(syllabusItem.editMode === "false") {
      return <SyllabusCard syllabusData={syllabusItem}></SyllabusCard>

    }
    return <SyllabusForm syllabusData={syllabusItem}></SyllabusForm>
  }));
}

function App() {
  const syllabusItems = [ 
    {
      syllabusTitle: "C",
      description: "Basics of C",
      objective: "Basics",
      editMode: "false"
    },
    {
      syllabusTitle: "C",
      description: "DataTypes",
      objective: "DataTypes",
      editMode: "true"
    }
  ];
  return (
    ReactDOM.render(
      <Display syllabusItems={syllabusItems} />,
      document.getElementById('root')
    )
  );
}

export default App;