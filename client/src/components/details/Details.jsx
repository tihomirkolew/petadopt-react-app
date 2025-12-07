import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

export default function Details() {
    const { petId } = useParams();
    const [pet, setPet] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch pet details using petId
        fetch(`http://localhost:3030/jsonstore/pets/${petId}`)
            .then(response => response.json())
            .then(result => setPet((result)))
            .then(console.log(pet))
            .catch(err => alert(err.message));
    }, [petId]);

    const deletePetHandler = () => {
        const isConfirmed = confirm(`Are you sure you want to delete "${pet.name}"`);

        if (!isConfirmed) {
            return;
        }

        try {
            fetch(`http://localhost:3030/jsonstore/pets/${petId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message); });
                }
                // Redirect to catalog or home page after deletion
                navigate('/');
            });
        } catch (error) {
            alert(error.message);
        }

    }

    if (!pet) {
        return (
            <div className="container-fluid tm-container-content tm-mt-60">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className="container-fluid tm-container-content tm-mt-40 tm-mb-60>" style={{ minHeight: '75vh' }}>
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-7 col-md-6 col-sm-12">
                        <img src={pet.imageUrl || "/images/image-placeholder.png"} alt="Image" className="img-fluid"
                            style={{ width: '93%', height: 'auto' }}
                        />
                    </div>

                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                        <div className="tm-bg-gray tm-video-details d-flex flex-column justify-content-between">
                            <div className="mb-4">
                                <div className="row mb-4">
                                    <h1 className="col-12 tm-text-primary">{pet.name}</h1>
                                </div>
                                <h3 className="tm-text-gray-dark mb-3">Age: <span className="tm-text-primary">{pet.age}</span></h3>

                                <div>
                                    <h3 className="tm-text-gray-dark mb-3">Kind: <span className="tm-text-primary">{pet.kind}</span></h3>
                                </div>
                                <p>{pet.description}</p>
                                <div>
                                    <h3 className="tm-text-gray-dark mb-3">Contact: <span className="tm-text-primary">{pet.contact}</span></h3>
                                </div>
                            </div>
                            {/* Action buttons */}
                            <div className="d-flex justify-content-center mt-4" style={{ gap: '6em', justifyContent: 'center' }}>
                                <Link to={`/pets/${petId}/edit`} className="btn btn-primary">Edit</Link>
                                <button onClick={deletePetHandler} className="btn btn-primary btn-primary-delete">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
