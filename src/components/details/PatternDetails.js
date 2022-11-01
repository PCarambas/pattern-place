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
            <div className="pattern-detail-container">
                <h3 className="pattern-detail-name">Pattern Details for {pattern.name}</h3>
                <img src={pattern.imageUrl} alt={pattern.name} className="pattern-img" />
                <div className="pattern-details">Styles: {pattern.style?.type}</div>
                <div className="pattern-details">Fabric: {pattern.fabric?.type}</div>
            </div>
            <div>
                <button
                    onClick={() => navigate(`/formEdit/${pattern.id}`)}
                    className="edit-delete-button">Edit/Delete
                </button>
            </div>
        </>
    )
}