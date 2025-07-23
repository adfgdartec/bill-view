import Header from "../components/Header/Header";

export default function Latest() {
    return (
        <div>
            <Header userAuth={false} />
            <p>You are in the Latest page.</p>
        </div>
    );
}