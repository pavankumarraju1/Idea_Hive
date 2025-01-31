import { useState } from "react";

import { UserPlus, Mail, Lock, User, ArrowRight, Loader, Eye, EyeOff, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast'

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axiosInstance from "../lib/axios";
import { useDispatch } from "react-redux";
import { addUser } from "../reduxSlices/userSlice";


const SignupPage = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: 0,
        gender: ""
    });
    const [confirmPassword, setConfirmPassword] = useState("");

    const [togglePass, setTogglePass] = useState(false);
    const [toggleCPass, setToggleCPass] = useState(false);

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setFormData((prevVal) => {
            return ({ ...prevVal, [name]: value })
        })
    }

    const handleTogglePassword = () => {
        setTogglePass((val) => {
            return !val;
        })
    }

    const handleToggleCPassword = () => {
        setToggleCPass((val) => {
            return !val;
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formData.password !== confirmPassword) {
            setLoading(false);
            return toast.error("⚠️enter same passwords⚠️",{
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
        }
        try {
            const signupData = await axiosInstance.post('/auth/signup', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setLoading(false);
            //console.log(signupData);
            dispatch(addUser(signupData.data.user))
            toast(signupData.data.message, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            })
            nav('/land');
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message || error.message || "an error occurred", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            });
        }

    };

    return (
        <div className='flex flex-col justify-center px-4 py-2 sm:px-6 lg:px-8 text-white'>
            <motion.div
                className='sm:mx-auto sm:w-full sm:max-w-md'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create your account</h2>
            </motion.div>

            <motion.div
                className='mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-7'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
                                Full name
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <User className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                </div>
                                <input
                                    id='name'
                                    type='text'
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleOnchange(e)}
                                    className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                    placeholder='Enter your  name'
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
                                Email address
                            </label>
                            <div className='mt-1 relative rounded-md shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                </div>
                                <input
                                    id='email'
                                    type='email'
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => handleOnchange(e)}
                                    className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm'
                                    placeholder='you@example.com'
                                />
                            </div>
                        </div>
                        <div className="flex gap-5 w-full">
                            <div className="w-1/2">
                                <label htmlFor='password' className='block text-sm font-medium text-gray-300'>
                                    Password
                                </label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                    </div>
                                    <input
                                        id='password'
                                        name="password"
                                        type={togglePass ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={(e) => handleOnchange(e)}
                                        className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                        placeholder='•••'
                                    />
                                    <div className='absolute right-2 top-2 flex items-center cursor-pointer' onClick={handleTogglePassword}>
                                        {!togglePass ? <Eye className='h-5 w-5 text-gray-400' aria-hidden='true' /> : <EyeOff className='h-5 w-5 text-gray-400' aria-hidden='true' />}
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/2">
                                <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>
                                    Confirm Password
                                </label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                    </div>
                                    <input
                                        id='confirmPassword'
                                        type={toggleCPass ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className=' block w-full px-3 py-2 pl-10 bg-gray-700 border
									 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                                        placeholder='•••'
                                    />
                                    <div className='absolute right-2 top-2 flex items-center cursor-pointer' onClick={handleToggleCPassword}>
                                        {!toggleCPass ? <Eye className='h-5 w-5 text-gray-400' aria-hidden='true' /> : <EyeOff className='h-5 w-5 text-gray-400' aria-hidden='true' />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between gap-5 w-full">
                            <div className="w-1/3">
                                <label htmlFor='age' className='block text-sm font-medium text-gray-300'>
                                    Age
                                </label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Calendar className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                    </div>
                                    <input
                                        id='age'
                                        type='number'
                                        name="age"
                                        required
                                        value={formData.age}
                                        onChange={(e) => handleOnchange(e)}
                                        className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm'
                                        placeholder='age'
                                    />
                                </div>
                            </div>
                            <div className="w-2/3">
                                <label htmlFor='gender' className='block text-sm font-medium text-gray-300'>
                                    gender
                                </label>
                                <div className='mt-1 relative rounded-md shadow-sm'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <User className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                    </div>
                                    <select required name="gender" value={formData.gender} className='block w-full px-2 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
									 focus:border-emerald-500 sm:text-sm overflow-hidden'
                                        placeholder='you@example.com' onChange={(e) => handleOnchange(e)}>
                                        <option value="" disabled>Select your gender</option>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                        <option value="other">other</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <button
                            type='submit'
                            className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-gray-600
							 hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
                                    Sign up
                                </>
                            )}
                        </button>
                    </form>

                    <p className='mt-8 text-center text-sm text-gray-400'>
                        Already have an account?{" "}
                        <Link to='/login' className='font-medium text-emerald-400 hover:text-emerald-300'>
                            Login here <ArrowRight className='inline h-4 w-4' />
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default SignupPage