import { Link } from "react-router";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

export default function Header() {
    const { user, isAuthenticated } = useContext(UserContext);

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    {/* Home */}
                    <Link className="navbar-brand" to="/">
                        <i className="fas fa-film mr-2"></i>
                        Pet Adopt
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link nav-link-1" aria-current="page" to="/catalog">Catalog</Link>
                            </li>
                            {isAuthenticated && (
                                <li className="nav-item">
                                    <Link className="nav-link nav-link-3" to="/pets/create">Add listing</Link>
                                </li>
                            )}
                            {isAuthenticated && (
                                <li className="nav-item">
                                    <Link className="nav-link nav-link-3" to={`${user._id}/user-pets`}>My listings</Link>
                                </li>
                            )}

                            {!isAuthenticated && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link nav-link-4" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link nav-link-4" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                            {isAuthenticated && (
                                <li className="nav-item">
                                    <Link className="nav-link nav-link-2" to="/logout">
                                        Logout
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
