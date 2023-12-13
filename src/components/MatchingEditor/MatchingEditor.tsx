import { useState } from 'react';
import './MatchingEditor.scss';

interface WordCoordinate {
	line: number;
	word: number;
}

/**
 * A component to choose the matching word from the text
 */
function MatchingEditor() {
	const [selectedWord, setSelectedWord] = useState<WordCoordinate>({
		line: -1,
		word: -1,
	});

	// TODO get the text from the backend
	const text =
		'Hello World!\nThis is a test file.\nIt is used to test the file viewer.';
	/* const text =
		'Hello World!\nThis is a test file.\nIt is used to test the file viewer.\n\nThis is a new paragraph.\n\nThis is another new paragraph.\n\nThis is a third new paragraph.\n\nThis is a fourth new paragraph.\n\nThis is a fifth new paragraph.\n\nThis is a sixth new paragraph.\n\nThis is a seventh new paragraph.\n\nThis is an eighth new paragraph.\n\nThis is a ninth new paragraph.\n\nThis is a tenth new paragraph.\n\nThis is an eleventh new paragraph.\n\nThis is a twelfth new paragraph.\n\nThis is a thirteenth new paragraph.\n\nThis is a fourteenth new paragraph.\n\nThis is a fifteenth new paragraph.\n\nThis is a sixteenth new paragraph.\n\nThis is a seventeenth new paragraph.\n\nThis is an eighteenth new paragraph.\n\nThis is a nineteenth new paragraph.\n\nThis is a twentieth new paragraph.\n\nThis is a twenty-first new paragraph.\n\nThis is a twenty-second new paragraph.\n\nThis is a twenty-third new paragraph.\n\nThis is a twenty-fourth new paragraph.\n\nThis is a twenty-fifth new paragraph.\n\nThis is a twenty-sixth new paragraph.\n\nThis is a twenty-seventh new paragraph.\n\nThis is a twenty-eighth new paragraph.\n\nThis is a twenty-ninth new paragraph.\n\nThis is a thirtieth new paragraph.\n\nThis is a thirty-first new paragraph.\n\nThis is a thirty-second new paragraph.\n\nThis is a thirty-third new paragraph.\n\nThis is a thirty-fourth new paragraph.\n\nThis is a thirty-fifth new paragraph.\n\nThis is a thirty-sixth new paragraph.\n\nThis is a thirty-seventh new paragraph.\n\nThis is a thirty-eighth new paragraph.\n\nThis is a thirty-ninth new paragraph.\n\nThis is a fortieth new paragraph.\n\nThis is a forty-first new paragraph.\n\nThis is a forty-second new paragraph.\n\nThis is a forty-third new paragraph.\n\nThis is a forty-fourth new paragraph.\n\nThis is a forty-fifth new paragraph.\n\nThis is a forty-sixth new paragraph.\n\nThis is a forty-seventh new paragraph.\n\nThis is a forty-eighth new paragrap';
 */
	const lines = text.split('\n');

	const skipLeft = () => {
		if (selectedWord.word <= 0 && selectedWord.line <= 0) {
			return;
		}

		if (selectedWord.word > 0) {
			setSelectedWord({
				line: selectedWord.line,
				word: selectedWord.word - 1,
			});
		} else {
			setSelectedWord({
				line: selectedWord.line - 1,
				word: lines[selectedWord.line - 1].split(' ').length - 1,
			});
		}
	};

	const skipRight = () => {
		if (
			selectedWord.word >=
				lines[selectedWord.line].split(' ').length - 1 &&
			selectedWord.line >= lines.length - 1
		) {
			return;
		}

		if (
			selectedWord.word <
			lines[selectedWord.line].split(' ').length - 1
		) {
			setSelectedWord({
				line: selectedWord.line,
				word: selectedWord.word + 1,
			});
		} else {
			setSelectedWord({
				line: selectedWord.line + 1,
				word: 0,
			});
		}
	};

	return (
		<div className="MatchingEditor">
			<div className="text">
				{lines.map((line, lineIndex) => {
					const words = line.split(' ');
					return (
						<div key={lineIndex + 'line'}>
							{words.map((word, wordIndex) => {
								return (
									<span key={lineIndex + '' + wordIndex}>
										<span
											className={
												'word' +
												(selectedWord.line ===
													lineIndex &&
												selectedWord.word === wordIndex
													? ' selected'
													: '')
											}
											key={lineIndex + '' + wordIndex}
											onClick={() => {
												setSelectedWord({
													line: lineIndex,
													word: wordIndex,
												});
											}}
										>
											{word}
										</span>
										<span
											className="space"
											onClick={() => {
												setSelectedWord({
													line: lineIndex,
													word: wordIndex,
												});
											}}
											key={
												lineIndex +
												'' +
												wordIndex +
												'space'
											}
										>
											{' '}
										</span>
									</span>
								);
							})}
							<br />
						</div>
					);
				})}
			</div>

			<div className="btnBox hor">
				<button className="btn" onClick={skipLeft}>
					Skip Left
				</button>
				<button className="btn" onClick={skipRight}>
					Skip Right
				</button>
				<button className="btn">Confirm Match</button>
				<button className="btn">There is No Match</button>
			</div>
		</div>
	);
}
export default MatchingEditor;
