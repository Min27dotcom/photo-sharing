/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { deleteAllCookies } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/authentication";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(checkAuthen(false));
    deleteAllCookies();
    navigate("/login");
  }, []);

  return <></>;
}

export default Logout;