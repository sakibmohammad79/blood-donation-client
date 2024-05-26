import Donor from "./Donor/Donor";
import Gallery from "./Gallery/Gallery";
import HeroSection from "./HeroScection/HeroSection";
import Volunteers from "./Volunteers/Volunteers";
import WhoSection from "./WhoSection/WhoSection";

const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <WhoSection></WhoSection>
      <Gallery></Gallery>
      <Donor></Donor>
      <Volunteers></Volunteers>
    </>
  );
};

export default Home;
