import HeroSlider from "./components/home/HeroSlider";
import AboutSection from "./components/home/AboutSection";
import CategorySlider from "./components/home/CategorySlider";
import CounterSection from "./components/home/CounterSection";
import ClientsSlider from "./components/home/ClientsSlider";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <CategorySlider />
      <CounterSection />
      <ClientsSlider />
    </>
  );
}
