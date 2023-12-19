/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, useEffect } from 'react';
import Organization from '../utils/Organization';
import APIService from '../utils/ApiService';

const OrganizationContext = React.createContext({
	getOrganizations: (): Organization[] => {
		return [];
	},
	updateOrganizations: () => {},
});

/**
 * A hook to get the organizations from the OrganizationProvider
 * @returns A function that returns an array of organizations
 */
export function useGetOrganizations() {
	const context = React.useContext(OrganizationContext);
	if (!context) {
		throw new Error(
			'useGetOrganizations must be used within a OrganizationProvider'
		);
	}
	return context.getOrganizations;
}

/**
 * A hook to update the organizations in the OrganizationProvider
 * @returns A function that updates the organizations in the OrganizationProvider
 */
export function useUpdateOrganizations() {
	const context = React.useContext(OrganizationContext);
	if (!context) {
		throw new Error(
			'useUpdateOrganizations must be used within a OrganizationProvider'
		);
	}
	return context.updateOrganizations;
}

interface Props {
	children: ReactNode;
}

/**
 * A provider that provides the organizations to the application
 */
export function OrganizationProvider({ children }: Props) {
	const [organizations, setOrganizations] = React.useState<Organization[]>(
		[]
	);

	useEffect(() => {
		updateOrganizations();
	}, []);

	const getOrganizations = () => {
		return organizations;
	};

	const updateOrganizations = () => {
		APIService.getOrganizationNames().then((response) => {
			if (!response) {
				setOrganizations([]);
				return;
			}
			response = response.filter((org) => org.id > 0);
			setOrganizations(response);
		});
	};

	return (
		<OrganizationContext.Provider
			value={{
				getOrganizations: getOrganizations,
				updateOrganizations: updateOrganizations,
			}}
		>
			{children}
		</OrganizationContext.Provider>
	);
}
