// src/components/Filter.jsx:

import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer' // Import the setFilter action creator from filterReducer

const Filter = () => {
  const dispatch = useDispatch()
  
  const handleChange = (event) => {         // Handler for input changes.
    const filterText = event.target.value   // input-field value is in variable event.target.value
    
    dispatch(setFilter(filterText))   // Dispatch the SET_FILTER action with the current input value as the payload
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />  {/* Calls handleChange whenever input value changes (fires on every input key-stroke) */}
    </div>
  )
}
export default Filter