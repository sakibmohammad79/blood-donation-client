import Donor from "./Donor/Donor";
import HeroSection from "./HeroScection/HeroSection";
import Volunteers from "./Volunteers/Volunteers";
import WhoSection from "./WhoSection/WhoSection";

const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <WhoSection></WhoSection>
      <Volunteers></Volunteers>
      <Donor></Donor>
    </>
  );
};

export default Home;
