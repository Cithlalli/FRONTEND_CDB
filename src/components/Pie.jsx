import React from 'react';
import './Pie.css'; // Archivo CSS para los estilos

function Pie() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} MI ESTILO. Todos los derechos reservados.</p>
        <div className="social-media">
          <a href="https://www.facebook.com/share/p/1E82A3YhB1/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/iveet_h?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div className="contact-info">
          <a href="mailto:iveethernandez@yahoo.com" target="_blank" rel="noopener noreferrer" className="contact-item">
            <i className="fas fa-envelope"></i> iveethernandez@yahoo.com
          </a>
          <a
            href="https://maps.app.goo.gl/UXV5GQfpDhYNjXrZ6"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <i className="fas fa-map-marker-alt"></i> Rancho Grande 228, Rancho Grande, 88610 Reynosa, Tamps.
          </a>
          <a href="tel:+899 495 4652" target="_blank" rel="noopener noreferrer" className="contact-item">
            <i className="fas fa-phone"></i> +899 495 4652
          </a>
          <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwalink.co%2F2205cc%3Ffbclid%3DIwZXh0bgNhZW0CMTAAAR2ShblNQpsReVknVpep8AzuBhHAinnrGgTWPE-HImrr9GdNCW7VdP9L5PQ_aem_hfxqRIfnYwM-2WP4cQTeeg&h=AT34fiStrjsEhYxQylDCbcAFfYcY9Y08N5NU0C0TKPLOeMvM0844rdQoDgZ8reVm21GuEK4QQ6T7Z2V_sviFRa4oyoRv0cVPQ-3B1mKmeW7E3M-u0exhOZFqjZPwLGOpy6Gvmg" target="_blank" rel="noopener noreferrer" className="contact-item">
            <i className="fab fa-whatsapp"></i> +899 495 4652
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Pie;
