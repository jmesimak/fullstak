const initialState = { keyword: '' }

export default (store = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_FILTER':
    return { keyword: action.keyword }
  default:
    return store
  }
}

export const filterUpdateAction = keyword => ({ type: 'UPDATE_FILTER', keyword })
