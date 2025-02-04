// import { useState } from "react";
// import { MessageSquareDiff } from "lucide-react";
// import axiosInstance from "../lib/axios";
// import { useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import CommentCard from "../components/CommentCard";

// const Commentspage = () => {
//     const {id} = useParams()
//     const[comment,setComment] = useState("")

//     const addComment = async()=>{
//         try {
//             const data = await axiosInstance.post(`/comment/addComment/${id}`,{comment},{
//                 headers: {
//                     "Content-Type": "application/json",
//                 }
//             })
//             if(data.data){
//                 toast.success("comment added", {
//                     style: {
//                         borderRadius: '10px',
//                         background: '#333',
//                         color: '#fff',
//                     }
//                 })
//             }
//         } catch (error) {
//             toast.error(error.response.data.message || error.message, {
//                 style: {
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                 }
//             })
//         }
        
//     }

//     const handleClick =()=>{
//         addComment()
//         setComment("")
//     }

//   return (
//     <div className="mb-10">
//           <div className="flex items-end gap-6">
//               <h1 className="mt-10 text-4xl">comments:</h1>
//               <label className="form-control w-full max-w-xs">
//                   <input type="text" value={comment} placeholder="your comments here..." className="input input-bordered w-full max-w-xs text-black" 
//                   onChange={(e)=>setComment(e.target.value)}/>
//               </label>
//               <button className="bg-[#ffbe00] rounded p-2" onClick={handleClick}><MessageSquareDiff /></button>
//           </div>
//           <div className="mt-5 flex flex-col">
//             <CommentCard id={id}/>
//           </div>
//     </div>
//   )
// }

// export default Commentspage

import { useState, useEffect } from "react";
import { MessageSquareDiff } from "lucide-react";
import axiosInstance from "../lib/axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CommentCard from "../components/CommentCard";

const Commentspage = () => {
    const { id } = useParams();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]); // State to hold comments

    const fetchComments = async () => {
        try {
            const response = await axiosInstance.get(`/comment/getComments/${id}`);
            setComments(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                style: { borderRadius: "10px", background: "#333", color: "#fff" },
            });
        }
    };

    useEffect(() => {
        fetchComments(); // Fetch comments when the component mounts
    }, [id]);

    const addComment = async () => {
        try {
            const data = await axiosInstance.post(
                `/comment/addComment/${id}`,
                { comment },
                { headers: { "Content-Type": "application/json" } }
            );

            if (data.data) {
                toast.success("Comment added!", {
                    style: { borderRadius: "10px", background: "#333", color: "#fff" },
                });

                setComment("");
                fetchComments(); // Re-fetch comments after adding a new one
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                style: { borderRadius: "10px", background: "#333", color: "#fff" },
            });
        }
    };

    return (
        <div className="mb-10">
            <div className="flex items-end gap-6">
                <h1 className="mt-10 text-4xl">Comments:</h1>
                <label className="form-control w-full max-w-xs">
                    <input
                        type="text"
                        value={comment}
                        placeholder="Your comments here..."
                        className="input input-bordered w-full max-w-xs text-black placeholder-gray-500 bg-white"
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
                <button className="bg-[#ffbe00] rounded p-2" onClick={addComment}>
                    <MessageSquareDiff />
                </button>
            </div>

            <div className="mt-5 flex flex-col">
                {comments.length > 0 ? (
                    comments.map((c) => <CommentCard key={c._id} commentData={c} />)
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </div>
        </div>
    );
};

export default Commentspage;