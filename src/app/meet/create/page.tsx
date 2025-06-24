import MeetForm from './_components/MeetForm';

export default function MeetCreatePage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold text-main mb-4">모임 생성</h1>\
      <MeetForm />
    </div>
  );
}
