import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { useUserContext } from "../../contexts/UserContext";
import usePetRequest from "../../hooks/usePetRequest";
import styles from './Details.module.css'

export default function Details() {
    const { user } = useUserContext();
    const { petId } = useParams();

    const navigate = useNavigate();

    const { fetchedData: pet, request: petRequest } = usePetRequest(
        `http://localhost:3030/data/pets/${petId}`
    );

    const { fetchedData: allLikes, request: likesRequest } = usePetRequest(
        `http://localhost:3030/data/likes`
    );

    const [petLikes, setPetLikes] = useState([]);

    useEffect(() => {
        if (allLikes && Array.isArray(allLikes)) {
            const filtered = allLikes.filter(like => like.petId === petId);
            setPetLikes(filtered);
        }
    }, [allLikes, petId]);

    const hasLiked = petLikes.some(like => like._ownerId === user?._id);

    const deletePetHandler = async () => {
        const isConfirmed = confirm(`Are you sure you want to delete "${pet.name}"`);
        if (!isConfirmed) return;

        try {
            await petRequest('DELETE');
            navigate('/catalog');
        } catch (error) {
            alert(error.message);
        }
    };

    const toggleLikeHandler = async () => {
        if (!user) {
            alert('You must be logged in to like a pet.');
            navigate('/login');
            return;
        }

        const existingLike = petLikes.find(like => like._ownerId === user._id)

        if (existingLike) {

            try {
                // Remove like
                await likesRequest('DELETE', null, `${existingLike._id}`);
                setPetLikes(petLikes.filter(like => like._id !== existingLike._id));
                console.log(`User: ${user._id} has
                    unliked pet: ${petId} and
                    deleted like: ${existingLike._id} `);

            } catch (error) {
                alert(error.message);
            }
        } else {

            try {
                // Add like
                const newLike = await likesRequest('POST', { petId })
                setPetLikes([...petLikes, newLike])
                console.log(`User: ${user._id} has 
                    liked pet: ${petId} with 
                    like: ${newLike._id}`);

            } catch (error) {
                alert(error.message);
            }
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
            <div className={`container-fluid tm-container-content tm-mt-40 tm-mb-60 ${styles.height}`}>
                <div className="row justify-content-center" >
                    <div className="col-xl-8 col-lg-7 col-md-6 col-sm-12">
                        <img src={pet.imageUrl || "/images/image-placeholder.png"}
                            alt="Image"
                            className={`img-fluid ${styles["smaller-images"]}`}
                            // style={{ width: '93%', height: 'auto' }}
                        />
                    </div>

                    <div className={`col-xl-4 col-lg-5 col-md-6 col-sm-12 ${styles.info}`}>
                        <div className="tm-bg-gray tm-video-details d-flex flex-column justify-content-between">
                            <div className={`mb-4 ${styles["details-body"]}`}>
                                <div className="row mb-4">
                                    <h1 className="col-12 tm-text-primary">{pet?.name}</h1>
                                </div>
                                <h3 className="tm-text-gray-dark mb-3">Age: <span className="tm-text-primary">{pet?.age}</span></h3>

                                <div>
                                    <h3 className="tm-text-gray-dark mb-3">Kind: <span className="tm-text-primary">{pet?.kind}</span></h3>
                                </div>
                                <p className={styles.description}>{pet?.description}</p>
                                <div>
                                    <h3 className="tm-text-gray-dark">Contact: <span className="tm-text-primary">{pet?.contact}</span></h3>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-4">
                                <div className="d-flex justify-content-start">
                                    <button
                                        onClick={toggleLikeHandler}
                                        className={`btn ${hasLiked ? 'btn-primary-likes' : 'btn-outline-primary'}`}
                                        style={{ width: '80px', padding: '10px 0' }}
                                    >
                                        <i className={`fas fa-heart ${hasLiked ? 'text-light' : ''}`}></i> {petLikes.length}
                                    </button>
                                </div>
                                {user && user?._id === pet?._ownerId && (
                                    <>
                                        <Link
                                            to={`/pets/${petId}/edit`}
                                            className="btn btn-primary"
                                            style={{ width: '139px' }}
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={deletePetHandler}
                                            className="btn btn-primary btn-primary-delete"
                                            style={{ width: '139px', textAlign: 'center' }}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
