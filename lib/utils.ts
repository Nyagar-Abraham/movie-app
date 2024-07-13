import { type ClassValue, clsx } from 'clsx';
import queryString from 'query-string';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
	const day = date.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
}

interface UrlQueryParams {
	params: string;
	key: string;
	value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
	const currentUrl = queryString.parse(params);

	currentUrl[key] = value;

	return queryString.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
};

interface RemoveUrlQueryParams {
	params: string;
	keysToRemove: string[];
}
export const removeUrlQuery = ({
	params,
	keysToRemove,
}: RemoveUrlQueryParams) => {
	const currentUrl = queryString.parse(params);

	keysToRemove.forEach((key: string) => {
		delete currentUrl[key];
	});

	return queryString.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
};


export function getRandomPastDate(): Date {
	const currentDate = new Date();
	const past25YearsInMilliseconds = 25 * 365 * 24 * 60 * 60 * 1000; // 25 years in milliseconds
	const randomMillisecondsInPast = Math.floor(Math.random() * past25YearsInMilliseconds);
	const randomPastDate = new Date(currentDate.getTime() - randomMillisecondsInPast);
	return randomPastDate;
}


export function timeAgo(date: Date): string {
	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	let interval = Math.floor(seconds / 31536000);
	if (interval > 1) {
			return `${interval} years ago`;
	}
	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
			return `${interval} months ago`;
	}
	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
			return `${interval} days ago`;
	}
	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
			return `${interval} hours ago`;
	}
	interval = Math.floor(seconds / 60);
	if (interval > 1) {
			return `${interval} minutes ago`;
	}
	return `just now`;
}