import { useEffect,useState } from "react";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import SubscriotionsCard from "../components/SubscriotionsCard";

const MySubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async()=>{
    setLoading(true)
    try {
      const data = await axiosInstance.get('subscriber/getSubscriber')
      setSubscriptions(data.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message || error.message, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }
      })
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    getData()
  },[])

  return (
    <div>
      <SubscriotionsCard data={subscriptions} load={loading}/>
    </div>
  )
}

export default MySubscriptions