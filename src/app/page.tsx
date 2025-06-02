import BannerSection from "@/components/homeComponents/BannerSection";
import HeroSection from "@/components/homeComponents/HeroSection";
import MainBannerSection from "@/components/homeComponents/MainBannerSection";
import MeetingListSection from "@/components/homeComponents/MeetingListSection";
import StartSurveySection from "@/components/homeComponents/StartSurveySection";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center">
      <HeroSection />
      <MainBannerSection />
      <BannerSection />
      <MeetingListSection />
      <StartSurveySection />
    </main>
  );
}
