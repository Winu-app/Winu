import Hero from "../../components/landing-page/hero";
import Navbar from "../../components/landing-page/navbar";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-black">
      <Navbar />
      <Hero />
    </div>
  );
}
