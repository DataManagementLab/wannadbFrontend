import React, { useEffect } from 'react';
import NuggetDocument from '../../types/NuggetDocument';
import './NuggetText.scss';
import Nugget from '../../types/Nugget';
import Icon from '../Icon/Icon';
import Logger from '../../utils/Logger';
import DocBase from '../../types/DocBase';
import { useShowNotification } from '../../providers/NotificationProvider';
import APIService from '../../utils/ApiService';

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

	const [confirmedNuggets, setConfirmedNuggets] = React.useState<string[]>(
		[]
	);

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

	useEffect(() => {
		const cnugget = localStorage.getItem(
			`${docBase.name}-${doc.name}-${docBase.attributes.join(
				', '
			)}-cnugget`
		);

		if (cnugget !== null) {
			setTimeout(
				() => {
					setConfirmedNuggets(JSON.parse(cnugget));
				},
				Math.floor(Math.random() * 1000) + 1000
			);
		}

		if (!interactive) return;
		setTimeout(() => {
			Logger.log('fetching ordered nuggets');
			docBase.fetchOrderedNuggets();
		}, 1000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const addToConfirmedNuggets = (nugget: Nugget) => {
		const newConfirmedNuggets = confirmedNuggets;
		newConfirmedNuggets.push(nugget.getHash());
		setConfirmedNuggets(newConfirmedNuggets);

		localStorage.setItem(
			`${docBase.name}-${doc.name}-${docBase.attributes.join(
				', '
			)}-cnugget`,
			JSON.stringify(newConfirmedNuggets)
		);
	};

	const confirmNugget = (nugget: Nugget) => {
		//TODO
		// get random time between 1000 amd 2000
		setTimeout(
			() => {
				addToConfirmedNuggets(nugget);

				showNotification('Success', 'Nugget confirmed');
			},
			Math.floor(Math.random() * 1000) + 1000
		);

		const interactiveTaskId = sessionStorage.getItem('docbaseId');
		if (interactiveTaskId === null) {
			Logger.error('No interactive task id found');
			return;
		}
		APIService.confirmMatchNugget(
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
				//showNotification('Error', 'Failed to confirm nugget');
				return;
			}

			/* const taskId = res;
			const interval = setInterval(() => {
				APIService.getTaskStatus(taskId).then((res) => {
					Logger.log('Confirm nugget start*****' + interval);
					Logger.log(res);
					Logger.log('Confirm nugget end*****');
					if (
						res == undefined ||
						res.state.toUpperCase().trim() === 'FAILURE'
					) {
						// showNotification('Error', 'Failed to confirm nugget');
						clearInterval(interval);
						return;
					} else if (res.state.toUpperCase().trim() === 'SUCCESS') {
						// TODO
						// showNotification('Success', 'Nugget confirmed');

						clearInterval(interval);
					}
				});
			}, 1000); */
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
										fontSize: '1.5rem',
										marginRight: '0px',
										paddingRight: '5px',
										verticalAlign: '-1px',
									}}
									cls={
										'bi icon ml' +
										(confirmedNuggets.includes(
											doc.nuggets[index].getHash()
										)
											? ' bi-check-circle-fill'
											: ' bi-check-circle')
									}
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
			{!interactive && (
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
			)}
		</>
	);
}
export default NuggetText;
