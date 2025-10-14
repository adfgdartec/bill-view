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
            {/* // heading
            // body */}
            <CenterFocusFeature
                heading={"Simple explanations"}
                body={"No unnecessary jargon, fluff, and legistative talk; only simple and direct information."}
            />
            <ListFeature
                heading={"We value CLARITY"}
                featuresList={FEATURES_INFO}
            />
            {/* Footer */}
            <Footer />
        </div>
    );
}

const FEATURES_INFO = [
    {
        heading: "Real-time bill sourcing",
        body: "The bill information comes directly from congress, live, so you don't have to worry about misinterpretation and obsoleteness."
    },
    {
        heading: "Information checks",
        body: "Everything is fact-checked by a neutral AI, meaning that there will be very little bias in the information you receive."
    },
    {
        heading: "Summarization",
        body: "We use novel artificial intelligence technologies and models in order to concisely summarize information that the user needs."
    }
]