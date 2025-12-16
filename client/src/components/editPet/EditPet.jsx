import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserContext from "../../contexts/UserContext";
import usePetRequest from "../../hooks/usePetRequest";

export default function EditPet() {
    const navigate = useNavigate();
    const { petId } = useParams();

    const [values, setValues] = useState({
        name: '',
        age: '',
        kind: '',
        contact: '',
        description: '',
        imageUrl: ''
    });

    const [errors, setErrors] = useState({});

    const { fetchedData: pet, request: petRequest } =
        usePetRequest(`http://localhost:3030/data/pets/${petId}`);

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
    }, [pet]);

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

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

        try {
            new URL(values.imageUrl);
        } catch {
            errors.imageUrl = 'Invalid image URL';
        }

        return errors;
    };

    const editPetHandler = async (e) => {
        e.preventDefault();

        const validationErrors = validate(values);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        await petRequest('PUT', {
            ...pet,
            ...values,
        });

        navigate(`/pets/${petId}/details`);
    };

    return (
        <>
            <div className="col-lg-6 col-12 mb-5 mx-auto" style={{ minHeight: '74vh' }}>
                <h2 className="tm-text-primary pt-5 mb-5 text-center">
                    Edit {pet?.name}'s Listing
                </h2>
                <form onSubmit={editPetHandler} id="add-pet-form" action="" method="POST" className="tm-contact-form mx-auto">
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            className="form-control rounded-0"
                            placeholder="Pet Name"
                            value={values.name}
                            onChange={onChange}
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
                            onChange={onChange}
                        />
                        {errors.age && <p className="text-danger">{errors.age}</p>}
                    </div>
                    <div className="form-group">
                        <input
                            name="kind"
                            className="form-control rounded-0"
                            placeholder="Kind"
                            value={values.kind}
                            onChange={onChange}
                        />
                        {errors.kind && <p className="text-danger">{errors.kind}</p>}
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="contact"
                            className="form-control rounded-0"
                            value={values.contact}
                            onChange={onChange}
                            placeholder="0888.../email"
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
                            onChange={onChange}
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
                            onChange={onChange}
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
