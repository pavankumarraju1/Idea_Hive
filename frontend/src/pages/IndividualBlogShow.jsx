import { useParams } from "react-router-dom"
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useEffect, useState } from "react";
import Commentspage from "./Commentspage";


const IndividualBlogShow = () => {
  const { id } = useParams();

  const[loading,setLoading] = useState(false)
  const [blogData, setbolgData] = useState({})

  const getBlogData = async () => {
    setLoading(true)
    try {
      const data = await axiosInstance.get(`/blog/getblog/view/${id}`)
      setbolgData(data.data)
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
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    getBlogData()
  }, [])

  const createdDate = new Date(blogData.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //console.log(createdDate);

  return (
    <>
      {loading ? <span className="loading loading-spinner text-warning w-1/12 flex justify-center mx-auto my-52"></span>
        :

        <div className="p-4">
          {/* contentShow */}
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl text-center">{blogData.title}</h1>
            <img src={blogData.image} className="w-full sm:w-3/4 md:w-2/5 xl:5/6 rounded-xl mx-auto"></img>
            <div className="flex flex-wrap justify-center items-center gap-5">
              <span className="bg-[#ffbe00] text-black p-1 rounded">created At : {createdDate}</span>
              <span className="bg-[#ffbe00] text-black p-1 rounded">Any changes done : {(blogData.createdAt === blogData.updatedAt) ?
                <div className="badge badge-warning">❌</div> :
                <div className="badge badge-info">✔️</div>}
              </span>
            </div>
            <div>
              <p className="text-lg m-4 text-justify leading-9">{blogData.content}</p>
            </div>
          </div>
          {/* comments */}
          <div>
            <Commentspage />
          </div>

        </div>
      }
    </>  
  )
}

export default IndividualBlogShow