import { useRef, useState } from 'react'
import EnquireForm from '../animations/EnquireForm'
import './Navbar.css'

const navMenus = [
  {
    id: 'about-tis',
    label: 'About TIS',
    links: [
      'Our History',
      'Why Choose Us?',
      'Vision & Mission',
      'Awards & Achievements',
      "Headmaster's Profile",
      'Our Management',
      'Virtual Tour',
    ],
  },
  {
    id: 'academics',
    label: 'Academics',
    links: ['Early Years', 'Primary School', 'Middle School', 'Senior School', 'Curriculum'],
  },
  {
    id: 'admissions',
    label: 'Admissions',
    links: ['Admission Process', 'Apply Now', 'Fee Structure', 'Frequently Asked Questions'],
  },
  {
    id: 'campus-life',
    label: 'Campus Life',
    links: ['Facilities', 'Student Wellbeing', 'Clubs & Activities', 'School Events'],
  },
]


const Navbar = ({ isDarkMode, onToggleTheme }) => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isEnquireOpen, setIsEnquireOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const triggerRefs = useRef({})
  const navToggleRef = useRef(null)
  const enquireButtonRef = useRef(null)

  
  return (
    <div className="navbar-global">
      <div className="top-bar">
        <i className="fa-solid fa-phone" aria-hidden="true" />
        <a className="phone-number" href="tel:+919837983791">
          ADMISSIONS HELPLINE NO. +91-9837983791
        </a>
        <button
          ref={enquireButtonRef}
          className="enquire"
          type="button"
          onClick={() => setIsEnquireOpen(true)}
        >
          Enquire Now
        </button>
        <nav className="navbar-main-div-global md:bg-[rgba(19,19,19,0.22)]">
          <img
            src="https://tis.edu.in/_next/static/media/schoolLogo.95f6e121.png"
            alt="The International School logo"
            width="100"
            height="100"
            className="school-logo"
          />
          <div
            className={`navbar-list-main${isNavOpen ? ' is-open' : ''}`}
            id="primary-navigation"
            onKeyDown={(event) => {
              if (event.key === 'Escape' && isNavOpen) {
                setOpenMenu(null)
                setIsNavOpen(false)
                navToggleRef.current?.focus()
              }
            }}
          >
            {navMenus.map((menu) => {
              const isOpen = openMenu === menu.id
              const dropdownId = `nav-dropdown-${menu.id}`

              return (
                <div
                  className="main-list-item"
                  key={menu.id}
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse') setOpenMenu(menu.id)
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === 'mouse') setOpenMenu(null)
                  }}
                >
                  <button
                    ref={(element) => {
                      if (element) triggerRefs.current[menu.id] = element
                    }}
                    className="title dropdown-trigger"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={dropdownId}
                    onClick={() => setOpenMenu(menu.id)}
                  >
                    {menu.label}
                    <span className="dropdown-chevron" aria-hidden="true" />
                  </button>
                  {menu.id === 'about-tis' && (
                    <img
                      src="https://tis.edu.in/_next/static/media/yellowLine1.5c94b3b6.svg"
                      alt=""
                      className="yellow-line"
                    />
                  )}
                  {isOpen && (
                    <div
                      className="dropdown-container is-open"
                      id={dropdownId}
                      role="region"
                      aria-label={`${menu.label} links`}
                      onKeyDown={(event) => {
                        if (event.key === 'Escape') {
                          setOpenMenu(null)
                          triggerRefs.current[menu.id]?.focus()
                        }
                      }}
                    >
                      <div className="dropdown">
                        {menu.links.map((label) => (
                          <div className="listed-item" key={label}>
                            <a href="#">
                              <div className="title-arrow">
                                <p className="nested-link-title">{label}</p>
                              </div>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            aria-pressed={isDarkMode}
            onClick={onToggleTheme}
          >
            <span aria-hidden="true">{isDarkMode ? '☀' : '☾'}</span>
            <span className="theme-toggle-label">{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
          <button
            ref={navToggleRef}
            className="nav-menu-toggle"
            type="button"
            aria-label={isNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isNavOpen}
            aria-controls="primary-navigation"
            onClick={() => {
              setIsNavOpen((open) => !open)
              setOpenMenu(null)
            }}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>



          
        </nav>
      </div>
      {isEnquireOpen && (
        <EnquireForm
          onClose={() => {
            setIsEnquireOpen(false)
            enquireButtonRef.current?.focus()
          }}
        />
      )}
    </div>
  )
}

export default Navbar
