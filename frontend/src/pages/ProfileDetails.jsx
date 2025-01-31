import { useState } from "react";
import { useSelector } from "react-redux"
import ProfileUpdateForm from "./ProfileUpdateForm";


const ProfileDetails = () => {
  const[visible,setVisible] = useState(false);
    const data = useSelector((store)=>store.user);
    //console.log("profike",data);
  return (
    <div className="flex flex-col justify-center">
        <h1 className="text-4xl text-center m-6">your details</h1>
      <div className="w-1/6 m-auto"><img src={data?.photourl} alt="your photo" className="rounded-badge border-2 border-black w-full "></img></div>
      <div className="flex justify-center items-center gap-5 flex-wrap mb-6"><div className="p-3">
        <div className="overflow-x-auto">
          <table className="table">
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>name</td>
                <td>{data?.name}</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>age</td>
                <td>{data?.age}</td>
              </tr>
              <tr>
                <th>3</th>
                <td>gender</td>
                <td>{data?.gender}</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>4</th>
                <td>about</td>
                <td>{data?.about}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        <button className="btn btn-active btn-accent" onClick={() => setVisible(true)}>update</button></div>
      
      {visible && <ProfileUpdateForm userId={data._id} visible={visible} setVisible={setVisible} formData={data}/>}    
      </div>
  )
}

export default ProfileDetails