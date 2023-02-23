import './index.css'

const TabItem = props => {
  const {item, tabId, clickTag} = props
  const {optionId, displayText} = item
  const classVal = tabId === optionId ? 'bg' : ''
  const tagClick = () => {
    clickTag(optionId)
  }
  return (
    <li className="">
      <button
        type="button"
        className={`list-item ${classVal}`}
        onClick={tagClick}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
