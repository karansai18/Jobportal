
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies.jsx';
import CreateCompany from './components/admin/CreateCompany.jsx';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants.jsx';

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },

  // admin

  {
    path:'/admin/companies',
    element:<Companies/>
  },

  {
    path:'/admin/companies/create',
    element:<CreateCompany/>
  },
  {
    path:'/admin/companies/:id',
    element:<CompanySetup/>
  },
  {
    path:'/admin/jobs',
    element:<AdminJobs/>
  },
  {
    path:'/admin/jobs/create',
    element:<PostJob/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  }

 
])

function App() {
 

  return (
    <div>
       
       <RouterProvider router={appRouter}/> 

    </div> 
  )
}

export default App
