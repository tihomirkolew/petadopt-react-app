import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function Register() {

    const { registerHandler } = useUserContext();
    const navigate = useNavigate();

    const registerSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const confirmPassword = formData.get('confirm_password').trim();

        try {
            await registerHandler(email, password, confirmPassword);
            navigate('/');
        } catch (err) {
            return { success: false, message: err.message };
        }

    }

    return (
        <>
            <div className="col-lg-4 col-12 mb-5 mx-auto" style={{ minHeight: '74vh' }}>
                <h2 className="tm-text-primary pt-5 mb-5 text-center">Register</h2>
                <form
                    id="register-form"
                    onSubmit={registerSubmitHandler}
                    method="POST"
                    className="tm-contact-form mx-auto"
                >
                    <div className="form-group">
                        <input type="email" name="email" className="form-control rounded-0" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control rounded-0" placeholder="Password" required autoComplete="off" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="confirm_password" className="form-control rounded-0" placeholder="Confirm Password" required autoComplete="off" />
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </>
    );
}
