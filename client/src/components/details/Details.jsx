import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Details() {
    const { petId } = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        // Fetch pet details using petId
        fetch(`http://localhost:3030/data/pets/${petId}`)
            .then(response => response.json())
            .then(result => setPet(result))
            .catch(err => alert(err.message));
    }, [petId]);

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
                <div className="row">
                    <div className="col-xl-8 col-lg-7 col-md-6 col-sm-12">
                        <img src={pet.imageUrl} alt="Image" className="img-fluid"
                            style={{ width: '90%', height: 'auto' }}
                        />
                    </div>

                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                        <div className="tm-bg-gray tm-video-details d-flex flex-column justify-content-between">
                            <div className="mb-4">
                                <div className="row mb-4">
                                    <h2 className="col-12 tm-text-primary">{pet.name}</h2>
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
                                <button className="btn btn-primary">Edit</button>
                                <button className="btn btn-primary btn-primary-delete">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
