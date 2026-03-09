import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
       <div className="sticky top-0 z-[100] w-full bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="navbar bg-white">

            {/* --- LOGO SECTION --- */}
            <div className="flex-1">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-[#2563eb] rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 transition-transform group-hover:scale-110">
                    <span className="text-white font-black text-xl">S</span>
                    </div>
                    <span className="text-2xl font-black text-slate-900 tracking-tighter">
                    Study<span className="text-[#2563eb]">Flow</span>
                    </span>
                </Link>
            </div>

            {/* --- DESKTOP MENU --- */}
            <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal px-1">
                    {props.children}
                </ul>
            </div>

            {/* --- MOBILE MENU (Dropdown) --- */}
            <div className="flex-none lg:hidden">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle text-slate-900 hover:bg-slate-50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    </label>
                    {/* 5. Added a deeper shadow and smoother corners to the mobile menu */}
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-white rounded-2xl w-64 border border-slate-100 font-semibold text-slate-700">
                    {props.children}
                    </ul>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Navbar