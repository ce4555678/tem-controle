import HomeUi from "@/components/homeUi";

const Home = () => {
  return (
    <main>
      <HomeUi.header />
      <HomeUi.hero />
      <HomeUi.pricing />
      <HomeUi.testimonials />
      <HomeUi.cta />
      <HomeUi.footer />
    </main>
  );
};
export default Home;
