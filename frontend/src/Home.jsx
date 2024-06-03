import { BrowserRouter, Routes, Route } from 'react-router-dom'
import First from './First'
import Table from './Table'
function Home() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<First />}></Route>
                    <Route path='/table' element={<Table />}></Route>
                </Routes>
            </BrowserRouter >
        </>
    )
}

export default Home
