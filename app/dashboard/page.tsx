import List from "./_components/List";
import NewJoinDashboard from "./_components/NewJoinDashboard";

export default function DashboardPage() {
    return (
        <main className="w-full flex">
            <NewJoinDashboard />
            <List />
        </main>
    )
}
