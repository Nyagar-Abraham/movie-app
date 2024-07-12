import { ProfileForm } from '@/components/user/Form';
import { getUserById } from '@/lib/actions/user.actions';

const page = async ({ params }: any) => {
	const user = await getUserById({ userId: params.id });

	return (
		<div className="max-w-[600px] mx-auto">
			<ProfileForm
				name={user?.name || ''}
				location={user?.location}
				username={user?.username}
				email={user?.email}
				clerkId={user?.clerkId}
			/>
		</div>
	);
};

export default page;
