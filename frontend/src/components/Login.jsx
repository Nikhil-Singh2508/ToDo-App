import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password:""
    })

    const [msg, setMsg] = useState('')

    const handleChange = (e) =>{
        const {name, value} = e.target        
        setFormData(prevData=>{
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setMsg('')
        const url = "http://127.0.0.1:8000/api/token/"
        try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok){
            throw new Error("Invalid Credential")
        }
        const data = await response.json();

        localStorage.setItem("access", data.access)
        localStorage.setItem("refresh", data.refresh)

        setMsg("Login Successfull!!")
        navigate('/')
        }catch{
            setMsg("Login Failed!!")
        }
    }

    return (
        <div>
            <h1>Login to your account</h1>
            
            <form action="" method="POST" onSubmit={handleSubmit}>
                <label>Username <input type="text" name="username" onChange={handleChange}/></label>
                <label>Password <input type="password" name="password" onChange={handleChange}/></label>
                <button type="submit">Login</button>
            </form>
            {msg && <h3>{msg}</h3>}
            <p>
                Don’t have an account? 
                <a href="/signup" className="text-blue-500 underline">Sign up</a>
            </p>
        </div>
    )
}