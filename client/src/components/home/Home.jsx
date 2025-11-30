export default function Home() {
    return (
        <>
            <div className="container-fluid tm-container-content tm-mt-60"
                style={{ minHeight: '73vh' }}>
                {/* Page title */}
                <div className="row mb-4">
                    <h2 className="col-6 tm-text-primary">
                        Latest Listings
                    </h2>
                </div>

                {/* Items */}
                <div className="row tm-mb-90 tm-gallery" style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    gap: "1rem"
                }}>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-5 zoom-effect">
                        <figure className="effect-ming tm-video-item">
                            <img src="/images/img-05.jpg" alt="Image" className="img-fluid" />
                            <figcaption className="d-flex align-items-center justify-content-center">
                                <h2 className="col-6 tm-text-primary">Clocks</h2>
                                <a href="photo-detail.html">View more</a>
                            </figcaption>
                        </figure>
                        <div className="d-flex justify-content-between tm-text-gray">
                            <span className="tm-text-gray-light">18 Oct 2020</span>
                            {/* <span>9,906 views</span> */}
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5 zoom-effect">
                        <figure className="effect-ming tm-video-item">
                            <img src="/images/img-05.jpg" alt="Image" className="img-fluid" />
                            <figcaption className="d-flex align-items-center justify-content-center">
                                <h2 className="col-6 tm-text-primary">Clocks</h2>
                                <a href="photo-detail.html">View more</a>
                            </figcaption>
                        </figure>
                        <div className="d-flex justify-content-between tm-text-gray">
                            <span className="tm-text-gray-light">18 Oct 2020</span>
                            {/* <span>9,906 views</span> */}
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5 zoom-effect">
                        <figure className="effect-ming tm-video-item">
                            <img src="/images/img-05.jpg" alt="Image" className="img-fluid" />
                            <figcaption className="d-flex align-items-center justify-content-center">
                                <h2 className="col-6 tm-text-primary">Clocks</h2>
                                <a href="photo-detail.html">View more</a>
                            </figcaption>
                        </figure>
                        <div className="d-flex justify-content-between tm-text-gray">
                            <span className="tm-text-gray-light">18 Oct 2020</span>
                            {/* <span>9,906 views</span> */}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
