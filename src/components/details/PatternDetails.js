import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const PatternDetails = () => {
    const { patternId } = useParams()
    const [pattern, setPattern] = useState({})

    
    const navigate = useNavigate()
    
    

   
// Thise useEffect fetches patterns by id and expands to show style and fabric

    useEffect(() => {
        fetch(`http://localhost:8088/patterns/${patternId}?_expand=style&_expand=fabric`)
            .then((response) => response.json())
            .then((patternData) => {
                setPattern(patternData)
            })

    }, [])

    return (
        <>
            <div className="flex justify-center flex-col text-orange-200 text-center pb-4">
                <h3 className="text-orange-300">Pattern Details for {pattern.name}</h3>

                <div className="flex justify-center">
                <img src={pattern.imageUrl} alt={pattern.name} className="pattern-img" />
                </div>

                <div className="pattern-details">Styles: {pattern.style?.type}</div>
                <div className="pattern-details">Fabric: {pattern.fabric?.type}</div>

            </div>

            <div className="flex justify-center" >
                <button
                    onClick={() => navigate(`/formEdit/${pattern.id}`)}
                    className="flex justify-center mb-8 rounded-lg border-2 border-orange-300 text-orange-200 p-2">Edit/Delete
                </button>
            </div>
        </>
    )
}