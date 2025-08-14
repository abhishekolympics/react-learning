we discussed following topics till now -

1. useState
2. const - we cannot reassign a value to a const variable, but we can modify it
3. event props(event handlers) - onClick, onChange
4. spread operator - ... it gets the previous value of the array.
5. filter() - it returns the filtered values like array.filter((_,i) => i !== index)
6. map() - it has two parameters, first is the value, second is the index - it is used to loop over an array in JSX
7. ul, li, ol - unordered list, list item, ordered list
8. Date() - it helps in showing the date in human readable format, new Date(date_value).toLocaleString()
9. toLocaleString() - it helps in showing the date in the format, which we want
10. localStorage() - it is a simple storage, which is there in the browser, it persists over refreshes and browser close
11. useEffect() - it helps in re-render and it has dependency array, which when changes helps in re-initiating the useeffect

12. array.from() - it helps in reversing the array

{Array.from({ length: tasks.length }, (_, i) => {
  const task = tasks[tasks.length - 1 - i];
  return <TaskCard key={task.id} task={task} />;
})}


13. context api - it helps in retaining values across components without props drilling

import { createContext } from "react";
export const MyContext = createContext();

import { MyContext } from "./context";

<MyContext.Provider value={someValue}>
      <ComponentA />
    </MyContext.Provider>

14. useReducer - it helps in reducing the state & their function overhead

const [state, dispatch] = useReducer(reducer, initialState);

// reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

// Usage:
dispatch({ type: 'increment' });
dispatch({ type: 'decrement' });

15. useCallback - it helps in memoizing the functions in react, it also has a dependency array

const memoizedCallback = useCallback(
  () => {
    // your logic here
  },
  [dependency1, dependency2] // only recreate when these change
);


16. useMemo() - it helps in memoizing the value of a variable 

const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);


17. fiber node - react's internal data structure that represents one instance of your component in memory.

18. useRef - used for retaining a value across renders, it doesn't depend on anything. So no dependency variable.

const variable1 = useRef("");

console.log('variable1=',variable1.current);