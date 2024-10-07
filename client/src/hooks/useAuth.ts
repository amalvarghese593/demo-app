import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "../actions/actions";
import { useNavigate } from "react-router-dom";

interface State {
  authReducer: any;
}
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: State) => state.authReducer);

  const onError = () => {
    navigate("/login");
  };
  useEffect(() => {
    dispatch(verifyToken({ onError }) as any);
  }, []);
  return { isLoggedIn };
};
export default useAuth;
