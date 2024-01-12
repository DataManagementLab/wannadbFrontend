/**
 * A document that can be edited by the user.
 */
class MyDocument {
	readonly id: number;
	readonly name: string;
	content: string;

	constructor(name: string, id: number, content: string) {
		this.name = name;
		this.id = id;
		this.content = content;
	}
}

export default MyDocument;
