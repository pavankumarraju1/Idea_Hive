import {StepForward} from 'lucide-react'
import { Link } from 'react-router-dom'

const Card = ({data,load}) => {
    const len = data?.length || 6
  return (
      <div className="flex justify-around flex-wrap gap-20 mt-5 p-5">
          {
              !load ?
                  (data?.map((value, index) => {
                      return (
                          <div key={index} className="card bg-base-100 image-full w-80 h-80  shadow-xl">
                              <figure className=''>
                                  <img
                                      src={value.photourl}
                                      alt="image" />
                              </figure>
                              <div className="card-body">
                                  <h2 className="card-title text-3xl text-white">{value.name}</h2>
                                  <p className="text-xl text-white">{value.about}</p>
                                  <div className="card-actions justify-end">
                                      <Link to={`/userDetails/${value._id}`} ><button className="btn btn-neutral text-base hover:text-black hover:bg-[#ffbe00] "><StepForward /></button></Link>
                                  </div>
                              </div>
                          </div>
                      )
                  }))

                  :

                  ( 
                        Array.from({length:len}).map((_,idx)=>{
                            return(
                                <div key={idx} className="flex justify-around flex-wrap gap-10 p-5">
                                    <div className="card bg-gray-800 animate-pulse w-80 h-80 shadow-xl relative rounded-lg">
                                    <div className="w-full h-full bg-gray-300 rounded-lg"></div> {/* Shimmer for the image */}

                                    <div className="h-6 animate-bounce bg-gray-800 rounded w-2/4 absolute left-3 top-10"></div>
                                    <div className="h-6 animate-bounce bg-gray-800 rounded w-4/5 absolute left-3 top-28"></div>
                                    {/* <div className="h-4 bg-gray-300 rounded w-4/5 absolute"></div>  */}
                                    <div className="animate-bounce h-10 bg-gray-700 rounded-lg w-1/4 mt-4 absolute bottom-5 right-8"></div>
                                    </div>
                                </div>
                            )
                        })
                      
                      
                  )
          }
      </div>
  )
}

export default Card