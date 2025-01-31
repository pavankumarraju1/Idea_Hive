import { BadgePlus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"
import BlogCard from "../components/BlogCard"

const AllBlogsShow = () => {
    const[blogData,setblogData] = useState();
    const[loading,setLoading] =useState(false)

    const getData = async()=>{
        setLoading(true)
        try {
            const data = await axiosInstance("/blog/getallblogs")
            setblogData(data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message || error.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        }
    }

    useEffect(()=>{
        getData();
    },[])
    return (
        <div className="">
            <Link to="/createblog">
                <div className="flex justify-center mt-10 ">
                    <button className="flex items-center gap-3 px-4 py-2 bg-[#ffbe00] rounded-md text-black">
                        <BadgePlus />
                        <p>Create A Blog</p>
                    </button>
                </div>
            </Link>

            <BlogCard data={blogData} load={loading}/>
        </div>
    )
}

export default AllBlogsShow