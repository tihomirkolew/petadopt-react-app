import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";
import { useState } from "react";

export default function Register() {
    const { registerHandler } = useUserContext();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));

        if (errors[e.target.name]) {
            setErrors(previousErrors => ({
                ...previousErrors,
                [e.target.name]: undefined
            }));
        }
    };

    const validate = (values) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(values.email.trim())) {
            errors.email = 'Enter valid email';
        }

        if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters'
        }

        if (values.password.trim() != values.confirmPassword.trim()) {
            errors.confirmPassword = "Passwords don't match";
        }

        return errors;
    }

    const registerSubmitHandler = async (e) => {
        e.preventDefault();

        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await registerHandler(values.email, values.password, values.confirmPassword);
            navigate('/');
        } catch (err) {
            return { general: err.message };
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
                    noValidate
                >
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
                    <div className="form-group">
                        <input 
                        type="password" 
                        name="confirmPassword" 
                        className="form-control rounded-0" 
                        placeholder="Confirm Password" 
                        autoComplete="off"
                        value={values.confirmPassword}
                        onChange={onChange}
                        />
                        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </>
    );
}
