import { useSelector } from "react-redux"
import {UserRound} from 'lucide-react'
import { Link } from "react-router-dom"

const Navbar = () => {
    const storeData = useSelector((store) => store.user)
  return (
      <div className="navbar bg-blue-900 text-white flex justify-center">
         <div className="navbar-start pl-3">
              {storeData && <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                  </div>
                  <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content rounded-box z-[100] mt-3 w-52 p-2 shadow bg-slate-600 text-white ml-4">
                      <Link to='/profile'><li className="mb-2">Profile</li></Link>
                      <Link to='/mysubs'><li className="mb-2">My Subscriptions</li></Link>
                      <Link to='/logout'><li className="mb-2">logout</li></Link>
                  </ul>
              </div>
             }
             {
                  storeData && <Link to="/blogs"><button className="btn btn-warning ml-2 p-2">my blogs</button></Link>
             }
          </div>
          <div className="navbar-center">
              <Link to='/land'><p className="btn btn-ghost text-xl">Idea Hive</p></Link>
          </div>
          <div className="navbar-end mr-4">
              {storeData && <div className="flex flex-wrap gap-6 justify-center items-center"> 
                <p className="whitespace-normal">welcome, {storeData?.name}</p>
                  <Link to='/profile' className="btn btn-ghost btn-circle">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                          <div className="w-10 rounded-full">
                              {storeData?.photourl ? <img
                                  alt="Tailwind CSS Navbar component"
                                  src={storeData?.photourl} /> : <UserRound className="mt-2 ml-2" />}
                          </div>
                      </div>
                  </Link>
                  <Link to="/land"><button className="btn btn-xs">Home</button></Link>
              </div>}  
          </div>
      </div>
  )
}

export default Navbar