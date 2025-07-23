import Header from '../components/Header/Header';

export default function LandingPage() {
    return (
        <div>
            <Header userAuth={false}/>
            <p>You are in the landing page</p>
        </div>
    );
}