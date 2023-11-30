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
	 * @returns A promise that resolves to true if the registration was successful, false otherwise.
	 */
	static async login(username: string, password: string): Promise<boolean> {
		try {
			const resp = await axios.post(`${this.host}/login`, {
				username: username,
				password: password,
			});
			return resp.status === 200;
		} catch (err) {
			return false;
		}
	}

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
