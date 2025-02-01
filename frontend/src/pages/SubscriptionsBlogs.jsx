import { useParams } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { useEffect,useState } from "react";
import toast from "react-hot-toast";
import BlogCard from "../components/BlogCard";

const SubscriptionsBlogs = () => {
    const {id} = useParams()
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const getBlogData = async()=>{
        try {
            setLoading(true)
            const data = await axiosInstance.get(`/subscriber/getBlog/${id}`)
            setBlogs(data.data)
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        }
    }
    useEffect(()=>{
        getBlogData()
    },[])
  return (
    <>
        <BlogCard data={blogs} load={loading}/>
    </>
  )
}

export default SubscriptionsBlogs