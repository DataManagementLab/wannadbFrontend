import { useEffect, useState } from 'react';
import './AttributeAdder.scss';
import Icon from '../Icon/Icon';

interface Props {
	populateAble: boolean;
	onListChange: (list: string[]) => void;
	initialList?: string[];
}

/**
 * A component that allows the user to add attributes to there document base
 */
function AttributeAdder({
	populateAble = true,
	onListChange,
	initialList = [],
}: Props) {
	const [attList, setAttList] = useState<string[]>([]);

	useEffect(
		() => {
			if (
				import.meta.env.VITE_APP_LOG === 'true' &&
				initialList.length == 0
			) {
				initialList.push('Country', 'Animal');
			}
			setAttributeList(initialList);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

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
			{attList.length === 0 && (
				<p>
					<i>Enter a attribute...</i>
				</p>
			)}
			{attList.map((att, i) => {
				return (
					<div className="attribute" key={i}>
						<p className="name">{att}</p>
						{populateAble && (
							<Icon
								cls="bi bi-play"
								style={{
									marginRight: '10px',
									fontSize: '1.9rem',
								}}
							>
								Populate
							</Icon>
						)}
						{populateAble && (
							<Icon
								cls="bi bi-arrow-clockwise icon"
								style={{
									marginRight: '10px',
									fontSize: '1.7rem',
								}}
							></Icon>
						)}
						<Icon
							cls="bi bi-trash icon"
							onClicked={() => deleteAttribute(att)}
						>
							Remove Attribute
						</Icon>
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
				<Icon
					cls="bi bi-plus-square icon addBtn"
					onClicked={() => {
						addAttribute(inputvalue);
						setInputValue('');
					}}
				>
					Add Attribute
				</Icon>
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
