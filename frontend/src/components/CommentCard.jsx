// import { useEffect, useState } from "react"
// import axiosInstance from "../lib/axios"
// import toast from "react-hot-toast"

// const CommentCard = ({id}) => {
//     const[comments,setComments] = useState([])

//     const getComments = async()=>{
//         try {
//             const data = await axiosInstance.get(`/comment/getComments/${id}`)
//             setComments(data?.data)
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
//     useEffect(()=>{
//         getComments()
//     },[id])

//     if(comments.length==0){
//         return(
//             <div><p>no comments found</p></div>
//         )
//     }
//   return (
//     <>
//         {
//             comments.map((val,idx)=>{
//                 return(
//                     <div key={idx} className="inline-flex items-center bg-white text-black gap-4 p-3 rounded-lg shadow-md max-w-fit mt-5">
           
//                         <img src={val.userId.photourl} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />

//                         <p className="font-semibold">{val.userId.name}</p>

//                         <div className="flex flex-col">
//                             <p className="text-sm font-medium">{val.comment}</p>
//                             <p className="text-xs text-gray-500">
//                                 {new Date(val.createdAt).toLocaleDateString("en-US", {
//                                     weekday: "long",
//                                     year: "numeric",
//                                     month: "long",
//                                     day: "numeric",
//                                 })}
//                             </p>
//                         </div>
//                     </div>
//                 )
//             })
//         }
//     </>
//   )
// }

// export default CommentCard


const CommentCard = ({ commentData }) => {
    return (
        <div className="flex items-center bg-white text-black gap-4 p-3 rounded-lg shadow-md max-w-fit mt-5">
            <img src={commentData.userId.photourl} alt="User Avatar" className="w-12 h-12 rounded-full object-cover" />
            <p className="font-semibold">{commentData.userId.name}</p>
            <div className="flex flex-col">
                <p className="text-sm font-medium">{commentData.comment}</p>
                <p className="text-xs text-gray-500">
                    {new Date(commentData.createdAt).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>
        </div>
    );
};

export default CommentCard;