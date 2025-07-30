const Navbar = () => {
    return (
        <>
            <nav className="bg-slate-800">
                <div className="mycontainer flex justify-between items-center h-12 px-4 py-5 text-white">
                    <div className="logo text-2xl font-bold">
                        <span className="text-purple-400">&lt;</span>
                        PASS-
                        <span className="text-purple-400">Mng/&gt;</span>
                    </div>
                    <ul>
                        <li className="flex gap-4">
                            <a href="/">Home</a>
                            <a href="/">About us</a>
                            <a href="/">Contact us</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;