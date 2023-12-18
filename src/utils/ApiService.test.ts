import APIService from './ApiService.ts';
import {
	expect,
	test,
	describe,
	beforeAll,
	afterAll,
	expectTypeOf,
} from 'vitest';
import 'src/utils/sessionStoragePolifill.js';

/**
 * Upload files to the server.
 * @returns A string with the status of the upload
 * @param length for adjusting the length of the random string
 */
function generateRandomString(length: number): string {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}

	return result;
}

describe('APIService', () => {
	const salt = generateRandomString(10);
	const alternative = generateRandomString(10);

	beforeAll(async () => {
		await APIService.register(salt, salt);
		await APIService.createOrganization(salt);
	});

	afterAll(async () => {
		try {
			await APIService.deleteUser(salt, salt);
		} catch (err) {
			throw new Error(
				`sessionSchema not generated because of error ${err as string}`
			);
		}
	});

	test('should log in successfully and set the user token', async () => {
		const result = await APIService.login(salt, salt);
		expect(result).toBe(true);
		const token = APIService.getUserToken();
		expect(typeof token).toBe('string');
	});
	test('registers a user successfully and sets the user token', async () => {
		const result = await APIService.register(alternative, alternative);
		expect(result).toBe(true);
		const token = APIService.getUserToken();
		expect(typeof token).toBe('string');
		await APIService.deleteUser(alternative, alternative);
	});
	test('should delete a user successfully and clear the user token', async () => {
		await APIService.register(alternative, alternative);
		const token1 = APIService.getUserToken();
		expect(typeof token1).toBe('string');
		const result = await APIService.deleteUser(alternative, alternative);
		expect(result).toBe(true);
		let token: string | null = null;
		expect(() => (token = APIService.getUserToken())).toThrowError(
			'User not logged in'
		);

		expect(token).toBe(null);
	});
	test('should get organization successfully', async () => {
		await APIService.login(salt, salt);
		const organizationId = await APIService.getOrganizations();
		expectTypeOf(organizationId).not.toBeBoolean();
		expect(organizationId).toBeDefined();
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(typeof organizationId[0]).toBe('number');
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(organizationId[0]).toBeGreaterThan(10);
	});
	test('should create organization successfully', async () => {
		await APIService.login(salt, salt);
		const organizationId = await APIService.createOrganization(alternative);
		expect(typeof organizationId).toBe('number');
		expect(organizationId).toBeGreaterThan(0);
	});
	test('should upload files successfully', async () => {
		const data = [new Blob(['file content'], { type: 'text/plain' })];
		await APIService.login(salt, salt);
		const organisationId = await APIService.getOrganizations();
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		const result = await APIService.upload(data, organisationId[0]);
		expect(result).toBe('File uploaded successfully');
	});

	test('should get file names successfully', async () => {
		const fileNames = await APIService.getFileNames(salt);
		expect(fileNames).toBeDefined();
	});
	test('should get file content successfully', async () => {
		const fileNames = await APIService.getFileNames(salt);
		if (fileNames.length > 0) {
			const fileContent = await APIService.getFileContent(
				salt,
				fileNames[0]
			);
			expect(fileContent).not.toBe('Error getting file content!');
		}
	});
});
