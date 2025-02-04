import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../reduxSlices/userSlice";
import axiosInstance from "../lib/axios";

const Body = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const getProfileDetails = async () => {
        try {
            const res = await axiosInstance.get("/user/profile");
            dispatch(addUser(res.data));
            //nav('/land')
        } catch (error) {
            if (error.response?.status === 401) {
                if (location.pathname !== "/signup") {
                    nav("/login");
                }
            } else{
                nav('/home')
            }
            // toast.error(error.response.data.message, {
            //   style: {
            //     borderRadius: '10px',
            //     background: '#333',
            //     color: '#fff',
            //   }
            // })
        }
    }
    const d = useSelector((store) => store.user)

    useEffect(() => {
        if(!d){
            getProfileDetails()
        }
    }, [d,nav])

  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Body