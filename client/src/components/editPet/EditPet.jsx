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

    // get pet details
    const { fetchedData: pet, petRequest } = usePetRequest(`http://localhost:3030/data/pets/${petId}`);

    useEffect(() => {
        if (pet) {
            setValues(pet)
        }
    }, [pet] );

    const editPetHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const updatedPetData = Object.fromEntries(formData);

        const data = {
            ...pet,
            ...updatedPetData,
        };

        petRequest('PUT', data);
        navigate(`/pets/${petId}/details`);
    }

    return (
        <>
            <div className="col-lg-6 col-12 mb-5 mx-auto" style={{ minHeight: '74vh' }}>
                <h2 className="tm-text-primary pt-5 mb-5 text-center">Edit {pet?.name}'s Listing</h2>
                <form onSubmit={editPetHandler} id="add-pet-form" action="" method="POST" className="tm-contact-form mx-auto">
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            className="form-control rounded-0"
                            placeholder="Pet Name"
                            defaultValue={values?.name}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            name="age"
                            className="form-control rounded-0"
                            placeholder="Age (in years)"
                            defaultValue={values?.age}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            name="kind"
                            className="form-control rounded-0"
                            placeholder="Age (in years)"
                            defaultValue={values?.kind}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="contact"
                            className="form-control rounded-0"
                            defaultValue={values?.contact}
                            placeholder="0888.../email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            rows="5"
                            className="form-control rounded-0"
                            placeholder="Short Description"
                            defaultValue={values?.description}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <input
                            type="url"
                            name="imageUrl"
                            className="form-control rounded-0"
                            placeholder="Image URL"
                            defaultValue={values?.imageUrl}
                            required
                        />
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">Edit Pet</button>
                    </div>
                </form>
            </div>
        </>
    );
}
