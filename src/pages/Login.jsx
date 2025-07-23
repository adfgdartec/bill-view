import Header from "../components/Header/Header";

export default function Login() {
    return (
        <div>
            <Header userAuth={false} />
            <p>You are in the login page.</p>
        </div>
    );
}