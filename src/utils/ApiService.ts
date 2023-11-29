import axios from 'axios';

class APIService {
	static host = import.meta.env.VITE_API_URL;

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
