import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useUserContext } from "../../contexts/UserContext";
import usePetRequest from "../../hooks/usePetRequest";
import useForm from "../../hooks/useForm";
import styles from './EditPet.module.css';

export default function EditPet() {
    const navigate = useNavigate();
    const { isAuthenticated } = useUserContext();
    const { petId } = useParams();

    const { fetchedData: pet, request: petRequest } =
        usePetRequest(`http://localhost:3030/data/pets/${petId}`);

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

        const phoneRegex = /^[0-9]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!phoneRegex.test(values.contact) && !emailRegex.test(values.contact)) {
            errors.contact = 'Enter valid phone or email';
        }

        if (values.description.trim().length < 10) {
            errors.description = 'Description must be at least 10 characters';
        }

        if (values.description.trim().length > 700) {
            errors.description = 'Description too long'
        }

        try {
            new URL(values.imageUrl);
        } catch {
            errors.imageUrl = 'Invalid image URL';
        }

        return errors;
    };

    const onSubmit = async (values) => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        await petRequest('PUT', {
            ...pet,
            ...values
        });
        navigate(`/pets/${petId}/details`);
    };

    const { values, errors, changeHandler, submitHandler, setValues } = useForm(
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

    useEffect(() => {
        if (pet) {
            setValues({
                name: pet.name || '',
                age: pet.age || '',
                kind: pet.kind || '',
                contact: pet.contact || '',
                description: pet.description || '',
                imageUrl: pet.imageUrl || ''
            });
        }
    }, [pet, setValues]);

    return (
        <>
            <div className={`col-lg-6 col-12 mb-5 mx-auto ${styles.height}`}>
                <h2 className="tm-text-primary pt-5 text-center">
                    Edit {pet?.name}'s Listing
                </h2>
                <form onSubmit={submitHandler} id="add-pet-form" action="" method="POST" className="tm-contact-form mx-auto" noValidate>
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
                            value={values.contact}
                            onChange={changeHandler}
                            placeholder="0888.../email"
                        />
                        {errors.contact && <p className="text-danger">{errors.contact}</p>}
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            rows="5"
                            className={`form-control rounded-0 ${styles["textarea-height"]}`}
                            placeholder="Short Description"
                            value={values.description}
                            onChange={changeHandler}
                        />
                        {errors.description && (
                            <p className="text-danger">{errors.description}</p>
                        )}
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
                            Edit Pet
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
