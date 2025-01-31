import toast from "react-hot-toast"
import axiosInstance from "../lib/axios"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../reduxSlices/userSlice";


const LogoutPage = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const fun = async()=>{
        try {
            const res = await axiosInstance.post('/auth/logout')
            toast(res.data.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }})
            dispatch(removeUser());
            return nav('/home')
        } catch (error) {
            toast(error.response.data.message)
        }
    }
    
    useEffect(()=>{
        fun()
    },[])
  return (
    <div>LogoutPage</div>
  )
}

export default LogoutPage