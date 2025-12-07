import { useEffect, useState } from "react";
import PetCard from "../petCard/PetCard";

export default function Catalog() {

    const [pets, setPets] = useState([]);

    // const searchParams = encodeURIComponent('_createdOn');

    // useEffect(() => {
    //     fetch(`http://localhost:3030/data/pets?sortBy=${searchParams}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setPets(data);
    //         })
    //         .catch(err => {
    //             console.error('Error fetching latest pets:', err);
    //         });

    // }, [searchParams]);

    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/pets")
            .then(response => response.json())
            .then(data => {
                // jsonstore returns an object keyed by id, so convert to array
                const petsArray = Object.values(data);

                // sort manually by _createdOn descending
                const sortedPets = petsArray.sort((a, b) => a._createdOn - b._createdOn);

                // take the latest 3
                setPets(sortedPets);                
            })
            .catch(err => {
                console.error("Error fetching latest pets:", err);
            });
    }, []);

    return (
        <>
            <div className="tm-container-content"
                style={{
                    minHeight: '75vh',
                    margin: '60px 60px 0px 60px',
                    marginTop: '40px',
                }}>
                {/* Page title */}
                <div className="row mb-4">
                    <h2 className="col-6 tm-text-primary">
                        All Listings
                    </h2>
                </div>

                {/* Items */}
                <div className="row tm-mb-90 tm-gallery" style={{
                    display: "flex",
                    overflowY: "scroll",
                    maxHeight: "64vh",
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
