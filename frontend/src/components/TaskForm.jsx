import {useState, useEffect} from 'react';

export default function TaskForm(props){
    const [formData, setForm] = useState(
        {
            "id": null,
            "name": "",
            "description":"",
            "completed": false
        }
    )

    useEffect(() => {
    if (props.data) {
      setForm({
        id: props.data.id ?? null,
        name: props.data.name ?? "",
        description: props.data.description ?? "",
        completed: props.data.completed ?? false,
      });
    }
  }, [props.data]);

    function handleChange(e){
        const {name, value, type, checked} = e.target;
        setForm(prevData=>{
            return ({
                ...prevData, 
                [name] : type === 'checkbox' ? checked : value
            }
            )
        })
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        
        let method = formData.id ? "PUT":"POST"
        let url = formData.id ? `http://127.0.0.1:8000/tasks/${formData.id}/`: `http://127.0.0.1:8000/tasks/`
        
        await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access")}`
            },
            body: JSON.stringify(formData)
        
        }).then((response)=>response.json())
        .then((data)=>console.log(data))
        
        props.fetchTask();
        setForm({ "id": null,
            "name": "",
            "description":"",
            "completed": false})

    }

    return (
        <form action="" onSubmit={handleSubmit} className='grid grid-row-4 gap-6 text-center p-5 text-white bg-cyan-700 rounded-xl'>
            <label htmlFor="" className='grid grid-cols-2 '> Name
                <input value={formData.name} onChange={handleChange} type="text" name ="name" className='bg-amber-100 text-black'/>
            </label>
            <label htmlFor="" className='grid grid-cols-2'>
                Desription
                <textarea value ={formData.description} onChange={handleChange} id="" name = "description" className='bg-amber-100 text-black'></textarea>
            </label>
            <label htmlFor="" className='grid grid-cols-2'>
                Completed
                <input checked={formData.completed} onChange={handleChange} type="checkbox" name = "completed"/>
            </label>
            <button className="border-1 px-4 w-20 text-black bg-cyan-300 rounded-sm relative left-140" type='submit'> Add</button>
        </form>
    )
}