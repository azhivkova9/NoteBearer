import Header from "../../Header/Header";

export default function SideBar() {
    return (
        <div className="flex flex-col transform-3d bg-gradient-to-b from-green-200 to-slate-50 rounded-r-lg h-screen w-80 shadow-lg p-4 text-lg text-center">
            <Header />
            <aside className="sidebar">
                <nav className="sidebar__nav mt-4">
                    <ul>
                        <li className='p-2 hover:bg-green-200 hover:text-green-600'><a href="/home">Home</a></li>
                        <li className='p-2 hover:bg-green-200 hover:text-green-600'><a href="/account">Account</a></li>
                        <li className='p-2 hover:bg-green-200 hover:text-red-600'><a href="/logout">Logout</a></li>
                    </ul>
                </nav>
            </aside>
        </div>
    )    
}