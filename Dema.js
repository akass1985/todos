///actions.js
const ActionTypes = {
  FETCH_TODO: "FETCH_TODO",
  FETCH_TODO_SUCCESS: "FETCH_TODO_SUCCESS",
  FETCH_TODO_FAILURE: "FETCH_TODO_FAILURE"
};

export const fetchTodo = () => (dispatch, getState) => {
  const userId = selectCurrentUserId(getState());
  if (userId != null) {
    dispatch({ type: ActionTypes.FETCH_TODO });
    apiFetchTodos(userId).then(
      data => {
        dispatch(fetchTodoSuccess(data));
      },
      error => dispatch(fetchTodoFailure(error))
    );
  }
};

export const fetchTodoSuccess = data => ({
  type: ActionTypes.FETCH_TODO_SUCCESS,
  data
});

export const fetchTodoFailure = error => ({
  type: ActionTypes.FETCH_TODO_FAILURE,
  error
});

/// reducer.js

function todos(state = { loading: false, error: null, data: [] }, action) {
  switch (action.type) {
    case ActionTypes.FETCH_TODO:
      return { ...state, loading: true };
    case ActionTypes.FETCH_TODO_FAILURE:
      return { ...state, loading: false, error: action.error };
    case ActionTypes.FETCH_TODO_SUCCESS: {
      return { loading: false, error: null, data: action.data };
    }
  }
}

export const selectTodos = state => a.b.todos;

export default combineReducers({ todos });

/// Component

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  const todos = useSelector(selectTodos);
  if (todos.loading) {
    return <div>loading</div>;
  }
  if (todos.error) {
    return <div>error: {error.toString()}</div>;
  }

  return (
    <div>
      {todos.data.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
};