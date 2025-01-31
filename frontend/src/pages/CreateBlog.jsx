import { SquarePlus } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

import { useNavigate } from "react-router-dom"
import axiosInstance from "../lib/axios"

const CreateBlog = () => {

    const nav = useNavigate();

    const[upload,setUpload] = useState(false)
    const[loading,setLoading] = useState(false)

    const[data,setData] = useState({
        title:"",
        description:"",
        content:""
    })

    const [imageData, setImageData] = useState("")
    //const [imageBinaryData, setimageBinaryData] = useState("")

    const handleImage = (e) => {
        const file = e.target.files[0];
        fileConversion(file);
    }

    const fileConversion = (f) => {
        const reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = () => {
            setImageData(reader.result);
        }
    }

    const handleChange=(e)=>{
        const{name,value} = e.target
        setData((prevData)=>{
            return{
                ...prevData,
                [name]:value
            }
        })
    }

    const handleUpload=()=>{
        setUpload((prevVal)=>!prevVal)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true)
        const sData = {...data,image:imageData};
        //console.log(sData);
        try {
            const data = await axiosInstance.post("/blog/addblog",sData,{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            toast.success(data.data.message|| "done",{
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
            nav("/blogs")
        } catch (error) {
            //console.log(error);
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

    return (
        <>
            <h1 className="mt-10 text-center text-3xl"><i>Write Your Blog</i></h1>
            <div className="flex flex-col justify-center items-center gap-5 mt-5 p-5">
                <div className="w-full flex justify-center flex-wrap gap-3">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="text-white text-xl label-text">Title:</span>
                        </div>
                        <input type="text" name="title" value={data.title} placeholder="title here..." className="input input-bordered text-lg w-full max-w-xs text-black" required 
                        onChange={(e)=>handleChange(e)}/>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="text-white text-xl label-text">description:</span>
                        </div>
                        <input type="text" name="description" value={data.description} placeholder="description here..." className="input input-bordered w-full text-lg max-w-xs text-black" required onChange={handleChange} />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="text-white text-xl label-text">image:</span>
                            <span onClick={handleUpload}><button className="bg-[#ffbe00] text-black rounded pr-2 pl-2">{!upload ? "upload from computer" : "paste url" }</button></span>
                        </div>
                        <input type={upload? "file" : "text"} name="image" placeholder="url" className="input input-bordered w-full text-lg max-w-xs text-black" required onChange={(e)=>upload ? handleImage(e) : setImageData(e.target.value)} />
                    </label>
                </div>

                <div className="w-full flex justify-center">
                    <label className="form-control w-full max-w-3xl">
                        <div className="label">
                            <span className="text-white text-xl label-text">Content:</span>
                        </div>
                        <textarea
                            name="content"
                            value={data.content}
                            className="textarea textarea-info text-base w-full text-black h-60"
                            placeholder="Write your blog content here..." required onChange={handleChange}></textarea>
                    </label>
                </div>
                <button onClick={handleSubmit} className="bg-[#ffbe00] text-black p-2 rounded">{loading ? <span className="loading loading-spinner loading-md"></span> : <span className="flex gap-2"><SquarePlus />add</span>}</button>
            </div>
        </>
       
    )
}

export default CreateBlog