import { Route, Routes, Outlet } from "react-router-dom"
import { PatternPlace } from "../PatternPlace"
import { Patterns } from "../patterns/Patterns"
import { PatternForm } from "../PatternForm"
import { PatternDetails } from "../details/PatternDetails"
import { FormEdit } from "../details/FormEdit"
import { useNavigate } from "react-router-dom"
import machine  from "../../assets/machine.png"

export const ApplicationViews = () => {

	const navigate = useNavigate()

	const navigateToPatterns = () => {
		navigate('/Patterns')
	}

	const navigateToPatternForm = () => {
		navigate('/PatternForm')
	}

	return (
		
		<Routes>
			<Route path="/" element={

				<>
				<div>
					<h1 className="flex justify-center px-8 pt-8 pb-2
					 text-orange-200 text-8xl">Pattern Place</h1>
				</div>
				<div>
					<h3 className="flex justify-center text-orange-200/100 text-4xl 
					font-thin italic pb-10">Keep calm and sew on!</h3>
				</div>

					<Outlet />
				</>

			}
			>
				<Route path="/" element={
					<>

					<div className="flex justify-center space-y-8">
						<div><button className="rounded-lg border-4 border-orange-300 text-2xl text-orange-200 p-4" 
						onClick={navigateToPatterns}>Select A Pattern</button></div>

					<div className="justify-center w-72">
						<img className="" src={machine} alt="Picture of Sewing Machine" />
					</div>


						<div><button className="rounded-lg border-4 border-orange-300 text-2xl text-orange-200 p-4"
						onClick={navigateToPatternForm}>Add A Pattern</button></div>

						
					</div>
					</>
				} />

				<Route path=":patternId" element={<PatternDetails />} />
				<Route index path="PatternPlace" element={<PatternPlace />} />
				<Route path="Patterns" element={<Patterns />} />
				<Route path="PatternForm" element={<PatternForm />} />
				<Route path="formEdit/:patternId" element={<FormEdit />} />
			</Route>
		</Routes>
		
	)

}













