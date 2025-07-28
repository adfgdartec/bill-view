import Header from "../components/Header/Header";
import UserSettings from "../components/UserSettings/UserSettings";

export default function Settings() {
    // In Development
    return (
        <div>
            <Header userAuth={true} />
            {/* <p>You are in the settings page.</p> */}
            <div >
                <UserSettings />
            </div>
        </div>
    );
}