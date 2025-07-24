import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';

export default function LandingPage() {
    return (
        <div>
            <Header userAuth={false}/>
            <Hero />
        </div>
    );
}