'use client';

export default function Error({ error, reset }: any) {
	return (
		<main className="flex justify-center items-center flex-col gap-6 text-red bg-dark100-light0 h-screen">
			<h1 className="text-3xl font-semibold ">Something went wrong!</h1>
			<p className="text-lg ">{error.message} </p>

			<button
				onClick={reset}
				className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
			>
				Try again
			</button>
		</main>
	);
}
