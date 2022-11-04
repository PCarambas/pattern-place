/* Upon initial render the user will see a select drop down as well as all patterns listed 
as image links. 
Here is where the user would be able to select the type of pattern and have onlu those patterns show.*/
// TODO Display all items items, filter items based on style and company name with a select 

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Patterns.css"

export const Patterns = () => {
    const [patterns, setPatterns] = useState([])
    const [styles, setStyles] = useState([])
    const [filteredPatterns, setfilteredPatterns] = useState([])
    const [selectedStyle, setSelectedStyle] = useState(0)
    
    // **STRETCH GOAL** const [companies, setCompanies] = useState([])
    // const [selectedCompany, setSelectedCompany] = useState(0)


    const navigate = useNavigate()
   
    const loggedInUserId =JSON.parse(localStorage.getItem('pattern_user')).id

// This useEffect fetches patterns, and styles from API
    useEffect(
        () => {
            fetch(`http://localhost:8088/patterns?userId=${loggedInUserId}`)
                .then(response => response.json())
                .then((patternsArray) => {
                    setPatterns(patternsArray)
                })
            fetch(`http://localhost:8088/styles`)
                .then(response => response.json())
                .then((stylesArray) => {
                    setStyles(stylesArray)
                })
            // **STRETCH GOAL** fetch(`http://localhost:8088/patternCompanies`)
            //     .then(response => response.json())
            //     .then((companiesArray) => {
            //         setCompanies(companiesArray)
            //     })
                
        },[] )

    /* This function takes a pattern id then calls the navigate function which will take 
    to / and specific pattern id*/

        const navigateToPatternDetails = (patternId) => {
            navigate(`/${patternId}`)
        }

   
// This useEffect filters through patterns based on company and sets the filtered patterns.

    // useEffect(() => {
    //     if (selectedCompany === 0) {
    //         setfilteredPatterns(patterns)
    //     } else {
    //         const companyPatterns = patterns.filter((pattern) =>
    //             pattern.patternCompanyId === selectedCompany)
    //         setfilteredPatterns(companyPatterns)
    //     }
    // }, [selectedCompany, patterns])
    
    // This useEffect filters through pattern styles and sets the filtered pattern styles


    useEffect(() => {
        if (selectedStyle === 0) {
            setfilteredPatterns(patterns)
        } else {
            const patternStyles = patterns.filter((pattern) =>
                pattern.styleId === selectedStyle)
            setfilteredPatterns(patternStyles)
        }
    }, [selectedStyle, patterns])






    return (<>

        <div className="m-8">
            <h2 className="flex justify-center pb-2
					 text-orange-300 text-3xl">Select A Pattern</h2>

            {/* <h3 className="flex justify-center px-8 pt-14 pb-2
					 text-orange-200 text-2xl">Select by Style</h3> */}

            {/* **Stretch Goal** This select filters by company when the user choses 
            a company from the select */}

            <div className="filter">
                {/* <select
                    className="filter-select"
                    id="pattern-select"
                    onChange={(company) => {
                        setSelectedCompany(parseInt(company.target.value))
                    }}

                >
                    <option key="0" value="0">All Companies</option>
                    {
                        companies.map((companies) => {
                            return (
                                <option key={companies.id} value={companies.id}>{companies.name}</option>
                            )
                        })
                    }

                </select> */}
            </div>
        

        {/* This select filters by style when user chooses a style from the drop down */}

        <div className="flex justify-center text-orange-400 pb-10">
                <select
                    className=" bg-yellow-50 rounded-lg border-2 border-orange-300 p-2"
                    id="style-select"
                    onChange={(styles) => {
                        setSelectedStyle(parseInt(styles.target.value))
                    }}

                >
                    
                    <option key="0" value="0">All Styles</option>
                    
                    {
                        styles.map((styles) => {
                            return (
                                <option key={styles.id} value={styles.id}>{styles.type}</option>
                            )
                        })
                    }

                </select>
            </div>
            </div>
        

{/* Mapping through the filtered patterns array and returning the object details */}

        <div className="flex justify-center flex-wrap text-orange-200 text-center ">
            {filteredPatterns.map((patternObj) => {
                return (
                    <div className="pattern-card" key={patternObj.id}>
                        <img
                            src={patternObj.imageUrl}
                            alt={patternObj.name}
                            className="pattern-img"
                            onClick={() => {navigateToPatternDetails(patternObj.id)}}
                        />
                        <div className="pattern-name">{patternObj.name}</div>
                    </div>
                )

            })}
        </div>
    </>
    )

}