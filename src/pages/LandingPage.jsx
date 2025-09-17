import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import ListFeature from '../components/featurePages/ListFeature/ListFeature';
import CenterFocusFeature from '../components/featurePages/CenterFocusFeature/CenterFocusFeature';
import Footer from '../components/Footer/Footer';

export default function LandingPage() {
    return (
        <div>
            <Header userAuth={false}/>
            <Hero />
            {/* Features section planning to add in the future */}
            <CenterFocusFeature />
            <ListFeature />
            {/* Footer */}
            <Footer />
        </div>
    );
}