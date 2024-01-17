import React from 'react';
import NuggetDocument from '../../types/NuggetDocument';
import './NuggetText.scss';
import Nugget from '../../types/Nugget';

interface Props {
	doc: NuggetDocument;
}

/**
 * Displays a NuggetDocuments content and highlights the nuggets
 * @param param0 The nuggget document to display
 * @returns
 */
function NuggetText({ doc }: Props) {
	const [selectedNugget, setSelectedNugget] = React.useState<
		Nugget | undefined
	>(undefined);

	const text = doc.content;
	// Ensure intervals are within the bounds of the text
	const normalizedIntervals = doc.nuggets.map((nugget) => ({
		start: Math.max(0, Math.min(nugget.startChar, text.length)),
		end: Math.max(0, Math.min(nugget.endChar, text.length)),
	}));

	const onSelectNugget = (nugget: Nugget) => {
		if (selectedNugget === undefined) {
			setSelectedNugget(nugget);
			return;
		}
		if (selectedNugget.ID === nugget.ID) {
			setSelectedNugget(undefined);
			return;
		}

		setSelectedNugget(nugget);
	};

	const finalHighlightedText = normalizedIntervals
		.map(({ start, end }, index) => (
			<React.Fragment key={index}>
				{text.substring(
					index > 0 ? normalizedIntervals[index - 1].end : 0,
					start
				)}
				<span
					className={
						selectedNugget === undefined
							? 'highlighted'
							: selectedNugget.startChar == start &&
							    selectedNugget.endChar == end
							  ? 'highlighted'
							  : 'highlighted-unselected'
					}
				>
					{text.substring(start, end)}
				</span>
			</React.Fragment>
		))
		.concat(
			<React.Fragment key={normalizedIntervals.length}>
				{text.substring(
					normalizedIntervals[normalizedIntervals.length - 1].end
				)}
			</React.Fragment>
		);

	return (
		<>
			<div>
				<pre>{finalHighlightedText}</pre>
			</div>
			<div className="mb nuggetBox hor">
				{doc.nuggets.map((nugget, index) => {
					return (
						<span
							className={
								'ml nugget ' +
								(selectedNugget?.ID === nugget.ID
									? 'selected'
									: '')
							}
							key={index}
							onClick={() => onSelectNugget(nugget)}
						>
							{nugget.text.replace(/\n/g, ' ')}
						</span>
					);
				})}
			</div>
		</>
	);
}
export default NuggetText;
