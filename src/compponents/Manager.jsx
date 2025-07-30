import { useEffect, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [showPassword, changeEye] = useState(false);
    const handleShowPassowrd = () => {

        changeEye(!showPassword);
    }


    const [form, setform] = useState({ site: "", username: "", password: "" });
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] });
    }

    const [passwordArray, setPasswordArray] = useState([]);
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])

    const savePassword = () => {
        setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
        console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" });
    }

    const deletePassword = (id) =>{
        console.log("deleting the password with id: ", id);
        setPasswordArray(passwordArray.filter(item=>item.id!==id));
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }

    const editPassword = (id) =>{
        console.log("Editing the password with id: ", id);
        setform(passwordArray.filter(i=>i.id===id)[0]);
        setPasswordArray(passwordArray.filter(item=>item.id!==id));
    }
    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
            </div>

            <div className="mycontainer h-162">
                <div className="flex flex-col p-4">
                    <div className="logo text-2xl font-bold text-center">
                        <span className="text-purple-400">&lt;</span>
                        PASS-
                        <span className="text-purple-400">Mng/&gt;</span>
                    </div>
                    <p className="text-purple-400 text-center">Your own password manager</p>

                    <div className="flex flex-col items-center p-4 gap-8">
                        <input value={form.site} onChange={handleChange} className="rounded-full border-2 border-purple-800 bg-white text-slate-600  w-full px-4 py-1" type="text" placeholder="Enter website URL" name="site" />
                        <div className="flex w-full justify-between gap-2">
                            <div className="w-full">
                                <input value={form.username} onChange={handleChange} placeholder="Enter Username" className="rounded-full border-2 border-purple-800 bg-white text-slate-600  w-full px-4 py-1" type="text" name="username" />
                            </div>
                            <div className="relative">
                                <input value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full border-2 border-purple-800 bg-white text-slate-600  w-full px-4 py-1" type={showPassword ? "text" : "password"} name="password" />
                                <button className="absolute right-2 top-1 text-2xl">
                                    {showPassword
                                        ? <VscEye onClick={handleShowPassowrd} />
                                        : <VscEyeClosed onClick={handleShowPassowrd} />}
                                </button>
                            </div>
                        </div>
                        <button onClick={savePassword} className="flex justify-center items-center rounded-full max-w-60 gap-2 bg-purple-500 hover:bg-purple-400 py-1 px-3 border-2 border-purple-800">
                            <lord-icon
                                src="https://cdn.lordicon.com/efxgwrkc.json"
                                trigger="hover"
                                style={{ "width": "25px", "height": "25px" }}>
                            </lord-icon>
                            Save
                        </button>
                    </div>


                    <h1 className="text-center font-extrabold text-2xl">YOUR PASSWORDS</h1>
                    <div className="passwords border-2 rounded-2xl overflow-hidden">
                        {passwordArray.length === 0 && <div className="text-center"> No Passwords</div>}
                        {passwordArray.length != 0 && <table className="w-full">
                            <thead className="bg-purple-200 rounded-2xl">
                                <tr>
                                    <th className=" py-2">Site</th>
                                    <th className=" py-2">Username</th>
                                    <th className=" py-2">password</th>
                                    <th className=" py-2">Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody className="bg-transparent">
                                {passwordArray.map((item) => {
                                    return <tr>
                                        <td className="text-center w-18 py-2"><a href={item.site} target="_blank">{item.site}</a></td>
                                        <td className="text-center w-18 py-2">{item.username}</td>
                                        <td className="text-center w-18 py-2">{item.password}</td>
                                        <td className="text-center w-18 py-2">
                                            <span onClick={()=>{editPassword(item.id)}} className="mx-2">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    state="hover-line"
                                                    colors="primary:#121331,secondary:#000000"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span onClick={()=>{deletePassword(item.id)}} className="mx-2">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xyfswyxf.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Manager;