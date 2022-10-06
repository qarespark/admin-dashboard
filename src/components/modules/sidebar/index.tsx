import { useAppSelector } from 'hooks/useAppSelector'
import React from 'react'
import { Link } from 'react-router-dom'
import { getCurrentRoute } from 'redux/selectors'

const GupshupIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor"></rect>
    <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor"></rect>
    <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor"></rect>
    <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor"></rect>
</svg>

const OnboardingIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="currentColor"></path>
    <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="currentColor"></path>
</svg>

const LogoutIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect opacity="0.3" width="12" height="2" rx="1" transform="matrix(-1 0 0 1 15.5 11)" fill="currentColor"></rect>
    <path d="M13.6313 11.6927L11.8756 10.2297C11.4054 9.83785 11.3732 9.12683 11.806 8.69401C12.1957 8.3043 12.8216 8.28591 13.2336 8.65206L16.1592 11.2526C16.6067 11.6504 16.6067 12.3496 16.1592 12.7474L13.2336 15.3479C12.8216 15.7141 12.1957 15.6957 11.806 15.306C11.3732 14.8732 11.4054 14.1621 11.8756 13.7703L13.6313 12.3073C13.8232 12.1474 13.8232 11.8526 13.6313 11.6927Z" fill="currentColor"></path>
    <path d="M8 5V6C8 6.55228 8.44772 7 9 7C9.55228 7 10 6.55228 10 6C10 5.44772 10.4477 5 11 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H11C10.4477 19 10 18.5523 10 18C10 17.4477 9.55228 17 9 17C8.44772 17 8 17.4477 8 18V19C8 20.1046 8.89543 21 10 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H10C8.89543 3 8 3.89543 8 5Z" fill="currentColor"></path>
</svg>

function SidebarComponent() {

    const currentPage = useAppSelector(getCurrentRoute);
    return (
        <div className='sidebar-container'>
            <div className='nav-logo-wrap'>
                <img src="https://i0.wp.com/respark.in/wp-content/uploads/2021/12/respark-logo-02.jpg?w=535&ssl=1" />
            </div>
            <div className='nav-wrap'>
                <Link to="/onboarding-dashboard">
                    <div className={`nav-item ${(currentPage.pathname == '/onboarding-dashboard' || currentPage.pathname == '/') ? 'active' : ''}`}>
                        <OnboardingIcon />
                        <div className='tooltip-wrap'><div className='tooltip-text'>Onboarding Dashboard</div></div>
                    </div>
                </Link>
                <Link to="/gupshup-dashboard">
                    <div className={`nav-item ${currentPage.pathname == '/gupshup-dashboard' ? 'active' : ''}`}>
                        <GupshupIcon />
                        <div className='tooltip-wrap'><div className='tooltip-text'>Gupshup Dashboard</div></div>
                    </div>
                </Link>
            </div>
            <div className='nav-wrap nav-footer-wrap'>
                <div className='nav-item'>
                    <LogoutIcon />
                    <div className='tooltip-wrap'><div className='tooltip-text'>Logout</div></div>
                </div>
            </div>
        </div>
    )
}

export default SidebarComponent