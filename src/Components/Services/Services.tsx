import { servicesData } from "../../data/landing.json";
import DevIcon from "../../assets/Icons/commons/DevIcon.svg";
import PlanetIcon from "../../assets/Icons/commons/PlanetIcon.svg";
import FileIcon from "../../assets/Icons/commons/FileIcon.svg";
import ConfigIcon from "../../assets/Icons/commons/ConfigIcon.svg";

const iconMap: Record<any, string> = {
  DevIcon,
  PlanetIcon,
  FileIcon,
  ConfigIcon,
};

function Services() {
  return (
    <section id="services-section" className="flex flex-col mb-60 gap-y-28">
      <h2 className="text-2xl text-center md:text-5xl font-semibold">
        {servicesData.title}
      </h2>
      <div className="grid md:grid-cols-2 gap-y-10 justify-items-center">
        {servicesData.services.map((service, index) => (
          <article
            key={index}
            className="flex gap-x-6 md:gap-x-12 md:w-[550px]"
          >
            <img
              src={iconMap[service.icon]}
              alt={service.title}
              className="bg-primary h-10 md:h-12 md:p-3 md:w-12 p-2 rounded-full text-white w-10 flex justify-center items-center"
            />
            <section>
              <h3 className="text-xl font-medium md:text-4xl mb-3">
                {service.title}
              </h3>
              <p className="text-pretty opacity-90 md:text-lg">
                {service.description}
              </p>
            </section>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Services;
