import Footer from '../components/footer/Footer.jsx';

import Navbar from '../components/navbar/Navbar.jsx';

import Information from '../containers/home/information/Information.jsx';

import IntroductionAPK from '../containers/home/introductionAPK/IntroductionAPK.jsx';

export default function Home() {

    return (
        <>
            <Navbar />
            <Information />
            <IntroductionAPK />
            <Footer />
        </>
    );

}