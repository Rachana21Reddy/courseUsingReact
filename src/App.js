// import logo from './logo.svg';
import './App.css';

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
    syllabusItems.map((syllabusItem) => {
      if(syllabusItem.editMode === "false") {
        return <SyllabusCard syllabusData={syllabusItem}></SyllabusCard>
  
      }
      return <SyllabusForm syllabusData={syllabusItem}></SyllabusForm>
    })
  );
}

export default App;