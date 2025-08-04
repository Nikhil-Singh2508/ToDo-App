import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'

export default function Layout(){
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={<SignUp />}/>
                <Route path='/login' element={<Login />}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}