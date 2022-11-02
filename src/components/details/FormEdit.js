import { useEffect, useState, } from "react"
import { useNavigate, navigate, useParams } from "react-router-dom"


export const FormEdit = () => {
    const [styles, setStyles] = useState([])
    const [fabrics, setFabrics] = useState([])
    const { patternId } = useParams()
    
    
const loggedInUser =JSON.parse(localStorage.getItem('pattern_user')).id

    const [userChoices, setUserChoices] = useState({
        name: "",
        imageUrl: "",
        styleId: 0,
        fabricId: 0
    })

    const navigate = useNavigate()




    

    const handlePatternDelete = (event) => {
        event.preventDefault()
// This fetch deletes a pattern entry and then navigates to home page
        return fetch(`http://localhost:8088/patterns/${patternId}`, {
            method: "DELETE",
            
            body: JSON.stringify(userChoices)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/patterns")
            })
    }

// This function handles when a user updates a pattern object

    const handleUpdateButtonClick = (event) => {
        event.preventDefault()
// This sends an http request to the api in order for the object details to be updated
        return fetch(`http://localhost:8088/patterns/${patternId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userChoices)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/patterns")
            })
    }
// This useEffect sets the users choices
    useEffect(() => {
        fetch(`http://localhost:8088/patterns/${patternId}`)
            .then(response => response.json())
            .then((data) => {
                setUserChoices(data)
                
            })

    }, [])



    useEffect(
        () => {
            fetch(`http://localhost:8088/styles`)
                .then(response => response.json())
                .then((stylesArray) => {
                    setStyles(stylesArray)
                })

            fetch(`http://localhost:8088/fabrics`)
                .then(response => response.json())
                .then((fabricArray) => {
                    setFabrics(fabricArray)
                })

            // fetch(`http://localhost:8088/patterns`)
            //     .then(response => response.json())
            //     .then((patternsArray) => {
            //         setPatterns(patternsArray)
            //     })


        }, [])


    return (
        <>
            <form className="pattern-form">
                <h2 className="pattern-form-title">Edit Your Pattern</h2>
                {/* These fieldsets creates space for the user to input information. The onChange along with useState 
         allows to set state and listen for change. The onChange allows to get an event back,
         then create a copy and set it in the set state variable. Added checked logic for radio buttons so only
         one choice could be checked at a time */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Pattern Name: </label>
                        <input
                            required
                            id="name"
                            type="text"
                            className="form-control"
                            // placeholder="Pattern Name"
                            value={userChoices.name}
                            onChange={(event) => {
                                const copy = { ...userChoices }
                                copy.name = event.target.value
                                setUserChoices(copy)
                            }}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Image URL: </label>
                        <input
                            required
                            id="imageUrl"
                            type="text"
                            className="form-control"
                            // placeholder={userChoices.imageUrl}
                            value={userChoices.imageUrl}
                            onChange={(event) => {
                                const copy = { ...userChoices }
                                copy.imageUrl = event.target.value
                                setUserChoices(copy)
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div>Style Choices: </div>
                        {styles.map((stylesObj) => {
                            return (
                                <div key={stylesObj.id} className="radio">
                                    <label>
                                        <input type="radio"
                                            value={stylesObj.id}
                                            checked={userChoices.styleId === stylesObj.id}
                                            onChange={(event) => {
                                                const copy = { ...userChoices }
                                                copy.styleId = parseInt(event.target.value)
                                                setUserChoices(copy)
                                            }} />
                                        {stylesObj.type}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div>Fabric Type: </div>
                        {fabrics.map((fabricObj) => {
                            return (
                                <div key={fabricObj.id} className="radio">
                                    <label>
                                        <input type="radio"
                                            value={fabricObj.id}
                                            checked={userChoices.fabricId === fabricObj.id}
                                            onChange={(event) => {
                                                const copy = { ...userChoices }
                                                copy.fabricId = parseInt(event.target.value)
                                                setUserChoices(copy)
                                            }} />
                                        {fabricObj.type}
                                    </label>
                                </div>

                            )
                        })}
                    </div>
                </fieldset>
                <button className="btn"
                    onClick={(event) => { handleUpdateButtonClick(event) }}>Save Your Edit</button>
                <button className="btn"
                    onClick={(event) => { handlePatternDelete(event) }}>Delete Pattern</button>    
            </form>
        </>
    )
}