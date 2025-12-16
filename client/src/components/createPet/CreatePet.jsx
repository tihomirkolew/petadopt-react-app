import { useNavigate } from "react-router";
import UserContext, { useUserContext } from "../../contexts/UserContext";
import usePetRequest from "../../hooks/usePetRequest";
import useForm from "../../hooks/useForm";

export default function CreatePet() {
    const navigate = useNavigate();
    const { isAuthenticated } = useUserContext();
    const { request } = usePetRequest(`http://localhost:3030/data/pets`);

    const validate = (values) => {
        const errors = {};

        if (values.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        if (!values.age || Number(values.age) <= 0) {
            errors.age = 'Age must be a positive number';
        }

        if (values.kind.trim().length < 3) {
            errors.kind = 'Kind must be at least 3 characters';
        }

        if (values.description.trim().length < 10) {
            errors.description = 'Description must be at least 10 characters';
        }

        try {
            new URL(values.imageUrl);
        } catch {
            errors.imageUrl = 'Invalid image URL';
        }

        const phoneRegex = /^[0-9]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!phoneRegex.test(values.contact) && !emailRegex.test(values.contact)) {
            errors.contact = 'Enter valid phone or email';
        }

        return errors;
    };

    const onSubmit = async (values) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        await request('POST', {
            ...values,
            _createdOn: Date.now()
        });
        navigate('/catalog');
    };

    const { values, errors, changeHandler, submitHandler } = useForm(
        {
            name: '',
            age: '',
            kind: '',
            description: '',
            imageUrl: '',
            contact: ''
        },
        validate,
        onSubmit
    );

    return (
        <>
            <div className="col-lg-6 col-12 mb-5 mx-auto" style={{ minHeight: '74vh' }}>
                <h2 className="tm-text-primary pt-5 mb-5 text-center">Add Pet Listing</h2>
                <form
                    id="add-pet-form"
                    action=""
                    method="POST"
                    className="tm-contact-form mx-auto"
                    onSubmit={submitHandler}
                    noValidate
                >
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            className="form-control rounded-0"
                            placeholder="Pet Name"
                            value={values.name}
                            onChange={changeHandler}
                        />
                        {errors.name && <p className="text-danger">{errors.name}</p>}
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            name="age"
                            className="form-control rounded-0"
                            placeholder="Age (in years)"
                            value={values.age}
                            onChange={changeHandler}
                        />
                        {errors.age && <p className="text-danger">{errors.age}</p>}
                    </div>
                    <div className="form-group">
                        <input
                            name="kind"
                            className="form-control rounded-0"
                            placeholder="Kind"
                            value={values.kind}
                            onChange={changeHandler}
                        />
                        {errors.kind && <p className="text-danger">{errors.kind}</p>}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="contact"
                            className="form-control rounded-0"
                            placeholder="0888.../email"
                            value={values.contact}
                            onChange={changeHandler}
                        />
                        {errors.contact && <p className="text-danger">{errors.contact}</p>}
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            rows="5"
                            className="form-control rounded-0"
                            placeholder="Short Description"
                            value={values.description}
                            onChange={changeHandler}
                        />
                        {errors.description && <p className="text-danger">{errors.description}</p>}

                    </div>
                    <div className="form-group">
                        <input
                            type="url"
                            name="imageUrl"
                            className="form-control rounded-0"
                            placeholder="Image URL"
                            value={values.imageUrl}
                            onChange={changeHandler}
                        />
                        {errors.imageUrl && <p className="text-danger">{errors.imageUrl}</p>}
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">
                            Add Pet
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
}
