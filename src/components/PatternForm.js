// TODO create pattern form so user can add new pattern to database
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const PatternForm = () => {
    const [styles, setStyles] = useState([])
    const [fabrics, setFabrics] = useState([])
    const [patterns, setPatterns] = useState([])
    // **Stretch Goal** const [patternsCompanies, setPatternCompanies] = useState([])
    const [userChoices, setUserChoices] = useState({
        name: '',
        imageUrl: '',
        styleId: 0,
        fabricId: 0
    })

    const navigate = useNavigate()

    /* This function is for the onClick button to add the new pattern object to the database
    preventDefault() keeps the page from refreshing since a button inside of the form 
    tab creates its own fetch call. The associated fetch will POST the results to the API*/

    const handleSavePattern = (event) => {
        event.preventDefault()

        if (userChoices.name &&
            userChoices.imageUrl &&
            userChoices.styleId &&
            userChoices.fabricId
        ) {
            fetch('http://localhost:8088/patterns', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userChoices),

                // This re fetches patterns in order for the newly added pattern to render on the page
            }).then(() => {
                navigate('/Patterns')


                fetch('http://localhost:8088/patterns')
                    .then((response) => response.json())
                    .then((patternsArray) => {
                        setPatterns(patternsArray)

                        // This sets the state back to an empty array, clearing out the form input fields
                        setUserChoices({
                            name: '',
                            imageUrl: '',
                            styleId: 0,
                            fabricId: 0
                        })
                    })
            })

        } else {
            alert('Please complete the form.')
        }
    }




    /* This useEffect fetches styles and fabrics in order to be used as a select drop down
     and radio buttons in order for the user to be able to add the required details to 
     their new pattern object*/

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

            fetch(`http://localhost:8088/patterns`)
                .then(response => response.json())
                .then((patternsArray) => {
                    setPatterns(patternsArray)
                })

                //Stretch Goal fetch(`http://localhost:8088/patternCompanies`)
                // .then(response => response.json())
                // .then((patternCompaniesArray) => {
                //     setPatterns(patternCompaniesArray)
                // })
        },
        []
    )




    return (
        <form className="pattern-form">
            <h2 className="pattern-form-title">Add A Pattern</h2>
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
                        placeholder="Pattern Name"
                        value={userChoices.name}
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.name = event.target.value
                            setUserChoices(copy)
                        }}
                    />
                </div>
            </fieldset>
            {/* STRETCH GOAL */}
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Pattern Company: </label>
                    <input
                        required
                        id="patternCompany"
                        type="text"
                        className="form-control"
                        placeholder="Company Name"
                        value={userChoices.patternCompanyId}
                        onChange={(event) => {
                            const copy = { ...userChoices }
                            copy.patternCompanyId = event.target.value
                            setUserChoices(copy)
                        }}
                    />
                </div>
            </fieldset> */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Image URL: </label>
                    <input
                        required
                        id="imageUrl"
                        type="text"
                        className="form-control"
                        placeholder="example.com"
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
                onClick={(event) => { handleSavePattern(event) }}>Add New Pattern</button>
        </form>
    )
}








