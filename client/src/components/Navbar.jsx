
import Login from '../pages/Login'

function Navbar(props) {
  return (
    <div>
        <div className="navbar bg-blue-600 text-white">
            <div className="flex-1 bg-blue-600">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-none ">
                <ul className="menu menu-horizontal px-1">
                
                {props.children}
                
                {/* <li>
                    <details>
                    <summary>Register</summary>
                    <ul className="bg-blue-900 rounded-t-none p-2 ">
                        <li><a>Link 1</a></li>
                        <li><a>Link 2</a></li>
                    </ul>
                    </details>
                </li> */}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar