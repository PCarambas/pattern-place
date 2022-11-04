import { Outlet, Link, useNavigate } from "react-router-dom"
import cushion  from "../../assets/cushion.png"


export const NavBar = () => {
    const navigate = useNavigate()
    
    return (
        <nav>
        <ul className="mx-8 py-6 justify-center border-b border-orange-300 
        text-orange-200 font-medium">
            <div className="flex justify-between">
            <li className="navbar__item active">
                <Link className="hover:text-orange-300" to="/">
                    <img className="w-14" src={cushion} alt="Picture of thread" />
                </Link>
            </li>
            
            <li className="navbar__item active">
                <Link className="hover:text-orange-300" to="/Patterns">Select A Pattern</Link>
            </li>
            <li className="navbar__item active">
                <Link className="hover:text-orange-300" to="/PatternForm">Add A Pattern</Link>
            </li>
            
            {
                localStorage.getItem("pattern_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="hover:text-orange-300" to="" onClick={() => {
                            localStorage.removeItem("pattern_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
            </div>
            {/* </div> */}
        </ul>
        </nav>
        
    )
}

