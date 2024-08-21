import { heroData } from "../../data/landing.json";

const Hero = () => {
  return (
    <section id="hero-section" className="flex justify-center mt-48 h-screen">
      <div className="md:w-1/2">
        <h1 className="text-4xl text-center font-semibold md:text-6xl">
          {heroData.title}
          <span className="text-blue-600"> {heroData.highlightedTitle} </span>
        </h1>
        <h2 className="mt-10 text-lg text-center opacity-80 md:text-2xl">
          {heroData.subTitle}
        </h2>
        <div className="flex justify-center">
          <a
            className="flex justify-center items-center animate-bounce border-2 border-transparent bg-primary text-white rounded-full w-14 h-14 mt-32 hover:bg-white hover:text-primary hover:border-primary transition"
            href="#services-section"
            title="arrow down icon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
