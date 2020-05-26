// Action Creators 
// Reducing Boilerplate with makeActionCreator https://redux.js.org/recipes/reducing-boilerplate#generating-action-creators
export function makeActionCreator(type, ...argNames) {
    return function (...args) {
      const action = { type }
      argNames.forEach((arg, index) => {
        action[argNames[index]] = args[index]
      })
      return action;
    }
}