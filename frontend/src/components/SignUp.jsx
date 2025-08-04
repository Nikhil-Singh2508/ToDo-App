import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const [formData, setFormData] = useState(
        {
            username: "",
            password: "",
            email:""
        }
    )
    
    const navigate = useNavigate()
    const [msg, setMsg] = useState("")

    const handleChange = (e) =>{
        const {name, value} = e.target
        setFormData(prevData =>{
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const url = "http://127.0.0.1:8000/registration/"
        
        await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
        .then(data => {
            setMsg(data.msg)
            navigate("/login")   
        }).catch(err => {
        console.error("Error:", err);
        setMsg("Something went wrong!");
    });

    }   


    return (
        <>
        <h1>Welcome ToDo Manager</h1>
        <form action="" onSubmit={handleSubmit} method="POST">
            <label htmlFor="">
                Username <input type="text" name="username" onChange={handleChange} required/>
            </label>
            <label htmlFor="">
                Password <input type="password" name="password" onChange={handleChange} required/>
            </label>
            <label htmlFor="">
                Email <input type="email" name="email" onChange={handleChange}/>
            </label>
            <button type="submit">Register</button>
        </form>
        {msg && <h3>{msg}</h3>}
        <h3>Have and account? <a href="/login">Login</a></h3>
        </>
        
    )
}