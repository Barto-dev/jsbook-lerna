import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from '../redux';

// rebind after each render and always return new action (create new pointer on action)
export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => {
        return bindActionCreators(actionCreators, dispatch);
        // In the array of dependencies, we pass only those values that are declared inside the component or received
        // props, imports and declarations outside the component do not need to be passed to the deps
    }, [dispatch])
}
