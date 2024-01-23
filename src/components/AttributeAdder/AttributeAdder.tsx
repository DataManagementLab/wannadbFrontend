import { useState } from 'react';
import './AttributeAdder.scss';

interface Props {
	populateAble: boolean;
	onListChange: (list: string[]) => void;
}

/**
 * A component that allows the user to add attributes to there document base
 */
function AttributeAdder({ populateAble = true, onListChange }: Props) {
	const [attList, setAttList] = useState<string[]>([]);
	const [inputvalue, setInputValue] = useState<string>('');

	const addAttribute = (att: string) => {
		if (attList.includes(att) || att.trim() === '') {
			return;
		}
		setAttributeList([...attList, att]);
	};

	const deleteAttribute = (att: string) => {
		setAttributeList(attList.filter((a) => a !== att));
	};

	const setAttributeList = (list: string[]) => {
		onListChange(list);
		setAttList(list);
	};

	const handlekeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			addAttribute(inputvalue);
			setInputValue('');
		}
	};

	return (
		<div className="AttributeAdder">
			<p>Enter the attribute names.</p>
			{attList.map((att, i) => {
				return (
					<div className="attribute" key={i}>
						<p className="name">{att}</p>
						{populateAble && (
							<i
								className="bi bi-play icon"
								style={{
									marginRight: '10px',
									fontSize: '1.9rem',
								}}
							></i>
						)}
						{populateAble && (
							<i
								className="bi bi-arrow-clockwise icon"
								style={{
									marginRight: '10px',
									fontSize: '1.7rem',
								}}
							></i>
						)}
						<i
							className="bi bi-trash icon"
							onClick={() => deleteAttribute(att)}
						></i>
					</div>
				);
			})}
			<div className="attributeInput">
				<input
					type="text"
					placeholder="Attribute name"
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handlekeyPress}
					value={inputvalue}
				/>
				<i
					className="bi bi-plus-square icon addBtn"
					onClick={() => {
						addAttribute(inputvalue);
						setInputValue('');
					}}
				></i>
			</div>
			{populateAble && (
				<button className="btn populateBtn">
					<i className="bi bi-play icon"></i>Populate Remaining
					Attributes
				</button>
			)}
		</div>
	);
}
export default AttributeAdder;
