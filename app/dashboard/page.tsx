import NewJoinDashboard from "./_components/NewJoinDashboard";
import UserList from "./_components/UserList";

export default function DashboardPage() {
    return (
        <main className="w-full flex">
            <NewJoinDashboard />
            <UserList />
        </main>
    )
}
