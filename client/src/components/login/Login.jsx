import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";
import { useState } from "react";

export default function Login() {
    const { loginHandler } = useUserContext();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));

        if (errors[e.target.name]) {
            setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
        }
    };

    const validate = (values) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(values.email.trim())) {
            errors.email = 'Enter valid email';
        }

        if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return errors;
    }

    const loginSubmitHandler = async (e) => {
        e.preventDefault();

        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            await loginHandler(values.email, values.password);
            navigate('/');
        } catch (err) {
            setErrors({ general: err.message });
        }
    }


    return (
        <>
            <div className="col-lg-4 col-12 mb-5 mx-auto" style={{ minHeight: '74vh' }}>
                <h2 className="tm-text-primary pt-5 mb-5 text-center">Login</h2>
                <form id="login-form" action="" method="POST" className="tm-contact-form mx-auto" onSubmit={loginSubmitHandler} noValidate>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            className="form-control rounded-0"
                            placeholder="Email"
                            value={values.email}
                            onChange={onChange}
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
                            onChange={onChange}
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
