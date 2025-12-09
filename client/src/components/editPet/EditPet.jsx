import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserContext from "../../contexts/UserContext";

export default function EditPet() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { petId } = useParams();
    const [pet, setPet] = useState(null);
    const [values, setValues] = useState({
        name: '',
        age: '',
        kind: '',
        contact: '',
        description: '',
        imageUrl: ''
    });

    // get pet details
    useEffect(() => {
        fetch(`http://localhost:3030/data/pets/${petId}`)
            .then(response => response.json())
            .then(result => {
                setPet((result))
                setValues(result)
            })
            .catch(err => alert(err.message))
    }, [petId]);

    const editPetHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const updatedPetData = Object.fromEntries(formData);

        const data = {
            ...pet,
            ...updatedPetData,
        };

        try {
            const response = await fetch(`http://localhost:3030/data/pets/${petId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "X-Authorization": user?.accessToken,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                alert('Error editing pet');
                return;
            }

            const result = await response.json();
            console.log('Pet edited successfully:', result);
            setPet(result);
            alert(`Successfully edited ${result.name}'s listing!`);

            navigate(`/pets/${petId}/details`);
        } catch (error) {
            alert(error.message);
        }
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
