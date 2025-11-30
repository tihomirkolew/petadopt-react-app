export default function Header() {
    return (
        <>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    {/* Home */}
                    <a class="navbar-brand" href="index.html">
                        <i class="fas fa-film mr-2"></i>
                        Pet Adopt
                    </a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-bars"></i>
                    </button>
                    
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link nav-link-1" aria-current="page" href="">Catalog</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-link-2" href="videos.html">Add listing</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-link-4" href="contact.html">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-link-4" href="contact.html">Register</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-link-3" href="about.html">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
