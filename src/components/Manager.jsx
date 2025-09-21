import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [Form, setForm] = useState({ website: "", username: "", password: "" })
    const [passwrodArray, setpasswrodArray] = useState([])

    const getpassword = async () => {
        let req = await fetch("http://localhost:3000");
        let passwords = await req.json();
        console.log(passwords)
        setpasswrodArray(passwords)
    }


    useEffect(() => {
        getpassword()
    }, [])
    const toggle = useRef()

    const ref = useRef()
    const showPassword = () => {
        toggle.current.type = 'password'
        if (ref.current.src.includes("icons/hidden.png")) {
            ref.current.src = "icons/eye.png"
            toggle.current.type = "password"
        }
        else {
            ref.current.src = "icons/hidden.png"
            toggle.current.type = "text"
        }

    }


    const savePassword = async() => {
        if (Form.website.length > 3 && Form.username.length > 3 && Form.password.length > 3) {
             
            
            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {"content-type": "application/json" },
                body: JSON.stringify({ id: Form.id})
            });

            setpasswrodArray([...passwrodArray, { ...Form, id: uuidv4() }])
           await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {"content-type": "application/json" },
                body: JSON.stringify({ ...Form, id: uuidv4() })
            });
            // localStorage.setItem("passwords", JSON.stringify([...passwrodArray, { ...Form, id: uuidv4() }]))
            // console.log([...passwrodArray, Form])
            setForm({ website: "", username: "", password: "" })
            toast("Password Saved!")
        }
        else {
            toast("passowrd not saved!");
        }
    }
    const deletePassword = async(id) => {
        console.log("Deleting ", id)
        let c = confirm("Do you want to delete")
        if (c) {

            setpasswrodArray(passwrodArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwrodArray.filter(item => item.id !== id)))
            let req =await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: {"content-type": "application/json" },
                body: JSON.stringify({ id})
            });
            // console.log([...passwrodArray, Form])
        }
    }
    const editPassword = (id) => {
        console.log("editing ", id)
        setForm({...passwrodArray.filter(i => i.id === id)[0], id : id})
        setpasswrodArray(passwrodArray.filter(item => item.id !== id))

    }



    const handlechange = (e) => {
        setForm({ ...Form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}         // reduced time
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}      // changed to true
                rtl={false}
                pauseOnFocusLoss={false} // added false
                draggable={true}
                pauseOnHover={false}     // changed to false
                theme="dark"

            />

            <div className="absolute inset-0 -z-10 h-full w-full
             bg-green-100
              bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] 
             bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10
              m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="myContainer " style={{ minHeight: "calc(100vh - 120px)" }}>
                <h1 className='text-center'> <div className="logo font-bold text-2xl ">
                    <span className='text-green-700'>&lt; The</span>
                    Pass🗝️
                    <span className='text-green-700'>/&gt;</span>
                </div></h1>
                <p className='text-center font-bold text-green-800'>Now save your Password with ease and forget</p>
                <div className='flex flex-col text-white p-4 gap-3 items-center  ' >
                    <input onChange={handlechange} type="text" placeholder='Enter website URL' className='bg-white rounded-full
                     text-black px-4 py-1 w-full border border-green-500' name='website' id='' value={Form.website} />

                    <div className='flex flex-col md:flex-row gap-3 w-full '>
                        <input onChange={handlechange} type="text" placeholder='Enter Username' className='bg-white border
                          text-black px-4 py-1 border-green-800 outline-none rounded-full w-full' name='username' value={Form.username} />

                        <div className="relative flex item-center justify-center ">
                            <input onChange={handlechange} type="password" ref={toggle} placeholder='Enter password' className='bg-white border 
                             text-black px-4 py-1 border-green-800 outline-none rounded-full w-full' name='password' value={Form.password} />
                            <span className='absolute text-black right-1 top-1 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-[3px]' width={25} src="icons/eye.png" alt="" />
                            </span>

                        </div>

                    </div>

                    <button onClick={savePassword} className='text-black flex items-center justify-center cursor-pointer
                     bg-green-400 rounded-full w-fit px-3 py-1'><lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"  >
                        </lord-icon>add password</button>

                </div>
                <div className="pas">
                    <h2 className='font-bold text-xl py-3'>Your Passwords</h2>
                    {passwrodArray.length === 0 && <div className='text-center'>No passwords to show</div>}
                    {passwrodArray.length != 0 &&

                        <table className="table-auto w-full rounded-sm overflow-hidden ">
                            <thead className='bg-green-500 text-white '>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100 '>
                                {passwrodArray.map((data, index) => {
                                    return <tr key={index} className='border border-white'>
                                        <td className='py-1 text-center w-1/3 px-3'>
                                            <div className='flex justify-between item-center'>
                                                <span><a href={data.website} target='_blank'>{data.website}</a></span>
                                                <div className='invert cursor-pointer pl-1' onClick={() => { copyText(data.website) }}>
                                                    <animated-icons
                                                        src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                                                        trigger="hover"
                                                        // attributes='{"variationThumbColour":"#000000","variationName":"Dark","variationNumber":4,"numberOfGroups":2,"strokeWidth":1.5,"backgroundIsGroup":true,"defaultColours":{"group-1":"#E6E9EC","group-2":"#000000","background":"#000000"}}'
                                                        height="20"
                                                        width="20"
                                                    ></animated-icons></div>
                                            </div>
                                        </td>
                                        <td className='py-1 text-center w-1/3 px-7 '>
                                            <div className='flex justify-between item-center'><span>{data.username}</span>
                                                <div className='invert cursor-pointer pl-1' onClick={() => { copyText(data.username) }}>
                                                    <animated-icons
                                                        src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                                                        trigger="hover"
                                                        // attributes='{"variationThumbColour":"#000000","variationName":"Dark","variationNumber":4,"numberOfGroups":2,"strokeWidth":1.5,"backgroundIsGroup":true,"defaultColours":{"group-1":"#E6E9EC","group-2":"#000000","background":"#000000"}}'
                                                        height="20"
                                                        width="20"
                                                    ></animated-icons></div>
                                            </div></td>
                                        <td className='py-1 text-center px-5 w-1/3'>
                                            <div className='flex justify-between item-center'><span>{data.password}</span>
                                                <div className='invert cursor-pointer pl-1' onClick={() => { copyText(data.password) }}>
                                                    <animated-icons
                                                        src="https://animatedicons.co/get-icon?name=copy&style=minimalistic&token=047dcf87-b84c-41c5-b2c6-5d33d94222ee"
                                                        trigger="hover"
                                                        // attributes='{"variationThumbColour":"#000000","variationName":"Dark","variationNumber":4,"numberOfGroups":2,"strokeWidth":1.5,"backgroundIsGroup":true,"defaultColours":{"group-1":"#E6E9EC","group-2":"#000000","background":"#000000"}}'
                                                        height="20"
                                                        width="20"
                                                    ></animated-icons></div>
                                            </div>
                                        </td>
                                        <td className='py-1 text-center  '>
                                            <div className='flex gap-1'>
                                                <div className='' onClick={() => { editPassword(data.id) }}><img width={20} src="icons/pencil.gif" alt="" />
                                                </div>
                                                <div className='' onClick={() => { deletePassword(data.id) }}><lord-icon
                                                    src="https://cdn.lordicon.com/xyfswyxf.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "20px" }}>
                                                </lord-icon></div></div>
                                        </td>
                                    </tr>

                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
