import NuggetDocument from './NuggetDocument';

/**
 * Base class for a document base.
 */
class DocBase {
	readonly name: string;
	attributes: string[];
	docs: NuggetDocument[];

	constructor(name: string, attributes: string[]) {
		this.name = name;
		this.attributes = attributes;
		this.docs = [];
	}

	addNuggetDocument(doc: NuggetDocument): void {
		this.docs.push(doc);
	}

	addNugget(
		docName: string,
		docContent: string,
		startChar: number,
		endChar: number
	) {
		const doc = this.docs.find((doc) => doc.isSame(docName, docContent));
		if (doc !== undefined) {
			doc.addNugget(startChar, endChar);
			return;
		}
		const newDoc = new NuggetDocument(docName, docContent);
		newDoc.addNugget(startChar, endChar);
		this.docs.push(newDoc);
	}
}

export default DocBase;
