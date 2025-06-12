import Button from "@/components/common/Button";
import MultiCategoryFileUpload from "./MultiCategoryFileUpload";

const LeaderWrite = () => {
    return (
        <div className="space-y-10">
            <div className="space-y-4">
                <h2 className="text-xl">자기소개<span className="text-xs">(최대 1000자)</span></h2>
                <textarea className="w-full min-h-96 border border-gray-300 rounded px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>
            <MultiCategoryFileUpload />
            <Button height="h-16" className="w-full text-sm font-bold">제출하기</Button>
        </div>
    );
}

export default LeaderWrite;