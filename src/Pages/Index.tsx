import Header from "../Components/Header/Header";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Advantajes from "../Components/Adventajes/Advantajes";
import Footer from "../Components/Footer/Footer";
import Hero from "../Components/Hero/Hero";
import Services from "../Components/Services/Services";

function Index() {
  return (
    <>
      <div className="absolute top-0 z-[-10] h-screen w-full bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,65,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      <Header />
      <main className="flex flex-col justify-center items-center">
        <div className="w-3/4">
          <Hero />
          <Services />
          <Advantajes />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Index;
