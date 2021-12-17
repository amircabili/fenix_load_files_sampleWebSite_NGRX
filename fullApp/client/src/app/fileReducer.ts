// action - json
// type - Mandatory - the action type
// payload - Optiona - some data send to the action
// tslint:disable-next-line:typedef
export function FileReducer(state = [], action: { type: any; payload: any; }  )
{
  switch (action.type)
  {
    case 'ADD':
      return [...state, action.payload];

    default:
      return state;
  }
}
