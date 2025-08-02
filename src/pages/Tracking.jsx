// Components
import BillsViewer from "../components/billsManagement/BillsViewer/BillsViewer";
import Header from "../components/Header/Header";

export default function Tracking() {
    return (
        <div>
            <Header userAuth={true} />
            <p>You are in the tracking page.</p>
            <BillsViewer type='trackingBills' />
        </div>
    );
}