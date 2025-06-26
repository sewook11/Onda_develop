import BannerSection from "@/app/_components/BannerSection";
import HeroSection from "@/app/_components/HeroSection";
import MainBannerSection from "@/app/_components/MainBannerSection";
import MeetingListSection from "@/app/_components/MeetingListSection";
// import StartSurveySection from "@/app/_components/StartSurveySection";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center">
      <HeroSection />
      <MainBannerSection />
      <BannerSection />
      <MeetingListSection />
      {/* <StartSurveySection /> */}
    </main>
  );
}
