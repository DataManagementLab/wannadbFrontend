import { useState } from 'react';
import './AttributeAdder.scss';
import Icon from '../Icon/Icon';
import { useIsDocbaseTaskRunning } from '../../providers/DocBaseTaskProvider';

interface Props {
	onListChange: (list: string[]) => void;
	populateAble?: boolean;
	rerunAble?: boolean;
	onRerun?: (list: string[]) => void;
	initialList?: string[];
}

/**
 * A component that allows the user to add attributes to their document base
 */
function AttributeAdder({
	onListChange,
	populateAble = false,
	rerunAble = false,
	initialList = [],
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onRerun = (_list: string[]) => {},
}: Props) {
	const [attList, setAttList] = useState<string[]>(initialList);

	const isDocBaseTaskRunning = useIsDocbaseTaskRunning();

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

	const isListEqualToInitialList = () => {
		if (attList.length !== initialList.length) {
			return false;
		}
		attList.forEach((att) => {
			if (!initialList.includes(att)) {
				return false;
			}
		});
		return true;
	};

	return (
		<div className="AttributeAdder">
			{rerunAble && (
				<p>
					<i>Modify the attributes to rerun the document base.</i>
				</p>
			)}
			{attList.length === 0 && (
				<p>
					<i>Enter an attribute...</i>
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
			{rerunAble &&
				attList.length > 0 &&
				!isListEqualToInitialList() &&
				!isDocBaseTaskRunning() && (
					<button
						className="btn populateBtn"
						onClick={() => onRerun(attList)}
					>
						<i className="bi bi-play icon"></i>Rerun
					</button>
				)}
		</div>
	);
}
export default AttributeAdder;
