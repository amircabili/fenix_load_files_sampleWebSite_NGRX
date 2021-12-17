// action - json
// type - Mandatory - the action type
// payload - Optiona - some data send to the action

// tslint:disable-next-line:typedef
//export function CounterReducer(state = {count : 0}, action:any )

 export function FilesReducer(state = [], action: { type: any; payload: any; })
{
  switch(action.type)
  {
    case "ADD":
      return [...state, action.payload];

    // case 'INCREMENT':
    //   return { ...state,  count :   action.payload};

    // case 'DECREMENT':
    //   return { ...state,  count : state.count - action.payload};

    default:
      return state;
  }
}


