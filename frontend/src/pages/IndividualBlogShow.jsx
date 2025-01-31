import { useParams } from "react-router-dom"
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useEffect, useState } from "react";
import { MessageSquareDiff } from "lucide-react";

const IndividualBlogShow = () => {
  const { id } = useParams();
  const [blogData, setbolgData] = useState({})

  const getBlogData = async () => {
    try {
      const data = await axiosInstance.get(`/blog/getblog/view/${id}`)
      setbolgData(data.data)
    } catch (error) {
      toast.error(error.response.data.message || error.message, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }
      })
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
    <div className="p-4">
      {/* contentShow */}
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl text-center">{blogData.title}</h1>
        <img src={blogData.image} className="w-full sm:w-3/4 md:w-2/5 xl:5/6 rounded-xl mx-auto"></img>
        <div className="flex flex-wrap justify-center items-center gap-5">
          <span className="bg-[#ffbe00] text-black p-1 rounded">created At : {createdDate}</span>
          <span className="bg-[#ffbe00] text-black p-1 rounded">changes after creation : {(blogData.createdAt === blogData.updatedAt) ?
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
        <div className="flex items-end gap-10">
          <h1 className="mt-10 text-4xl">comments:</h1>
          <label className="form-control w-full max-w-xs">
            <input type="text" placeholder="your comments here..." className="input input-bordered w-full max-w-xs text-black" />
          </label>
          <button><p>Add:</p><MessageSquareDiff /></button>
        </div>
        <div>

        </div>
      </div>

    </div>
  )
}

export default IndividualBlogShow