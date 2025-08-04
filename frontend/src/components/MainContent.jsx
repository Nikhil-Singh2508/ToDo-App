import React,{useState, useEffect} from "react";
import TaskForm from "./TaskForm";
import { useNavigate } from "react-router-dom";

export default function MainContent(){
    const [ToDoTask, setToDoTask] = useState([])
    const [data, setData] = useState({
        "id":null,
        "name": "",
        "description": "",
        "completed": false
    })

    const navigate = useNavigate();

    const fetchTask = ()=>{
        const token = localStorage.getItem('access')
        fetch("http://127.0.0.1:8000/tasks/",{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response)=> {
            if (response == 401){
                logout()
            }
            return response.json()})
        .then((data)=>{
            setToDoTask(data)
        })
        .catch((err)=>{
            console.log(err.message);
        });
    }

    useEffect(()=>{
        fetchTask();
    }, [])

    function logout(){
        localStorage.clear()
        navigate("/login")
    }

    async function handleDelete(index){
        let url = `http://127.0.0.1:8000/tasks/${ToDoTask[index].id}/`
        await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access")}`
            }
        }).then(response=>response.json()).then(data=>console.log(data))
        fetchTask();
    }


    let taskElement = ToDoTask.map((x, index)=>{
        return (
            <tr key={x.id} className="bg-cyan-400">
            <td className="px-4 py-2 text-center border border-cyan-800">{index+1}</td>
            <td className="px-4 py-2 text-center border border-cyan-800">{x.name}</td>
            <td className="px-4 py-2 text-center border border-cyan-800">{x.description}</td>
            <td className="px-4 py-2 text-center border border-cyan-800"><input type="checkbox" checked={x.completed} readOnly/></td>
            <td className="px-4 py-2 text-center border border-cyan-800"><button onClick={()=>setData(ToDoTask[index])} className="bg-amber-500 px-1 rounded-sm">Edit</button></td>
            <td className="px-4 py-2 text-center border border-cyan-800"><button onClick={()=>handleDelete(index)} className="bg-red-600 px-1 rounded-sm">Delete</button></td>
            </tr>
        )
    })
    
    return (
        <>
        <button onClick={logout}>Logout</button>
        <div className="flex justify-center items-center h-[100vh]">
            <div className="flex flex-col gap-3">
                <div className="overflow-hidden rounded-2xl border-2 border-cyan-950">
                <table className="table-auto w-[700px] bg-cyan-600 border-collapse">
                <thead className="bg-cyan-500">
                    <tr className="border border-cyan-950">
                        <th className="px-4 py-2 border border-cyan-800">S. No.</th>
                        <th className="px-4 py-2 border border-cyan-800">Name</th>
                        <th className="px-4 py-2 border border-cyan-800">Description</th>
                        <th className="px-4 py-2 border border-cyan-800">Completed</th>
                        <th className="px-4 py-2 border border-cyan-800"></th>
                        <th className="px-4 py-2 border border-cyan-800"></th>
                    </tr>
                </thead>
                <tbody>
                        {ToDoTask.length > 0 ? (
                            taskElement
                        ) : (
                            <tr>
                            <td colSpan="6" className="text-center py-4">
                                No tasks yet. Add your first task!
                            </td>
                            </tr>
                        )}
                </tbody>
            </table>
            </div>
            <div className="">
                <TaskForm fetchTask={fetchTask} data = {data}/>
            </div>
            </div>
        </div>
        </>
    )
} 

