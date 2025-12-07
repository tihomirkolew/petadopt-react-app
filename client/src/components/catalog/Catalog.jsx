import { useEffect, useState } from "react";
import PetCard from "../petCard/PetCard";

export default function Catalog() {

    const [pets, setPets] = useState([]);

    const searchParams = encodeURIComponent('_createdOn desc');

    useEffect(() => {
        fetch(`http://localhost:3030/data/pets?sortBy=${searchParams}`)
            .then(res => res.json())
            .then(data => {
                setPets(data);
            })
            .catch(err => {
                console.error('Error fetching latest pets:', err);
            });

    }, [searchParams]);

    return (
        <>
            <div className="container-fluid tm-container-content tm-mt-60"
                style={{ minHeight: '78vh' }}>
                {/* Page title */}
                <div className="row mb-4">
                    <h2 className="col-6 tm-text-primary">
                        All Listings
                    </h2>
                </div>

                {/* Items */}
                <div className="row tm-mb-90 tm-gallery" style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    gap: "1rem"
                }}>
                    {pets.length > 0 ? (
                        pets.map(pet => <PetCard key={pet._id} {...pet} />)
                    ) : (
                        <p>No pets found.</p>
                    )}
                </div>
            </div>
        </>
    );
}
