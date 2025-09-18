import { useDispatch } from "react-redux";
import { notifyUser } from "../redux/slice";

function useNotify() {
  const dispatch = useDispatch();
  const notifySuccess = (message) => {
    dispatch(notifyUser([message, "success"]));
  };
  const notifyError = (message) => {
    dispatch(notifyUser([message, "error"]));
  };
  return { notifySuccess, notifyError };
}

export default useNotify;
