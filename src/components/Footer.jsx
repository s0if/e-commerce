import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import './Footer.css'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="  bg-f">
      <footer className="text-center text-lg-start" >
        <div className="container d-flex justify-content-center py-5">
          <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#54456b' }}>
            <Link to='https://www.facebook.com/saifaldin.alkomi'> <i className="bi bi-facebook"></i></Link>
          </button>
          <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#54456b' }}>
            <Link to='https://wa.me/qr/X5J7RTHY7QFUI1'><i className="bi bi-whatsapp" /></Link>
          </button>
          <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#54456b' }}>
            <Link to='https://www.instagram.com/saif.aldin_03/'><i className="bi bi-instagram" /></Link>
          </button>
          <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#54456b' }}>
            <Link to='https://www.linkedin.com/in/saif-aldin-komi-1b9523251/'><i className="bi bi-linkedin" /></Link>
          </button>
        </div>
        <div className="text-center text-white p-3 bg-dark opacity-50">
          © 2024 Copyright:
          <a className="text-white" href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJfpsSShxckVnKHRxrKjDFmvsPrlQDvCBLgDXNmsGPZKGQrPxMJHGplGtPWWHGnmvnzcNVq"> saifaldin komi</a>
        </div>
      </footer>
    </div>

  )
}

export default Footer
