import './footer.css'

const footerLinks = [
  [
    { label: 'FAQ', href: 'https://tis.edu.in/faq/' },
    { label: 'Calendar', href: 'https://tis.edu.in/MandatoryPDF/TIS_CALENDAR_2024__PDF.pdf' },
    { label: 'Brochure', href: 'https://tis.edu.in/MandatoryPDF/TIS_BROCHURE.pdf' },
  ],
  [
    { label: 'Privacy Policy', href: 'https://tis.edu.in/privacy-policy/' },
    { label: 'Terms & Conditions', href: 'https://tis.edu.in/terms-conditions/' },
    { label: 'Disclaimer', href: 'https://tis.edu.in/disclaimer/' },
  ],
  [
    { label: 'Disciplinary Policy', href: 'https://tis.edu.in/MandatoryPDF/DisciplinaryPolicy.pdf' },
    { label: 'Mobile Phone Policy', href: 'https://tis.edu.in/MandatoryPDF/MobilePhonePolicy.pdf' },
    {
      label: 'Child Welfare & Safety Policy',
      href: 'https://tis.edu.in/MandatoryPDF/childWelfarePolicy.pdf',
    },
  ],
]

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div className="footer-cta-copy">
          <span className="footer-eyebrow">Tulas International School</span>
          <h2>Discover life at Tulas.</h2>
          <p>Explore our campus or take the next step in your child’s admission journey.</p>
        </div>
        <div className="footer-actions">
          <a className="footer-cta-link footer-cta-link-light" href="https://tis.edu.in/virtual-tour/">
            Virtual Tour <span aria-hidden="true">↗</span>
          </a>
          <a className="footer-cta-link" href="https://tis.edu.in/admissions/">
            Apply Now <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-brand">
          <a className="footer-logo-link" href="https://tis.edu.in/" aria-label="Tulas International School home">
            <img
              src="https://tis.edu.in/_next/static/media/footer-logo.230b79ff.png"
              alt="Tulas International School"
              width="100"
              height="100"
              className="footer-logo"
            />
          </a>
          <h2 className="footer-school-name">Tulas International School</h2>
          <a
            className="footer-address"
            href="https://www.google.com/maps/place/Tula's+International+School+-+Best+Boarding+School+in+Dehradun+(Uttarakhand)/@30.3430336,77.8865903,17z/data=!3m1!4b1!4m6!3m5!1s0x390f2a8f6621db6d:0xb5df8a7bd77caf7d!8m2!3d30.3430336!4d77.8891652!16s%2Fm%2F0121_pmh?entry=ttu"
            target="_blank"
            rel="noreferrer"
          >
            Dhoolkot, P.O – Selaqui, Chakrata Road,
            <br />
            Dehradun-248011 (Uttarakhand)
          </a>
          <div className="footer-contact-list">
            <a href="tel:+911352699444">Landline: 0135-2699444</a>
            <a href="tel:+911352699666">0135-2699666</a>
            <a href="tel:+919837983791">Admission Helpline: +91-9837983791</a>
            <a href="mailto:info@tis.edu.in">info@tis.edu.in</a>
          </div>
        </div>

        {footerLinks.map((group, index) => (
          <nav className="footer-column" aria-label={`School information ${index + 1}`} key={index}>
            <ul>
              {group.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer-bottom">
        <p>Copyright © {new Date().getFullYear()} Tulas International School, Dehradun | All Rights Reserved</p>
        <a href="https://tis.fedena.com/" target="_blank" rel="noreferrer">
          Fedena Login <span aria-hidden="true">↗</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
