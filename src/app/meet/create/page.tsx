import MeetForm from './_components/MeetForm';

export default function MeetCreatePage() {
  return (
    <div className="w-full flex flex-col gap-4 border-b-2 mt-10 items-end">
      <h1 className="text-xl font-bold text-main mb-4">모임 생성</h1>\
      <MeetForm />
    </div>
  );
}
