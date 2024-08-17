import { useState } from 'react'
import './App.css'
import { SortUserList } from './components/SortUserList'
import { FilterUserList } from './components/FilterUserList'

function App() {
  return (
    <>
  <SortUserList />
  <FilterUserList />
    </>
  )
}

export default App
