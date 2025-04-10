import Donor from "./Donor/Donor";
import Gallery from "./Gallery/Gallery";
import HeroSection from "./HeroScection/HeroSection";
import Volunteers from "./Volunteers/Volunteers";
import WhoSection from "./WhoSection/WhoSection";
import CoverageArea from "./CoverageArea/CoverageArea";
import Review from "./Review/Review";
import DonorTips from "./DonorTips/DonorTips";
import History from "./History/History";

const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <WhoSection></WhoSection>
      <Gallery></Gallery>
      <Donor></Donor>
      <Volunteers></Volunteers>
      <DonorTips></DonorTips>
      <History></History>
      <Review></Review>
      <CoverageArea></CoverageArea>
    </>
  );
};

export default Home;
