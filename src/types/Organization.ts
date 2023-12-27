/**
 * Organization class to store organization data
 */
class Organization {
	readonly name: string;
	readonly id: number;

	constructor(name: string, id: number) {
		this.name = name;
		this.id = id;
	}
}

export default Organization;
