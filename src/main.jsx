import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import TrainingCalendar from './components/trainingCalender.jsx'
import App from './App.jsx'
import Home from './components/Home.jsx'
import TrainingList from './components/Training.jsx'
import CustomerList from './components/customer.jsx'
import Chart from './components/Chart.jsx'


const router = createBrowserRouter([



  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "/customer",
        element: <CustomerList />,
      },
      {
        path: "/training",
        element: <TrainingList />
      },
      {
        path: "/calendar",
        element: <TrainingCalendar />
      },
      {
        path: "/chart",
        element: <Chart />
      },
    ]
  }

]
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)