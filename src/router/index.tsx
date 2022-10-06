import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useCookie from 'hooks/useCookie';
import LoginPage from 'components/templates/Login';
import NotFoundPage from 'components/templates/NotFound';
import LoadApp from 'components/templates/LoadApp';
import { useAppSelector } from 'hooks/useAppSelector';
import { getUser } from 'redux/selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { updateUserData } from 'redux/actions/loggedinUser';
import Default from 'components/layouts/Default';
import GupshupDashboard from 'components/templates/gupshupDashboard';
import OnboardingDashboard from 'components/templates/onboardingDashboard';

function AppRouter() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUser);
    const [userCookie, updateUserCookie] = useCookie("user", null);

    useEffect(() => {
        console.log(user)
    }, [user])

    useEffect(() => {
        if (userCookie) {
            console.log("App router :", userCookie, new Date().toLocaleTimeString())
            dispatch(updateUserData(userCookie))
        }
    }, [userCookie])

    return (
        <Router>
            <LoadApp />
            {user ? <>
                <Default>
                    <Routes>
                        <Route key={`routes-GupshupDashboard`} element={<GupshupDashboard />} path='/gupshup-dashboard' />
                        <Route key={`routes-OnboardingDashboard`} element={<OnboardingDashboard />} path='/onboarding-dashboard' />
                        <Route key={`routes-Home`} element={<OnboardingDashboard />} path='/' />
                        <Route key={`routes-LoginPage`} element={<LoginPage />} path='/login' />
                        <Route key={`routes-NotFoundPage`} path="*" element={<NotFoundPage />} />
                    </Routes>
                </Default>
            </> : <>
                <LoginPage />
            </>}
        </Router>
    )
}

export default AppRouter