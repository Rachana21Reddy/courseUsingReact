import { useHistory } from "react-router-dom";
function Login() {
    const history = useHistory();
    const login = () => {
        const userName = document.getElementById("userName").value;
        const password = document.getElementById("pwd").value;
        fetch("http://localhost:4000/api/login", {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({userName:userName,password:password})
        })
        .then(response => {
           if (response.status === 200) {
               history.push("/syllabus");
           }
        })
    }
    return(
        <>
        <h1>Login</h1>
        <input type="text" name="userName" id="userName" placeholder="Enter username"></input><br></br>
        <input type="password" name="pwd" id="pwd" placeholder="Enter password"></input><br></br>
        <button onClick={login}>Login</button>
        </>
    )
}

export default Login;