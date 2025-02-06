import { useNavigate } from "react-router-dom"

const SubscriotionsCard = ({data,load,handler}) => {
    const len = data?.length || 6
    //console.log(data);
    const nav = useNavigate()
  return (
      <div className="flex justify-around flex-wrap gap-16 p-16">
          {!load ? (
              data?.length > 0 ? (
                  data.map((value, index) => (
                      <div key={index} className="card bg-base-100 image-full w-80 h-80 shadow-xl">
                          <figure>
                              <img src={value.subscriberId.photourl} alt="image" />
                          </figure>
                          <div className="card-body">
                              <h2 className="card-title text-3xl text-white">{value.subscriberId.name}</h2>
                              <p className="text-xl text-white">{value.subscriberId.about}</p>
                              <div className="card-actions justify-end gap-5">
                                  <button className="btn btn-neutral bg-black  text-white hover:text-black hover:bg-[#ff0033]" onClick={()=>handler(value.subscriberId._id)}>Unsubscribe</button>
                                  <button className="btn btn-neutral bg-black  text-white hover:text-black hover:bg-[#ffbe00]" onClick={() => nav(`/mysubscriptions/allBlogs/${value.subscriberId._id}`)}>My Ideas</button>
                                  
                              </div>
                          </div>
                      </div>
                  ))
              ) : (
                  <p className="text-white text-center text-3xl mt-20">you have not subscribed to any profile</p>
              )
          ) : (
              Array.from({ length: len }).map((_, idx) => (
                  <div key={idx} className="card bg-gray-800 animate-pulse w-80 h-80 shadow-xl relative rounded-lg">
                      <div className="w-full h-full bg-gray-300 rounded-lg"></div> {/* Shimmer for the image */}
                      <div className="h-6 animate-bounce bg-gray-800 rounded w-2/4 absolute left-3 top-10"></div>
                      <div className="h-6 animate-bounce bg-gray-800 rounded w-4/5 absolute left-3 top-28"></div>
                      <div className="animate-bounce h-10 bg-gray-700 rounded-lg w-1/4 mt-4 absolute bottom-5 right-8"></div>
                  </div>
              ))
          )}
      </div>
  )
}

export default SubscriotionsCard