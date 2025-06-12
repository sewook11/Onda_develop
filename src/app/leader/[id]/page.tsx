import { sampleLeaderApplication } from "@/datas/sampleUser";
import LeaderDetail from "../_components/LeaderDetail";
import LeaderProfile from "../_components/LeaderProfile";

const LeaderDetailPage = () => {

    return(
        <main className="px-10 py-12 max-w-5xl mx-auto space-y-10">
            <h2 className="text-lg font-semibold">리더 신청</h2>
            <LeaderProfile status="pending" />
            <LeaderDetail leader={sampleLeaderApplication} />
        </main>
    )
}

export default LeaderDetailPage;