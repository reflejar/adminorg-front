import Image from "next/image"
import Link from "next/link"

export default function Sidebar() {
    return (<div className="col-lg-2 d-flex flex-column flex-shrink-0 p-3 bg-light min-vh-100">
                    <Link href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <span className="fs-4">AdminOrg</span>
                    </Link>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item"><Link href="/cuentas-a-cobrar" className="nav-link active">Cuentas a cobrar</Link></li>
                        <li className=""><Link href="/cuentas-a-pagar" className="nav-link link-dark">Cuentas a pagar</Link></li>
                        <li><a href="#" className="nav-link link-dark">Cuentas a Pagar</a></li>
                        <li><a href="#" className="nav-link link-dark">Tesoreria</a></li>
                        <li><a href="#" className="nav-link link-dark">Contabilidad</a></li>
                        <li><a href="#" className="nav-link link-dark">Configuraciones</a></li>
                    </ul>
                    <hr />
                    <div className="dropdown">
                    <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <Image src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>mdo</strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                    </div>
    </div>
    )
  }
  