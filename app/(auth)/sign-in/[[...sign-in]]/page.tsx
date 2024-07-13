import { SignIn } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className="flex-center  mt-10 ">
			<SignIn
			// appearance={{
			// 	elements: {
			// 		card: 'bg-dark100-light0 text-light100-dark0 shadow-md', // Custom CSS classes for the card
			// 		headerTitle: 'text-lg font-semibold text-rose-950', // Custom CSS classes for the header title
			// 		buttonPrimary:
			// 			'bg-gradient-to-br from-rose-950 to-slate-pink-950 text-rose-100', // Custom CSS classes for the primary button
			// 	},
			// }}
			/>
		</div>
	);
}
