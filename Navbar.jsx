import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ navOpen }) => {
    const lastActiveLink = useRef();
    const activeBox = useRef();

    const initActiveBox = () => {
        if (lastActiveLink.current && activeBox.current) {
            activeBox.current.style.top = lastActiveLink.current.offsetTop + 'px';
            activeBox.current.style.left = lastActiveLink.current.offsetLeft + 'px';
            activeBox.current.style.width = lastActiveLink.current.offsetWidth + 'px';
            activeBox.current.style.height = lastActiveLink.current.offsetHeight + 'px';
        }
    };

    useEffect(() => {
        initActiveBox();
        window.addEventListener('resize', initActiveBox);
        return () => {
            window.removeEventListener('resize', initActiveBox);
        };
    }, []);

    const activeCurrentLink = (event) => {
        lastActiveLink.current?.classList.remove('active');
        const clickedLink = event.target.closest('a');
        clickedLink.classList.add('active');
        lastActiveLink.current = clickedLink;

        activeBox.current.style.top = lastActiveLink.current.offsetTop + 'px';
        activeBox.current.style.left = lastActiveLink.current.offsetLeft + 'px';
        activeBox.current.style.width = lastActiveLink.current.offsetWidth + 'px';
        activeBox.current.style.height = lastActiveLink.current.offsetHeight + 'px';
    };

    const navItems = [
        {
            label: 'Home',
            link: '#home',
            icon: 'home',
            className: 'nav-link active',
            ref: lastActiveLink,
        },
        {
            label: 'About',
            link: '#about',
            icon: 'info',
            className: 'nav-link',
        },
        {
            label: 'Skills',
            link: '#skills',
            icon: 'school',
            className: 'nav-link',
        },
        {
            label: 'Projects',
            link: '#project',
            icon: 'work',
            className: 'nav-link',
        },
        {
            label: 'Contact',
            link: '#contact',
            icon: 'mail',
            className: 'nav-link md:hidden',
        },
    ];

    return (
        <nav className={'navbar ' + (navOpen ? 'active' : '')}>
            {navItems.map(({ label, link, icon, className }, key) => (
                <a
                    href={link}
                    key={key}
                    ref={key === 0 ? lastActiveLink : null}
                    className={className}
                    onClick={activeCurrentLink}
                >
                    <span className="material-symbols-rounded">{icon}</span>
                    {label}
                </a>
            ))}
            <div className="active-box" ref={activeBox}></div>
        </nav>
    );
};

Navbar.propTypes = {
    navOpen: PropTypes.bool.isRequired,
};

export default Navbar;