import Nugget from './Nugget';

/**
 * A NuggetDocument is a document that contains one or multiple nuggets.
 */
class NuggetDocument {
	name: string;
	content: string;
	nuggets: Nugget[];

	constructor(name: string, content: string) {
		this.name = name;
		this.content = content;
		this.nuggets = [];
	}

	equals(other: NuggetDocument): boolean {
		return this.name === other.name && this.content === other.content;
	}

	isSame(name: string, content: string): boolean {
		return this.name === name && this.content === content;
	}

	addNuggetObj(nugget: Nugget): void {
		this.nuggets.push(nugget);
	}

	addNugget(startChar: number, endChar: number): void {
		let nuggetExists = false;
		this.nuggets.forEach((nugget) => {
			if (nugget.startChar === startChar && nugget.endChar === endChar) {
				nuggetExists = true;
			}
		});
		if (nuggetExists) {
			return;
		}
		this.nuggets.push(new Nugget(startChar, endChar, this.content));
		// order nuggets by startChar
		this.nuggets.sort((a, b) => a.startChar - b.startChar);
	}
}

export default NuggetDocument;
