'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

import { usePathname } from 'next/navigation';
import { updateUser } from '@/lib/actions/user.actions';

const formSchema = z.object({
	name: z.string().min(4).max(40),
	username: z.string().min(4).max(40),
	location: z.string().min(4).max(60),
	email: z.string().min(6).max(45).email(),
});

interface Props {
	name: string;
	username: string;
	email: string;
	location: string;
	clerkId: string;
}

export function ProfileForm({
	name,
	username,
	email,
	location,
	clerkId,
}: Props) {
	const [isSubmitting, setSubmitting] = useState(false);
	const pathname = usePathname();
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: name || '',
			username: username || '',
			email: email || '',
			location: location || '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setSubmitting(true);

		try {
			await updateUser({
				clerkId,
				updateData: {
					name: values.name,
					username: values.username,
					email: values.email,
					location: values.location,
				},
				path: pathname,
			});
			//TODO
			console.log(445);
		} catch (error) {
			console.log(error);
			throw error;
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 mt-10 "
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="space-y-0">
							<FormLabel className="text-sm font-semibold ">Name:</FormLabel>
							<FormControl className="">
								<Input
									placeholder="Your name..."
									className="no-focus  bg-dark90-light10 dark:hover:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-100 h-[40px] max-sm:h-[32px]"
									type="text"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="space-y-0">
							<FormLabel className="text-sm font-semibold ">
								Username:
							</FormLabel>
							<FormControl className="">
								<Input
									placeholder="Your username..."
									className="no-focus bg-dark90-light10 dark:hover:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-100 h-[40px] max-sm:h-[32px]"
									type="text"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="space-y-0">
							<FormLabel className="text-sm font-semibold ">E-mail:</FormLabel>
							<FormControl className="">
								<Input
									placeholder="Your email..."
									className="no-focus bg-dark90-light10 dark:hover:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-100 h-[40px] max-sm:h-[32px]"
									type="text"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem className="space-y-0">
							<FormLabel className="text-sm font-semibold  ">
								Location:
							</FormLabel>
							<FormControl className="">
								<Input
									placeholder="Your Location..."
									className="no-focus bg-dark90-light10 dark:hover:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-100 h-[40px] max-sm:h-[32px] "
									type="text"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex mt-7 justify-end">
					<Button
						disabled={isSubmitting}
						className={`  bg-gradient-to-tr py-1 from-rose-700 to-rose-800 text-rose-100 font-semibold   ${isSubmitting && 'cursor-not-allowed'}`}
						type="submit"
					>
						{isSubmitting ? 'updating...' : 'update'}
					</Button>
				</div>
			</form>
		</Form>
	);
}
