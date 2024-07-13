import { SignUp } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className="flex-center mt-10 ">
			<SignUp
				appearance={{
					elements: {
						formButtonPrimary:
							'bg-gradient-to-br from-red to-red/70 text-pure-white  border-none',
						footerActionLink: 'text-red ',
						socialButtonsBlockButton:
							'text-slate-50 bg-gray-700 hover:bg-gray-600',
					},
					variables: {
						colorPrimary: '#ff6b6b', // Red color in hex format
						colorTextOnPrimaryBackground: '#ffffff', // White color in hex format
						colorBackground: '#212529', // Dark gray color in hex format
						colorInputBackground: '#495057',
						colorText: '#f1f3f5',
						colorNeutral: '#ced4da',
						colorTextSecondary: '#e9ecef',
					},
				}}
			/>
		</div>
	);
}
