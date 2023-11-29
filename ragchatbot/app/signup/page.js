'use client'
import Link from "next/link";
import Image from 'next/image'
import React, { useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/navigation'


const SignupPage = () => {
    const [formData, setFormData] = useState({})
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(null)

  const router = useRouter()

    const handleSignup = async (event) => {
        event.preventDefault();
        if (!formData.username || !formData.email || !formData.employee_id || !formData.department || !formData.password) {
            alert('All Fields are Required')
        }
        else {
            if (formData.password === formData.cnfPassword) {
                if(formData.password.length<8){setPasswordError('Password must be 8 Char.')}
                else{
                try {
                    const bodyData = formData
                    await axios.post('http://127.0.0.1:8000/signup/', bodyData)
                        .then(response => {
                            if (response.data.message === "User Created Successfully") {
                                alert('Your account is created successfully,Please Login to continue...')
                                router.push('/');
                            }

                        })
                        .catch(err => {
                            const errData = err.response.data
                            const dataKey= Object.keys(errData)
                            console.log(dataKey)
                            console.log()

                            if (dataKey.indexOf("email")>(-1)) {
                                setEmailError(true)
                            }
                        })
                }
                catch (err) {
                    console.log(err)
                }
            }
            }
            else {
                setPasswordError('Confirm Password & Password Must be same.')
            }
        }

    }
    return (
        <>
            <section className="flex flex-col md:flex-row h-screen items-center p-4">
                <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden w-4/5 m-auto" >
                    <div className="md:flex w-full">
                        <div className="hidden md:block w-1/2 py-10 px-10 w-full md:w-1/3 xl:w-3/5 relative">
                            <Image src="/logo2_prev_ui.png" alt="img" width={180} height={100} className='absolute top-3.5 left-3.5' />
                            <Image src="/chat.svg" alt="img" width={520} height={480} className='absolute bottom-0 left-0' />
                        </div>
                        <div className="w-full md:w-1/2 py-5 px-5 md:px-10 border-l-3 bg-white">
                            <div className="text-center mb-6">
                                <h1 className="font-bold text-2xl text-gray-900">Create an account</h1>
                                <p>Enter your information to register</p>
                            </div>
                            <div>
                                <div className="flex -mx-3">
                                    <div className="w-1/2 px-3 mb-3">
                                        <label htmlFor className="text-xs font-semibold px-1">User name</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
                                            <input type="text" className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg outline-none border bg-gray-200 focus:bg-white focus:border-sky-500"
                                                placeholder="John" onChange={(e) => { setFormData({ ...formData, username: e.target.value }) }} />
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-3 mb-3">
                                        <label htmlFor className="text-xs font-semibold px-1">Email</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                                            <input type="email" className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg outline-none border bg-gray-200 focus:bg-white focus:border-sky-500" placeholder="johnsmith@example.com"
                                                onChange={(e) => { setFormData({ ...formData, email: e.target.value });setEmailError(false) }} />
                                        </div>
                                        {
                                            emailError &&
                                            <small className="text-red-400">Email is not valid </small>
                                        }
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-1/2 px-3 mb-3">
                                        <label htmlFor className="text-xs font-semibold px-1">Employee Id</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
                                            <input type="text" className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg outline-none border bg-gray-200 focus:bg-white focus:border-sky-500" placeholder="XYZ"
                                                onChange={(e) => { setFormData({ ...formData, employee_id: e.target.value }) }} />
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-3 mb-3">
                                        <label htmlFor className="text-xs font-semibold px-1">Department Name</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                                            <input type="text" className="w-full -ml-10 pl-3 pr-3 py-2 rounded-lg outline-none border bg-gray-200 focus:bg-white focus:border-sky-500" placeholder="ABC"
                                                onChange={(e) => { setFormData({ ...formData, department: e.target.value }) }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-2">
                                        <label htmlFor className="text-xs font-semibold px-1">Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg" /></div>
                                            <input type="password" className="w-full -ml-10 pl-5 pr-3 py-2 rounded-lg outline-none border bg-gray-200 focus:bg-white focus:border-sky-500" placeholder="************"
                                                onChange={(e) => { setFormData({ ...formData, password: e.target.value });setPasswordError(null) }} />
                                        </div>
                                    <small className="text-red-400" >Password must be 8 Character</small>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-3">
                                        <label htmlFor className="text-xs font-semibold px-1"> Confirm Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg" /></div>
                                            <input type="password" className="w-full -ml-10 pl-5 pr-3 py-2 rounded-lg outline-none border bg-gray-200 focus:bg-white focus:border-sky-500" placeholder="************"
                                                onChange={(e) => { setFormData({ ...formData, cnfPassword: e.target.value });setPasswordError(null)  }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right mb-5">
                                    <p>Already have an account?  <Link href="/" className="text-blue-500 hover:text-blue-700 font-semibold underline">Sign In</Link></p>
                                </div>
                                {
                                    passwordError &&
                                    <small className="text-red-400">{passwordError}</small>
                                }
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-2">
                                        <button className="block w-full max-w-xs mx-auto bg-sky-500 hover:bg-sky-600 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                                            onClick={handleSignup}>REGISTER NOW</button>
                                    </div>
                                </div>
                               

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignupPage;