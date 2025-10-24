import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<Home />} />
        
        <Route path = "app" element = {<Layout />}>
          <Route index element = {<Dashboard />} />
          <Route path = "builder/:resumeId" element = {<ResumeBuilder />} />
        </Route>

        <Route path = "view/:resumeId" element = {<Preview />} />
        <Route path = "login" element = {<Login />} />
      </Routes>
    </div>
  )
}

export default App
