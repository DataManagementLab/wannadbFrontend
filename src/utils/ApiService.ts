import axios from 'axios';

/**
 * This class is used to make requests to the backend API.
 */
class APIService {
	static host = import.meta.env.VITE_API_URL;

	/**
	 * Check if the user can login with the given credentials.
	 * @param username The username to login
	 * @param password The password to login
	 * @returns A promise that resolves to true if the login was successful, false otherwise.
	 */
	static async login(username: string, password: string): Promise<boolean> {
		try {
			const url = `${this.host}/login`;
			const resp = await axios.post(url, {
				username: username,
				password: password,
			});
			//TODO save token
			if (resp.data.status) {
				const token = resp.data.token;
				console.log(token);
			}

			return resp.data.status;
		} catch (err) {
			return false;
		}
	}

	/**
	 * Check if the user can register with the given credentials.
	 * @param username The username to register
	 * @param password The password to register
	 * @returns A promise that resolves to true if the registration was successful, false otherwise.
	 */
	static async register(
		username: string,
		password: string
	): Promise<boolean> {
		try {
			const url = `${this.host}/register`;
			const resp = await axios.post(url, {
				username: username,
				password: password,
			});
			return resp.data.status;
		} catch (err) {
			return false;
		}
	}

	// TODO
	static async getOrganization(username: string): Promise<string> {
		try {
			const url = `${this.host}/get/organization/${username}`;
			const resp = await axios.get(url);
			return resp.data.organization;
		} catch (err) {
			return '';
		}
	}

	// TODO
	static async createOrg(
		username: string,
		orgName: string
	): Promise<boolean> {
		try {
			const url = `${this.host}/create/organization`;
			const resp = await axios.post(url, {
				username: username,
				organization: orgName,
			});
			return resp.data.status;
		} catch (err) {
			//TODO
			return true;
		}
	}

	// TODO
	static async upload(
		username: string,
		name: string,
		data: string
	): Promise<string> {
		try {
			const resp = await axios.post(`${this.host}/upload`, {
				user: username,
				name: name,
				data: data,
			});
			return resp.data.message;
		} catch (err) {
			return 'Error uploading file';
		}
	}

	// TODO
	static getFileNames(username: string): Promise<string[]> {
		return axios
			.get(`${this.host}/get/file/names/${username}`)
			.then((resp) => {
				return resp.data;
			})
			.catch(() => {
				return [];
			});
	}

	// TODO
	static getFileContent(username: string, filename: string): Promise<string> {
		return axios
			.get(`${this.host}/get/file/content/${username}/${filename}`)
			.then((resp) => {
				return resp.data;
			})
			.catch(() => {
				return 'Error getting file content!';
			});
	}
}

export default APIService;
