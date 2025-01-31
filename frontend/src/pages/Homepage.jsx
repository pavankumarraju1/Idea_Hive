import { Link } from "react-router-dom"

const Homepage = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-40 overflow-hidden">
      <div className="m-5">
        <Link to='/login'><button className="btn btn-outline btn-success m-2">login</button></Link>
        <Link to='/signup'><button className="btn btn-outline btn-accent m-2">signup</button></Link>
      </div>
      <div className="text-4xl text-center">welcome to idea hive,let your ideas flourish</div>
    </div>
  )
}

export default Homepage