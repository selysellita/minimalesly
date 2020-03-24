import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { FaFacebook,FaTwitter,FaInstagram} from 'react-icons/fa';


export const Footer=()=>{
    return (
        <MDBFooter color="black" className="font-small pt-4 mt-4 testfooter">
            <MDBContainer fluid className="text-center text-md-left">
                <MDBRow>
                    <MDBCol md="3">
                        <h5 className="title">Our Products</h5>
                        <ul className='p-0'>
                        <li className="list-unstyled">
                            <a href="#!">Man</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Woman</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Kids</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Pets</a>
                        </li>
                        </ul>
                    </MDBCol>
                    <MDBCol md="3">
                        <h5 className="title">Information</h5>
                        <ul className='p-0'>
                        <li className="list-unstyled">
                            <a href="#!">About Us</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Contact Us</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Privacy Policy</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">Terms &amp; Conditions</a>
                        </li>
                        </ul>
                    </MDBCol>
                    <MDBCol md="3">
                        <h5 className="title">Quick Shop</h5>
                        <ul className='p-0'>
                        <li className="list-unstyled">
                            <a href="#!">Best Seller</a>
                        </li>
                        <li className="list-unstyled">
                            <a href="#!">New Arrival</a>
                        </li>
                        </ul>
                        <h5 className="title">Customer Care</h5>
                        <ul className='p-0'>
                        <li className="list-unstyled">
                            <a href="#!">wecandoit@kitabisa.com</a>
                        </li>
                        </ul>
                    </MDBCol>
                    <MDBCol md="3">
                        <h5 className="title">Newsletter Subscription</h5>
                        <input type='text'placeholder='your email'/> &nbsp;
                        <button className='rounded 20%' color='black'>SUBSCRIBE</button>
                        <br/><br/>
                        <h5 className="title">Follow Us</h5>
                        <p>
                        <FaFacebook/> &nbsp; <FaTwitter/> &nbsp;<FaInstagram/>
                        </p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright: <a href='/'> minimales.com </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    )
}