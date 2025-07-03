export default function SideBar() {
    return (
        <div className="flex flex-col transform-3d bg-transparent h-screen w-64 text-lg text-center transition-shadow shadow-2xl">
            <aside className="sidebar w-64 p-4 hidden md:block">
                <nav className="sidebar__nav">
                    <ul>
                        <li className='border-b-2 border-green-200 py-4 pt-2 pb-4 hover:bg-green-300 hover:text-orange-400'><a href="/home">Home</a></li>
                        <li className='border-b-2 border-green-200 p-4 hover:bg-green-300 hover:text-orange-400'><a href="/account">Account</a></li>
                        <li className='border-b-2 border-green-200 p-4 hover:bg-green-300 hover:text-red-600'><a href="/logout">Logout</a></li>
                    </ul>
                </nav>
            </aside>
        </div>
    )    
}
