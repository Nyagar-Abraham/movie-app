const NoResult = ({ search }: { search: string }) => {
	return (
		<div className="flex-center">
			<h2 className="text-3xl mt-8 text-light100-dark0 bg-dark100-light0">
				No result found for {search}
			</h2>
		</div>
	);
};

export default NoResult;
