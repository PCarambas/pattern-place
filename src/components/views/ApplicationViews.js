import { Route, Routes, Outlet } from "react-router-dom"
import { PatternPlace } from "../PatternPlace"
import { Patterns } from "../patterns/Patterns"
import { PatternForm } from "../PatternForm"
import { PatternDetails } from "../details/PatternDetails"
import { FormEdit } from "../details/FormEdit"
import { useNavigate } from "react-router-dom"

export const ApplicationViews = () => {

	const navigate = useNavigate()

	const navigateToPatterns = () => {
		navigate('/Patterns')
	}

	const navigateToPatternForm = () => {
		navigate('/PatternForm')
	}
	return <>
		<Routes>
			<Route path="/" element={
			
				<>
					
						<h1>Pattern Place</h1>
						<h3>Keep calm and sew on</h3>
					

						<Outlet />

					<div>
						<button onClick={navigateToPatterns}>Select A Pattern</button>
					</div>

					<div>
						<button onClick={navigateToPatternForm}>Add A Pattern</button>
					</div>
				</>

			} >
				<Route path=":patternId" element={<PatternDetails />} />
				<Route index path="PatternPlace" element={<PatternPlace />} />
				<Route path="Patterns" element={<Patterns />} />
				<Route path="PatternForm" element={<PatternForm />} />
				<Route path="formEdit/:patternId" element={<FormEdit />} />
				


			</Route>
			
		</Routes>
		
	
	</>

}
