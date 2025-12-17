import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className="tm-bg-gray pt-4 pb-2 tm-text-gray tm-footer">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 px-5 mb-3 mb-lg-0">
                        <h3 className={`tm-text-primary tm-footer-title ${styles.lineheight}`}>
                            🌍 Together, we make tails wag.
                        </h3>
                    </div>

                    <div className="col-lg-6 col-md-12 px-5">
                        <ul className="tm-social-links d-flex justify-content-lg-end justify-content-start flex-wrap gap-3 pl-0 mb-0">
                            <li><a href="https://www.four-paws.bg/nashata-rabota/napravleniya/osinovi-ot-chetiri-lapi"><i className="fab fa-facebook"></i></a></li>
                            <li><a href="https://www.1500doggang.com/adopt"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="https://www.pets-adoption.com/bg_%D0%9E%D0%B1%D1%8F%D0%B2%D0%B8.html"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="https://arsofia.com/osinovyavane/"><i className="fab fa-pinterest"></i></a></li>
                        </ul>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-7 col-12 px-5 mb-2">
                        © 2025 Pet Adopt Company. All rights reserved.
                    </div>
                    <div className="col-md-5 col-12 px-5 text-md-end text-right">
                        Designed by <a href="https://templatemo.com" className="tm-text-gray" rel="sponsored" target="_parent">TemplateMo</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
