import { Link } from "react-router";
import styles from './PetCard.module.css'

export default function PetCard({
    _id,
    name,
    imageUrl,
    _createdOn,
    zoomEffect,
}) {
    const createdDate = new Date(_createdOn).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return (
        <>
            <div className={`col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-5 ${styles["btr-image"]} ${zoomEffect || ""}`}>
                <figure className="effect-ming tm-video-item">
                    <img
                        src={imageUrl || "/images/image-placeholder.png"}
                        alt={name}
                        className={`${styles["img-fluid"]}`}
                    />
                    <figcaption className="d-flex align-items-center justify-content-center">
                        <h2 className="col-6 tm-text-primary">{name}</h2>
                        <Link to={`/pets/${_id}/details`}>View more</Link>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">{createdDate}</span>
                </div>
            </div>
        </>
    );
}
