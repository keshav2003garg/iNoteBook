import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NoteState from './context/notes/NoteState'
import Navbar from './components/Navbar'
import NoteBook from './components/NoteBook'
import NotesCase from '../src/components/NotesCase'
import Alert from './components/Alert'
import Login from './components/Login'
import Signup from './components/Signup'
import PageNotFound from './components/PageNotFound'

export default function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
    setAlert({
        msg: message,
        type: type
    })
    setTimeout(()=>{
        setAlert(null)
    },1000)
}
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <Switch>
          <Route exact path="/"><><NoteBook showAlert={showAlert} /><NotesCase showAlert={showAlert} /></></Route>
          <Route exact path="/login"><Login key="login" showAlert={showAlert} /></Route>
          <Route exact path="/signup"><Signup key="signup" showAlert={showAlert} /></Route>
          <Route><PageNotFound /></Route>
        </Switch>
      </Router>
    </NoteState>
  )
}

