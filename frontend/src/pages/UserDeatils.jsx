
import { useParams } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Check, MessageSquareHeart } from "lucide-react";

const UserDeatils = () => {

    const { id } = useParams();

    const [userDetail, setuserDetails] = useState();
    const [subData, setSubData] = useState("")
    const [loading, setLoading] = useState(false)
    const [subload, setsubload] = useState(false)

    const getuserDetails = async () => {
        try {
            setLoading(true)
            const data = await axiosInstance.get(`/user/getUser/${id}`)
            setuserDetails(data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast(error.data.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        }
        finally {
            setLoading(false)
        }
    }

    const handleClick = async () => {
        setsubload(true)
        try {
            const data = await axiosInstance.post(`subscriber/addSubscriber/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            setSubData(data.data)
            setsubload(false)
        } catch (error) {
            setsubload(false)
            console.log(error);
            toast.error(error.response.data.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        }
        finally {
            setsubload(false)
        }
    }
    useEffect(() => {
        getuserDetails()
    }, [])

    return (
        <>
            {loading ? <span className="loading loading-spinner text-warning w-1/12 flex justify-center mx-auto my-52"></span>
                :
                <div className="flex flex-col items-center m-5">
                    {/* Card Section */}
                    <div className="card card-side bg-base-100 shadow-xl mt-10 flex flex-col sm:flex-row w-full max-w-xl">
                        <figure className="w-full sm:w-1/3 flex justify-center items-center rounded-xl">
                            <img
                                src={userDetail?.photourl}
                                alt="User"
                                className="w-full h-auto max-h-64 object-cover rounded-l-xl"
                            />
                        </figure>
                        <div className="card-body bg-black rounded-xl">
                            <h2 className="card-title">{userDetail?.name}</h2>
                            <p>{userDetail?.about}</p>
                            <div className="flex gap-5">
                                <p>Age: {userDetail?.age}</p>
                                <p>Gender: {userDetail?.gender}</p>
                            </div>
                        </div>
                    </div>

                    {/* Subscribe Section */}
                    <div className="mt-10 flex flex-col justify-center items-center sm:flex-row gap-5 px-3 text-center sm:text-left mb-10">
                        <p className="text-white">Subscribe me to explore my ideas:</p>
                        {subData == "" ? <button className="flex gap-3 items-center justify-center bg-[#ffbe00] px-3 py-2 rounded text-red-700" onClick={handleClick}>
                            {subload ? <span className="loading loading-ring loading-md"></span> :
                                <>  <span>Subscribe</span>
                                    <MessageSquareHeart /></>
                            }
                        </button> : <span><p>subscribed</p><Check /></span> }
                    </div>
                </div>}
        </>
    )
}

export default UserDeatils