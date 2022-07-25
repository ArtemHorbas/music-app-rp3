import React from 'react'

interface FileUploadProps {
	setFile: Function
	accept: string
	children: React.ReactNode
}

export const FileUpload: React.FC<FileUploadProps> = ({setFile, accept, children}) => {
	
	const ref = React.useRef<HTMLInputElement>(null)

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.files){
			setFile(event.target.files[0])
		}
	}

	return (
		<div onClick={() => ref.current?.click()}>
			<input 
				type="file" 
				accept={accept}
				className="hidden"
				ref={ref}
				onChange={onChange}
			/>
			{children}
		</div>
	)
}
