import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './src/App'
import Table from './Table.jsx'

function Main() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/' element = {<App/>} />
            <Route path='/table' element = {<Table/>}/>
        </Routes>
    </BrowserRouter> 
    </>
  )
}

export default Main
