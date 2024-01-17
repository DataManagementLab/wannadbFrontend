/**
 * A Nugget is a span of text that is marked in the content.
 */
class Nugget {
	startChar: number;
	endChar: number;
	text: string;
	readonly ID: number;
	static IDCounter = 0;

	constructor(start_char: number, end_char: number, docText: string) {
		this.endChar = end_char;
		this.startChar = start_char;

		this.text = docText.substring(start_char, end_char);
		this.ID = Nugget.IDCounter;
		Nugget.IDCounter++;
	}
}

export default Nugget;
