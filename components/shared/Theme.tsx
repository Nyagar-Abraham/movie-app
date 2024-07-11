'use client';

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { themes } from '@/constants';
import { useTheme } from '@/context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaComputer } from 'react-icons/fa6';
const Theme = () => {
	const { mode, setMode } = useTheme();

	return (
		<Menubar className="relative border-none bg-transparent  shadow-none">
			<MenubarMenu>
				<MenubarTrigger
					className={`bg-dark90-light10 text-light90-dark10 data-[state=open]:bg-dark90-light10 data-[state=open]:text-light90-dark10 border-none ring-0 focus:bg-dark90-light-10 focus:text-light90-dark10 w-10 `}
				>
					<FaMoon className="h-18 w-16" />
				</MenubarTrigger>
				<MenubarContent className="bg-dark90-light10 text-light90-dark10 border-none min-w-[70px]  shadow-md absolute top-full mt-3 md:flex md:gap-2 md:items-center md:-mt-8 md:left-full md:flex-col md:ml-11 -left-10 md:min-w-[15px]">
					{themes.map((theme) => (
						<MenubarItem
							key={theme}
							onClick={() => {
								setMode(theme);

								if (theme !== 'system') {
									localStorage.theme = theme;
								} else {
									localStorage.removeItem('theme');
								}
							}}
							className={`flex gap-2 capitalize ${theme === mode && 'text-red'}`}
						>
							{theme === 'dark' && <FaMoon />}
							{theme === 'light' && <FaSun />}
							{theme === 'system' && <FaComputer />}
							<p className="md:hidden">{theme}</p>
						</MenubarItem>
					))}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};

export default Theme;
