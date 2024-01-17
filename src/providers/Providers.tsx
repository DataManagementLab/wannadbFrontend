import { ReactNode } from 'react';
import { NotificationProvider } from './NotificationProvider';
import { OrganizationProvider } from './OrganizationProvider';
import { StorageProvider } from './StorageProvider';
import { ThemeProvider } from './ThemeProvider';
import { UserProvider } from './UserProvider';
import { LoadingScreenProvider } from './LoadingScreenProvider';
import { DocBaseTaskProvider } from './DocBaseTaskProvider';

interface Props {
	children: ReactNode;
}

/**
 * Here we wrap all of our providers into one component so that we can
 * easily import them into our App.tsx file.
 */
export function Providers({ children }: Props) {
	return (
		<NotificationProvider>
			<LoadingScreenProvider>
				<StorageProvider>
					<ThemeProvider>
						<OrganizationProvider>
							<DocBaseTaskProvider>
								<UserProvider>{children}</UserProvider>
							</DocBaseTaskProvider>
						</OrganizationProvider>
					</ThemeProvider>
				</StorageProvider>
			</LoadingScreenProvider>
		</NotificationProvider>
	);
}
