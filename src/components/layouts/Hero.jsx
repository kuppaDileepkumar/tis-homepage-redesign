import { useRef, useState } from 'react'
import EnquireForm from '../animations/EnquireForm'
import './hero.css'

const Hero = () => {
  const [isEnquireOpen, setIsEnquireOpen] = useState(false)
  const enquireButtonRef = useRef(null)

  return (
    <main className="contact-hero">
      <div className="contact-hero-inner">
        <section className="contact-intro" aria-labelledby="contact-heading">
          <p className="contact-eyebrow">Tulas International School · Dehradun</p>
          <h1 id="contact-heading">Contact Us</h1>
          <p className="contact-lead">
            We’d love to hear from you. Get in touch with our team or enquire about admissions.
          </p>
          <button
            ref={enquireButtonRef}
            className="contact-enquire-button"
            type="button"
            onClick={() => setIsEnquireOpen(true)}
          >
            Enquire Now!
            <span aria-hidden="true">↗</span>
          </button>
          <p className="contact-availability">Our admissions team is ready to help.</p>
        </section>

        <section className="contact-card" aria-label="School contact information">
          <div className="contact-card-heading">
            <span className="contact-card-mark" aria-hidden="true">T</span>
            <div>
              <p className="contact-card-label">Let’s connect</p>
              <h2>Tulas International School</h2>
            </div>
          </div>

          <div className="contact-details">
            <a className="contact-detail" href="tel:+919837983791">
              <span className="contact-detail-icon" aria-hidden="true">↗</span>
              <span>
                <span className="contact-detail-label">Admission Helpline</span>
                +91-98379 83791
              </span>
            </a>
            <a className="contact-detail" href="mailto:info@tis.edu.in">
              <span className="contact-detail-icon" aria-hidden="true">@</span>
              <span>
                <span className="contact-detail-label">Email</span>
                info@tis.edu.in
              </span>
            </a>
            <div className="contact-detail">
              <span className="contact-detail-icon" aria-hidden="true">⌖</span>
              <span>
                <span className="contact-detail-label">Visit our campus</span>
                <a
                  className="contact-address"
                  href="https://www.google.com/maps/place/Tula's+International+School+-+Best+Boarding+School+in+Dehradun+(Uttarakhand)/@30.3430336,77.8865903,17z/data=!3m1!4b1!4m6!3m5!1s0x390f2a8f6621db6d:0xb5df8a7bd77caf7d!8m2!3d30.3430336!4d77.8891652!16s%2Fm%2F0121_pmh?entry=ttu"
                  target="_blank"
                  rel="noreferrer"
                >
                  Dhoolkot, P.O – Selaqui, Chakrata Road,
                  <br />
                  Dehradun-248011 (Uttarakhand)
                </a>
              </span>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-icon" aria-hidden="true">☎</span>
              <span>
                <span className="contact-detail-label">Landline</span>
                <a className="contact-phone" href="tel:+911352699444">0135-2699444</a>
                <span className="contact-phone-separator"> · </span>
                <a className="contact-phone" href="tel:+911352699666">0135-2699666</a>
              </span>
            </div>
          </div>
          <div className="contact-card-footer">
            <span>We look forward to welcoming you.</span>
            <span aria-hidden="true">✳</span>
          </div>
        </section>
      </div>
      <div className="contact-decoration contact-decoration-one" aria-hidden="true" />
      <div className="contact-decoration contact-decoration-two" aria-hidden="true" />

      {isEnquireOpen && (
        <EnquireForm
          onClose={() => {
            setIsEnquireOpen(false)
            enquireButtonRef.current?.focus()
          }}
        />
      )}
    </main>
  )
}

export default Hero
