import { LeaderApplication } from "@/types/leader";
import CategoryFileList from "./CategoryFileList";

type LeaderDetailProps = {
    leader: LeaderApplication;
}
const LeaderDetail = ({leader} : LeaderDetailProps) => {
    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h2 className="text-xl">자기소개<span className="text-xs">(최대 1000자)</span></h2>
                <div className="text-sm">{leader.bio}</div>
            </div>
            <div className="space-y-4">
            <CategoryFileList items={leader.certificates} />
            </div>
        </div>
    );
}

export default LeaderDetail;