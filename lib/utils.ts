import { type ClassValue, clsx } from 'clsx';
import queryString from 'query-string';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
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
