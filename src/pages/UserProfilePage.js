import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

function UserProfilePage() {
    return (
        <div>
            <Navbar>
                <h1 className="mx-auto  text-left font-bold text-white p-5 text-2xl bg-purple-800">My Profile</h1>
                <UserProfile></UserProfile>
            </Navbar>

        </div>
    );
}

export default UserProfilePage;