import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
// import "./Login.css"

export const Login = () => {
    const [email, set] = useState("PCarambas@gmail.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("pattern_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="flex justify-center px-8 pt-8 pb-2
					 text-orange-200 text-8xl">Pattern Place</h1>

                    <h2 className="flex justify-center text-orange-200/100 text-4xl 
					font-thin italic pb-10">Sew little time, sew much fabric!</h2>

                    <div className="flex justify-center text-orange-300 mb-4">
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    </div>
                    <fieldset>
                        <div className="flex justify-center text-orange-200">
                        <button className="mt-4 rounded-lg border-2 border-orange-300 text-orange-200 p-2 mb-4"  type="submit">
                            Sign in
                        </button>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section className="flex justify-center text-orange-200 ">
                <div className="mt-4 rounded-lg border-2 border-orange-300 text-orange-200 p-2">
                <Link to="/register">Not a member yet?</Link>
                </div>
            </section>
        </main>
    )
}

