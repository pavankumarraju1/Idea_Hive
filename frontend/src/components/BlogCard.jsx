import { useNavigate } from "react-router-dom"


const BlogCard = ({ data, load }) => {
    const len = data?.length || 6
    const nav = useNavigate();
    console.log(data)

    if (data?.length == 0) {
        return (
            <p className="text-white text-center text-3xl mt-16">No blogs available,try to make one</p>
        )
    }
    return (
        <div className="flex justify-around flex-wrap gap-16 p-16">
            {load ? (
                data?.map((value, index) => (
                    <div key={index} className="card bg-base-100 image-full w-80 h-80 shadow-xl">
                        <figure>
                            <img src={value.image} alt="image" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-3xl text-white">{value.title}</h2>
                            <p className="text-xl text-white">{value.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-neutral bg-black  text-white hover:text-black hover:bg-[#ffbe00]"
                                    onClick={() => nav(`/blog/${value._id}`)}>View</button>
                            </div>
                        </div>
                    </div>
                ))
            )

                :

                (Array.from({ length: len }).map((_, idx) => (
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

export default BlogCard