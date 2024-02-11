import APIService from './ApiService.ts';
import {
	expect,
	test,
	describe,
	beforeAll,
	afterAll,
	expectTypeOf,
	assert,
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
	let saltOrganisationID: number | undefined = undefined;
	const blobs: Blob[] = [];
	const users = [
		'123test',
		'12test',
		'1test',
		'123test2',
		'asada',
		'12test2',
	];
	/**
	 * Deletes all documents that are currently associated with the salt organisation
	 * only used for Test purposes
	 */
	async function cleanseSaltDocs() {
		const delDocs = await APIService.getDocumentForOrganization(
			saltOrganisationID as number
		);
		for (let i = 0; i < delDocs.length; i++) {
			await APIService.deleteDocument(delDocs[i].id);
		}
	}

	beforeAll(async () => {
		await APIService.register(salt, salt, false);
		saltOrganisationID = await APIService.createOrganization(salt);
		for (let i = 0; i < 10; i++) {
			blobs.push(
				new Blob([generateRandomString(10)], { type: 'text/plain' })
			);
		}
		users.forEach(async (user) => {
			await APIService.register(user, user, false);
		});
	});

	afterAll(async () => {
		try {
			users.forEach(async (user) => {
				await APIService.deleteUser(user, user);
			});
			cleanseSaltDocs();
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

	test('login attempt for false user data fails', async () => {
		const result = await APIService.login(salt, '');
		expect(result).toBe(false);
		let token: string | null = null;
		expect(() => (token = APIService.getUserToken())).toThrowError(
			'User not logged in'
		);
		expect(token).toBe(null);
	});

	test('registers a user successfully and sets the user token', async () => {
		const result = await APIService.register(
			alternative,
			alternative,
			false
		);
		expect(result).toBe(true);
		const token = APIService.getUserToken();
		expect(typeof token).toBe('string');
		await APIService.deleteUser(alternative, alternative);
	});
	test('register attempt with already excisting credentails fails, no token is set', async () => {
		const result = await APIService.register(salt, salt, false);
		expect(result).toBe(undefined);
		let token: string | null = null;
		expect(() => (token = APIService.getUserToken())).toThrowError(
			'User not logged in'
		);
		expect(token).toBe(null);
	});
	test('should delete a user successfully and clear the user token', async () => {
		await APIService.register(alternative, alternative, false);
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
	test('shouldnt not be able to delete user that is not registered', async () => {
		expect(await APIService.deleteUser('not a user', 'not')).toBe(false);
	});
	test('should get organizations successfully', async () => {
		await APIService.login(salt, salt);
		const organizationId = await APIService.getOrganizations();
		expectTypeOf(organizationId).not.toBeBoolean();
		expect(organizationId).toBeDefined();
		if (!organizationId || organizationId.length === 0) {
			assert(false);
		}
		expect(typeof organizationId[0]).toBe('number');
		expect(organizationId[0]).toBeGreaterThan(0);
	});
	test('should get organizations successfully', async () => {
		await APIService.login(salt, salt);
		const organizations = await APIService.getOrganizationNames();
		assert(organizations);
		assert(typeof organizations != 'boolean');
		expect(organizations[0].id > 0).true;
		expect(typeof organizations[0].name).toBe('string');
		expect(organizations[0].id).toBe(saltOrganisationID);
	});
	test('should get organization successfully', async () => {
		await APIService.login(salt, salt);
		assert(saltOrganisationID);
		const organizationName =
			await APIService.getNameForOrganization(saltOrganisationID);
		expectTypeOf(organizationName).not.toBeBoolean();
		expect(organizationName).toBeDefined();
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(typeof organizationName[0]).toBe('string');
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(organizationName[0].length).toBeGreaterThan(0);
	});
	test('should create organization successfully', async () => {
		await APIService.login(salt, salt);
		const organizationId = await APIService.createOrganization(alternative);
		expect(typeof organizationId).toBe('number');
		expect(organizationId).toBeGreaterThan(0);
	});
	test('creating organization with already existing name fails', async () => {
		await APIService.login(salt, salt);
		expect(await APIService.createOrganization(salt)).toBeUndefined();
	});
	test('should leave organisation successfully', async () => {
		await APIService.login(salt, salt);
		let orgaID: number | undefined = undefined;
		orgaID = await APIService.createOrganization('deatheaters');
		await APIService.leaveOrganization(orgaID as number);
		const orgaList = await APIService.getOrganizations();
		assert(orgaList);
		let b = true;
		for (let i = 0; i < orgaList.length; i++) {
			if (orgaList[i] === orgaID) {
				b = false;
				break;
			}
		}
		expect(b).toBe(true);
	});

	test('should get members of organisation correctly', async () => {
		await APIService.login(salt, salt);
		const memberList = await APIService.getMembersForOrganization(
			saltOrganisationID as number
		);
		expect(memberList).toBeDefined();
		expect(memberList).toStrictEqual([salt]);
	});
	// missing negative test for getMembersForOrganization

	test('should not be able ot leave organisation if not a member', async () => {
		await APIService.login(salt, salt);
		const eaterID = await APIService.createOrganization('deatheaters');
		await APIService.login(alternative, alternative);
		expect(await APIService.leaveOrganization(eaterID as number)).toBe(
			false
		);
		//TODO does this make sense?
		//expect(await APIService.getOrganizationNames()).toStrictEqual([]);
		expect(await APIService.getOrganizationNames()).toBeUndefined();
		await APIService.login(salt, salt);
	});

	test('should add member to orga successsfully', async () => {
		await APIService.register('testuser', 'test');
		await APIService.login(salt, salt);
		assert(saltOrganisationID);
		await APIService.addMemberToOrganization(
			saltOrganisationID,
			'testuser'
		);
		const memberList = await APIService.getMembersForOrganization(
			saltOrganisationID as number
		)!;
		expectTypeOf(memberList).toBeArray;
		let b = false;
		assert(memberList);
		memberList.forEach((member) => {
			if (member === 'testuser') {
				b = true;
			}
		});
		expect(b).toBe(true);
		await APIService.deleteUser('testuser', 'test');
	});

	test('should upload files successfully', async () => {
		const data = [new Blob(['file content'], { type: 'text/plain' })];
		await APIService.login(salt, salt);
		const result = await APIService.upload(
			data,
			saltOrganisationID as number
		);
		expect(result).toBe('File uploaded successfully');
	});

	test('should delete file successfully', async () => {
		await APIService.login(salt, salt);

		// use file that got uploaded in the 'should upload file successfully' test for now
		const documents = await APIService.getDocumentForOrganization(
			saltOrganisationID as number
		);
		expect(documents!.length).toBeGreaterThan(0);
		const delRes = await APIService.deleteDocument(documents[0].id);
		expect(delRes).toBe(true);
		expect(documents.length).toBeGreaterThan(
			(
				await APIService.getDocumentForOrganization(
					saltOrganisationID as number
				)
			).length
		);
	});
	// test dokumentBase

	// test getTaskStatus

	test('should get user name suggestions successfully', async () => {
		await APIService.login(salt, salt);
		const sug123 = await APIService.getUserNameSuggestion('123');
		expect(sug123.length).toBe(2);
		expect(sug123.sort()).toEqual(['123test', '123test2'].sort());

		const sug12 = await APIService.getUserNameSuggestion('12');
		expect(sug12.length).toBe(4);
		expect(sug12.sort()).toEqual(
			['12test', '12test2', '123test', '123test2'].sort()
		);

		const sug1 = await APIService.getUserNameSuggestion('1');
		expect(sug1.length).toBe(5);
		expect(sug1.sort()).toEqual(
			['1test', '12test', '12test2', '123test', '123test2'].sort()
		);
		expect(
			(await APIService.getUserNameSuggestion('001122233')).length
		).toBe(0);
	});

	test('should get documents for organisation successfully', async () => {
		await APIService.login(salt, salt);
		// cleanse salt organisation documents
		await cleanseSaltDocs();
		const resp = await APIService.upload(
			blobs,
			saltOrganisationID as number
		);
		expect(resp).toBe('File uploaded successfully');
		const documents = await APIService.getDocumentForOrganization(
			saltOrganisationID as number
		);
		expect(documents).toBeDefined();
		for (let i = 0; i < documents.length; i++) {
			const buffer = Buffer.from(await blobs[i].arrayBuffer());
			expect(documents[i].content).toBe(buffer.toString());
		}
	});
	test('should update file successfully', async () => {
		await APIService.login(salt, salt);
		// org with only one file
		await cleanseSaltDocs();
		const res = await APIService.upload(
			[new Blob(['test file content'], { type: 'text/plain' })],
			saltOrganisationID as number
		);
		expect(res).toBe('File uploaded successfully');
		const documents = await APIService.getDocumentForOrganization(
			saltOrganisationID as number
		);
		expect(documents.length).toBe(1);
		await APIService.updateDocumentContent(
			documents[0].id,
			'updated test file'
		);
		const oneFile = await APIService.getDocumentForOrganization(
			saltOrganisationID as number
		);
		expect(oneFile.length).toBe(1);
		expect(oneFile[0].content).toBe('updated test file');
		// org with multiple files
		await APIService.deleteDocument(documents[0].id);
		await APIService.upload(blobs, saltOrganisationID as number);
		const mulDoc1 = await APIService.getDocumentForOrganization(
			saltOrganisationID as number
		);
		const changedID = mulDoc1[4].id;
		await APIService.updateDocumentContent(changedID, 'updated test file');
		const mulDoc2 = await APIService.getDocumentForOrganization(
			saltOrganisationID as number
		);
		// test changed filed
		expect(mulDoc2.filter((doc) => doc.id === changedID)![0].content).toBe(
			'updated test file'
		);
		// test unchanged files
		const unchanged = mulDoc2.filter((doc) => doc.id !== changedID);
		unchanged.forEach((doc) => {
			expect(
				mulDoc2.filter((doc2) => doc2.id === doc.id)[0].content
			).toBe(doc.content);
		});
	});
});
