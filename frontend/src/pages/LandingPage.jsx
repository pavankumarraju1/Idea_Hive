import { useEffect, useState } from "react"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { addAllUsers } from "../reduxSlices/allUsersSlice"
import Card from "../components/Card"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
    //const usersData = useSelector((store)=>store.allUsers)

    const[data,setData] = useState();
    const[loading,setLoading]=useState(false)
    
    const dispatch = useDispatch();
    const nav = useNavigate();

    const getAllDetails =async()=>{
        setLoading(true)
        try {
            const result = await axiosInstance.get('/user/allProfiles',{
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            dispatch(addAllUsers(result.data))
            //console.log(result);
            setData(result.data)
            setLoading(false)
            
        } catch (error) {
            setLoading(false)
            console.log(error)
            nav('/login')
            toast(error.response.data.message || error.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
    }
    }

    useEffect(()=>{
        getAllDetails()
    },[])
    //console.log(data);
    return (
        // <div className="flex justify-around flex-wrap gap-10 p-10">
        //   {
        //     data ? 
        //     (data.map((value,index)=>{
        //         return(
        //             <div key={index} className="card bg-base-100 image-full w-80 h-80 shadow-xl">
        //                 <figure>
        //                     <img
        //                         src={value.photourl}
        //                         alt="image" />
        //                 </figure>
        //                 <div className="card-body">
        //                     <h2 className="card-title">{value.name}</h2>
        //                     <p>{value.about}</p>
        //                     <div className="card-actions justify-end">
        //                         <button className="btn btn-neutral">send request</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         ) 
        //     }))  
            
        //     : 

        //     (<div><p>no data</p></div>)
        //   }  
        // </div>
        <Card data={data} load={loading} />   
    )
}

export default LandingPage