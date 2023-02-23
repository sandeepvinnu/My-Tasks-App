import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

import TabItem from './components/TabItem'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    tasksList: [],
    taskText: '',
    tagType: tagsList[0].optionId,
    activeTag: '',
  }

  clickTag = idVal => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === idVal ? '' : idVal,
    }))
  }

  formButton = event => {
    event.preventDefault()
    const {taskText, tagType} = this.state
    const newTask = {
      id: uuidv4(),
      taskText,
      tagType,
    }
    if (taskText.length !== 0) {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        taskText: '',
        tagType: 'Health',
      }))
    }
  }

  taskChange = event => {
    this.setState({taskText: event.target.value})
  }

  tagChange = event => {
    this.setState({tagType: event.target.value})
  }

  renderMethod = () => {
    const {tasksList, activeTag} = this.state
    const filteredView =
      activeTag === ''
        ? tasksList
        : tasksList.filter(e => e.tagType === activeTag)
    console.log(filteredView)
    return (
      <ul className="l-cont-list">
        {filteredView.map(e => (
          <li key={e.id} className="l-list-item">
            <p className="task">{e.taskText}</p>
            <p className="tag">{e.tagType}</p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {tasksList, taskText, activeTag, tagType} = this.state
    const taskView = tasksList.length === 0
    return (
      <div className="bg-container">
        <form className="card-1" onSubmit={this.formButton}>
          <h1 className="head-1">Create a task!</h1>
          <label htmlFor="task" className="label">
            Task
          </label>
          <br />
          <input
            type="text"
            id="task"
            placeholder="Enter the task here"
            className="input"
            onChange={this.taskChange}
            value={taskText}
          />
          <br />
          <label htmlFor="tag" className="label">
            Tags
          </label>
          <br />
          <select
            id="tag"
            className="input-2"
            onChange={this.tagChange}
            value={tagType}
          >
            {tagsList.map(e => (
              <option value={e.optionId} key={e.optionId}>
                {e.displayText}
              </option>
            ))}
          </select>
          <div className="butt-cont">
            <button type="submit" className="butt">
              Add Task
            </button>
          </div>
        </form>
        <div className="card-2">
          <h1 className="head-2">Tags</h1>
          <ul className="list-cont">
            {tagsList.map(e => (
              <TabItem
                key={e.optionId}
                item={e}
                tabId={activeTag}
                clickTag={this.clickTag}
              />
            ))}
          </ul>
          <h1 className="head-3">Tasks</h1>
          {taskView ? (
            <div className="l-card">
              <p className="head-2">No Tasks Added Yet</p>
            </div>
          ) : (
            this.renderMethod()
          )}
        </div>
      </div>
    )
  }
}

export default App
