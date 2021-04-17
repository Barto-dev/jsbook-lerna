import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {persisMiddleware} from "./middlewares/persist-middleware";
import reducers from "./reducers";

export const store = createStore(reducers, {}, applyMiddleware(persisMiddleware, thunk));

