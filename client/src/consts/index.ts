const { REACT_APP_BASE_URL, REACT_APP_REDUX_DEBUG, NODE_ENV } = process.env;

const REDUX_DEBUG = REACT_APP_REDUX_DEBUG === "true";
const ENV = NODE_ENV;
const specialCharactersRegex = /[~`!@#$%^&*)(=,./\\|<>?;:[\]}{'"+_-]/;

export { REACT_APP_BASE_URL, REDUX_DEBUG, ENV, specialCharactersRegex };
