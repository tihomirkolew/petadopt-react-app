import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function Login() {

    const { loginHandler } = useUserContext();
    const navigate = useNavigate();

    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        try {
            await loginHandler(email, password);
            navigate('/');
        } catch (err) {
            return { success: false, message: err.message };
        }
    }


    return (
        <>
            <div className="col-lg-4 col-12 mb-5 mx-auto" style={{minHeight: '74vh'}}>
                <h2 className="tm-text-primary pt-5 mb-5 text-center">Login</h2>
                <form id="login-form" action="" method="POST" className="tm-contact-form mx-auto" onSubmit={loginSubmitHandler}>
                    <div className="form-group">
                        <input type="email" name="email" className="form-control rounded-0" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control rounded-0" placeholder="Password" required autoComplete="off" />
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
}
