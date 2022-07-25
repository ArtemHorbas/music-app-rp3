import { Card, Step, StepLabel, Stepper } from "@mui/material";
import { FC } from "react";
import MainLayout from "./layouts/MainLayout";

interface StepWrapperProps{
	activeStep: number
	children: React.ReactNode
}

const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите сам трек']

const StepWrapper: FC<StepWrapperProps> = ({activeStep, children}) => {
	return (
		<>
				<Stepper activeStep={activeStep} className="mb-20">
					{steps.map((step, index) => 
						<Step
							key={index}
							completed={activeStep > index}
						>
							<StepLabel>{step}</StepLabel>
						</Step>
					)}
				</Stepper>
				<div className="w-[600px] mx-auto p-5 hover:shadow-2xl ease-in duration-300">
						{children}
				</div>
		</>
	);
}

export default StepWrapper;