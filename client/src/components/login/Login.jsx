import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";
import useForm from "../../hooks/useForm";

export default function Login() {
    const { loginHandler } = useUserContext();
    const navigate = useNavigate();

    const validate = (values) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(values.email.trim())) {
            errors.email = 'Enter valid email';
        }

        return errors;
    };

    const onSubmit = async (values) => {
        await loginHandler(values.email, values.password);
        navigate('/')
    };

    const { values, errors, changeHandler, submitHandler } = useForm(
        { email: '', password: '' },
        validate,
        onSubmit
    );

    return (
        <>
            <div className="col-lg-4 col-12 mb-5 mx-auto" style={{ minHeight: '74vh' }}>
                <h2 className="tm-text-primary pt-5 mb-5 text-center">Login</h2>
                <form
                    id="login-form"
                    action=""
                    method="POST"
                    className="tm-contact-form mx-auto"
                    onSubmit={submitHandler}
                    noValidate
                >
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            className="form-control rounded-0"
                            placeholder="Email"
                            value={values.email}
                            onChange={changeHandler}
                        />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            className="form-control rounded-0"
                            placeholder="Password"
                            autoComplete="off"
                            value={values.password}
                            onChange={changeHandler}
                        />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                    </div>

                    {errors.general && <p className="text-danger text-center">{errors.general}</p>}

                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
}
