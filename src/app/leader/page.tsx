import { sampleApplicants } from "@/datas/sampleApplicants";
import ApplicantTable from "./_components/ApplicantTable";

const LeaderPage = () => {

    return(
        <main className="px-10 py-12 max-w-5xl mx-auto space-y-10">
            <ApplicantTable  data={sampleApplicants} />
        </main>
    )

}

export default LeaderPage;