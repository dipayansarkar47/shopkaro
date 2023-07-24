import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function UserOrdersPage() {
    return (
        <div>
            <Navbar>
                <h1 className="mx-auto  text-left font-bold text-white p-5 text-2xl bg-purple-800">My Orders</h1>
                <UserOrders></UserOrders>
            </Navbar>

        </div>
    );
}

export default UserOrdersPage;