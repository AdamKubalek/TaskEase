import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const DASH_REGEX = /^\/dash(\/)?$/;
const USER_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onLogoutClicked = () => {
    sendLogout();
  };

  if (isLoading) return <p>Logging Out...</p>;
  if (isError) return <p>Error: {error.data?.message}</p>;

  let dashClass = null;
  if (!DASH_REGEX.test(pathname) && !USER_REGEX.test(pathname)) {
    dashClass = "dash-header";
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={onLogoutClicked}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  return (
    <header className="dash-header">
      <div className={`dash - header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">Dashboard</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* add more buttons later */}
          {logoutButton}
        </nav>
      </div>
    </header>
  );
};

export default DashHeader;
