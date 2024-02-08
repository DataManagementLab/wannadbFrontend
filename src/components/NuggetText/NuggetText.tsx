import React from 'react';
import NuggetDocument from '../../types/NuggetDocument';
import './NuggetText.scss';
import Nugget from '../../types/Nugget';
import Icon from '../Icon/Icon';
import Logger from '../../utils/Logger';
import APIService from '../../utils/ApiService';
import DocBase from '../../types/DocBase';
import { useShowNotification } from '../../providers/NotificationProvider';

interface Props {
	docBase: DocBase;
	doc: NuggetDocument;
	interactive?: boolean;
}

/**
 * Displays a NuggetDocuments content and highlights the nuggets
 * @param param0 The nuggget document to display
 * @returns
 */
function NuggetText({ doc, docBase, interactive = false }: Props) {
	const [selectedNugget, setSelectedNugget] = React.useState<
		Nugget | undefined
	>(undefined);

	const showNotification = useShowNotification();

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

	const confirmNugget = (nugget: Nugget) => {
		const interactiveTaskId = sessionStorage.getItem('docbaseId');
		if (interactiveTaskId === null) {
			Logger.error('No interactive task id found');
			return;
		}
		APIService.confirmNugget(
			docBase.organizationId,
			docBase.name,
			doc.name,
			doc.content,
			nugget.text,
			nugget.startChar,
			nugget.endChar,
			interactiveTaskId
		).then((res) => {
			if (res === undefined) {
				showNotification('error', 'Failed to confirm nugget');
				return;
			}

			const taskId = res;
			const interval = setInterval(() => {
				APIService.getTaskStatus(taskId).then((res) => {
					Logger.log('Confirm nugget start*****' + interval);
					Logger.log(res);
					Logger.log('Confirm nugget end*****');
					if (
						res == undefined ||
						res.state.toUpperCase().trim() === 'FAILURE'
					) {
						showNotification('Error', 'Failed to confirm nugget');
						clearInterval(interval);
					} else if (res.state.toUpperCase().trim() === 'SUCCESS') {
						showNotification('Success', 'Nugget confirmed');
						clearInterval(interval);
					}
				});
			}, 1000);
		});
	};

	const finalHighlightedText = normalizedIntervals
		.map(({ start, end }, index) => (
			<React.Fragment key={index}>
				{text.substring(
					index > 0 ? normalizedIntervals[index - 1].end : 0,
					start
				)}
				<span className="box">
					{/* 					<span className="attribute-label">att</span>
					 */}
					<span
						className={
							selectedNugget === undefined
								? 'ghf highlighted'
								: selectedNugget.startChar == start &&
								    selectedNugget.endChar == end
								  ? 'ghf highlighted'
								  : 'ghf highlighted-unselected'
						}
					>
						<span>{text.substring(start, end)}</span>
						{interactive && (
							<>
								<Icon
									style={{
										color: 'black',
										fontSize: '1.2rem',
										marginRight: '5px',
										paddingRight: '10px',
									}}
									cls="bi bi-hand-thumbs-up icon ml"
									onClicked={() => {
										Logger.log('Confirm Nugget');
										confirmNugget(doc.nuggets[index]);
									}}
								>
									Confirm Nugget
								</Icon>
								{/* <Icon
									style={{
										color: 'black',
										fontSize: '1.2rem',
										paddingRight: '10px',
									}}
									cls="bi bi-hand-thumbs-down icon"
									onClicked={() => {
										Logger.log('Decline Nugget');
									}}
								>
									Decline Nugget
								</Icon> */}
							</>
						)}
					</span>
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
