'use client'
import Image from "next/image"
import Link from "next/link"
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
 } from "reactstrap";
import { connect } from 'react-redux'
import { useRouter } from 'next/navigation';

import {Select} from "@/components/Select"

import { userActions } from '@/redux/actions/user';
import { useEffect } from "react";

function Sidebar({currentUser, logoutUser, changeCommunityUser}) {

    const router = useRouter();

    useEffect(() => {
        if (!currentUser) 
        router.push('/auth/login');
    }, [currentUser])

    const logout = async () => {
        await logoutUser();
     }
  
  
    const changeCommunity = (value) =>  {
        changeCommunityUser(value)
          .then((response) => {
           window.location.reload(false)
          })
          .catch((errors) => {
           console.log(errors)
          })
      }
  

    return (<div className="col-lg-2 d-flex flex-column flex-shrink-0 p-3 bg-light min-vh-100">
                    <Link href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <span className="fs-4">AdminOrg</span>
                    </Link>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item"><Link href="/cuentas-a-cobrar" className="nav-link active">Cuentas a cobrar</Link></li>
                        <li className=""><Link href="/cuentas-a-pagar" className="nav-link link-dark">Cuentas a pagar</Link></li>
                        <li><a href="#" className="nav-link link-dark">Tesoreria</a></li>
                        <li><a href="#" className="nav-link link-dark">Contabilidad</a></li>
                        <li><a href="#" className="nav-link link-dark">Configuraciones</a></li>
                    </ul>
                    <hr />


                    <UncontrolledDropdown nav inNavbar className="pr-1" direction="up">
                        <DropdownToggle nav className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle">
                            <Image src="/img/assistant.svg" alt="" width="32" height="32" className="rounded-circle me-2" />
                            <strong>{currentUser && currentUser.profile.nombre}</strong>
                        </DropdownToggle>


                        <DropdownMenu>
                            <DropdownItem disabled>
                                <span className="font-small-3">
                                {currentUser && currentUser.profile.nombre} <span className="text-muted">({currentUser && currentUser.user.group})</span>
                                </span>
                            </DropdownItem>
                            <DropdownItem divider />

                            {/* <Link to="/user-profile" className="p-0"> */}
                            <DropdownItem>
                                <i className="bi-person"></i> Ver Perfil
                            </DropdownItem>
                            {/* </Link> */}
                            {currentUser && currentUser.admin_of.length > 0 && <Select
                                name="comunidad"
                                id="comunidad"
                                classNamePrefix="select"
                                options={currentUser.admin_of.map(c => ({label: c, value: c}))}    
                                onChange={(option) => changeCommunity(option.value)}
                                value={currentUser.community}
                                />}
                            
                            {/* <Link disabled to="/faq" className="p-0"> */}
                            <DropdownItem disabled>
                                <i className="bi-bookmark"></i> Biblioteca y FAQ
                            </DropdownItem>
                            {/* </Link> */}
                            <DropdownItem divider />
                            <DropdownItem>
                                <div onClick={(event) => { logout() }} >
                                    <i className="bi-logout"></i> Logout
                                </div>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>


    </div>
    )
  }
  

  const mapStateToProps = (state) => ({
    currentUser: state.user.auth,
 });
 
 
 const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(userActions.logout()),
    changeCommunityUser: (community) => dispatch(userActions.changeCommunity(community))
 })
 

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);