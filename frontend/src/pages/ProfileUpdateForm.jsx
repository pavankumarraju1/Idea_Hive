import { useState } from "react"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { addUser } from "../reduxSlices/userSlice"

const ProfileUpdateForm = ({ userId, visible, setVisible, formData }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [data, setData] = useState({
        name: formData.name,
        age: formData.age,
        about: formData.about,
        gender: formData.gender
    })
    const [imageData, setImageData] = useState("");

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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevVal) => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosInstance.patch(
                `/user/updateProfile/${userId}`,
                { ...data, image: imageData },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setLoading(false);
            dispatch(addUser(res.data));
            toast.success("Profile Updated Successfully", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            setVisible(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
            console.error("API Error:", error);

            toast(error?.response?.data?.message || "Something went wrong", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
        }
    };
    //   return (
    //       <div className="mx-auto my-10 card bg-base-100 w-96 shadow-xl">
    //           <div className="card-body p-10">

    //               <label className="form-control w-full max-w-xs">
    //                   <div className="label">
    //                       <span className="label-text">name</span>
    //                   </div>
    //                   <input type="text"name="name" value={data.name}  placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e)=>handleChange(e)}/>
    //               </label>

    //               <label className="form-control w-full max-w-xs">
    //                   <div className="label">
    //                       <span className="label-text">age</span>
    //                   </div>
    //                   <input type="number" value={data.age} name="age" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => handleChange(e)} />

    //               </label><label className="form-control w-full max-w-xs">
    //                   <div className="label">
    //                       <span className="label-text">about</span>
    //                   </div>
    //                   <input type="text" name="about" value={data.about} placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => handleChange(e)} />
    //               </label>

    //               <label className="form-control w-full max-w-xs">
    //                   <div className="label">
    //                       <span className="label-text">profile pic</span>
    //                   </div>
    //                   <input type="file" name="image" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e) => handleImage(e)} />
    //               </label>
    //               <label className="form-control w-full max-w-xs mt-3">
    //                   <select className="input input-bordered w-full max-w-xs" value={data.gender} name="gender" onChange={(e) => handleChange(e)}>
    //                       <option value="" disabled >select your gender:</option>
    //                        <option value="male">male</option>
    //                       <option value="female">female</option>
    //                       <option value="others">others</option>
    //                   </select>
    //               </label>
    //           <button className="btn btn-info mt-3" onClick={handleClick}>update</button>
    //           </div>
    //       </div>
    //   )
    return (
        <> {visible && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="relative mx-auto my-10 card bg-base-100 w-96 shadow-xl">
                <button
                    className="absolute top-3 right-3 text-lg font-bold text-gray-500 hover:text-gray-800"
                    onClick={() => setVisible(false)}
                >
                    ✕
                </button>

                <div className="card-body p-10 text-black">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChange}
                        />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Age</span>
                        </div>
                        <input
                            type="number"
                            name="age"
                            value={data.age}
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChange}
                        />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">About</span>
                        </div>
                        <input
                            type="text"
                            name="about"
                            value={data.about}
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChange}
                        />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Profile Pic</span>
                        </div>
                        <input
                            type="file"
                            name="image"
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleImage}
                        />
                    </label>

                    <label className="form-control w-full max-w-xs mt-3">
                        <select
                            className="input input-bordered w-full max-w-xs"
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select your gender:
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </label>

                    <button className="btn btn-info mt-3" onClick={handleClick} disabled={loading}>
                        {loading ? <span className="absolute loading loading-dots loading-lg"></span> : "Update"}
                    </button>
                </div>
            </div>
        </div>}</>
    )

}

export default ProfileUpdateForm