import Header from "../components/Header/Header";

export default function Settings() {
    return (
        <div>
            <Header userAuth={true} />
            <p>You are in the settings page.</p>
        </div>
    );
}