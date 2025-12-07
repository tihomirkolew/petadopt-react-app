import { Link } from "react-router";

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
            <div className={`col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-5 btr-image ${zoomEffect || ""}`}>
                <figure className="effect-ming tm-video-item">
                    <img src={imageUrl} alt="Image" className="img-fluid" />
                    <figcaption className="d-flex align-items-center justify-content-center">
                        <h2 className="col-6 tm-text-primary">{name}</h2>
                        <Link to={`/pets/${_id}/details`}>View more</Link>
                    </figcaption>
                </figure>
                <div className="d-flex justify-content-between tm-text-gray">
                    <span className="tm-text-gray-light">{createdDate}</span>
                    {/* <span>9,906 views</span> */}
                </div>
            </div>
        </>
    );
}
