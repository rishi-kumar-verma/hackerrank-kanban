import React, { useEffect } from "react";
import "./index.css"

export default function KanbanBoard(props) {
	let [taskInput, setTaskInput] = React.useState();
	let [tasks, setTasks] = React.useState([
		{ name: '1', stage: 0 },
		{ name: '2', stage: 0 },
	])

	let [stagesNames, setStagesNames] = React.useState(['Backlog', 'To Do', 'Ongoing', 'Done']);
	let stagesTasks = [];
	for (let i = 0; i < stagesNames.length; ++i) {
		stagesTasks.push([]);
	}

	for (let task of tasks) {
		const stageId = task.stage;
		stagesTasks[stageId].push(task);
	}

	const addTask = () => {
		setTasks((preState) => {
			return [
				...preState,
				{ name: taskInput, stage: 0 },
			]
		})
	}
	const leftMove = (task) => {
		if (task.stage > 0) {
			let neTasks = tasks;
			neTasks.find(value => value.name === task.name).stage = task.stage - 1;
			setTasks([...neTasks])
		}
	}

	const rightMove = (task) => {
		if (task.stage < 3) {
			let neTasks = tasks;
			neTasks.find(value => value.name === task.name).stage = task.stage + 1;
			setTasks([...neTasks])
		}

	}

	const deleteItem = (task) => {
		setTasks(tasks.filter((x) => x.name !== task.name))
	}

	return (
		<div className="mt-20 layout-column justify-content-center align-items-center">
			<section className="mt-50 layout-row align-items-center justify-content-center">
				<input id="create-task-input" onChange={(event) => { setTaskInput(event.target.value) }} type="text" className="large" placeholder="New task name" data-testid="create-task-input" />
				<button type="submit" onClick={addTask} className="ml-30" data-testid="create-task-button">Create task</button>
			</section>

			<div className="mt-50 layout-row">
				{stagesTasks.map((tasks, i) => {
					return (
						<div className="card outlined ml-20 mt-0" key={`${i}`}>
							<div className="card-text">
								<h4>{stagesNames[i]}</h4>
								<ul className="styled mt-50" data-testid={`stage-${i}`}>
									{tasks.map((task, index) => {
										return <li className="slide-up-fade-in" key={`${i}${index}`}>
											<div className="li-content layout-row justify-content-between align-items-center">
												<span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
												<div className="icons">
													<button  className="icon-only x-small mx-2" onClick={() => { leftMove(task) }} data-testid={`${task.name.split(' ').join('-')}-back`} disabled={ task.stage === 0 ? true : false}>
														<i className="material-icons">arrow_back</i>
													</button>
													<button className="icon-only x-small mx-2" onClick={() => { rightMove(task) }} data-testid={`${task.name.split(' ').join('-')}-forward`} disabled={ task.stage === 3 ? true : false} >
														<i className="material-icons">arrow_forward</i>
													</button>
													<button className="icon-only danger x-small mx-2" onClick={() => { deleteItem(task) }} data-testid={`${task.name.split(' ').join('-')}-delete`}>
														<i className="material-icons">delete</i>
													</button>
												</div>
											</div>
										</li>
									})}
								</ul>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}