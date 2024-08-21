import CheckIcon from "../../assets/Icons/commons/CheckIcon.svg";
import type { adventajesData } from "../../data/landing.json";
import Seo from "../../assets/seo.webp";

const SideBySide = ({
  data,
  reversed,
}: {
  data: (typeof adventajesData.adventajes)[0];
  reversed: boolean;
}) => {
  const iconMap: Record<any, string> = {
    CheckIcon,
  };
  return (
    <article
      className={`flex justify-between gap-x-32 flex-col mb-20 md:mb-40 ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="md:w-3/4">
        <img src={Seo} alt={data.imageAlt} className="w-fit" />
      </div>
      <div className="flex flex-col md:w-5/6 gap-y-8">
        <h3 className="text-xl md:text-4xl">{data.title}</h3>
        <p className="md:text-xl">{data.description}</p>
        <ul className="flex flex-col gap-y-8">
          {data.checks.map((check, index) => (
            <li
              key={index}
              className="flex flex-row items-center gap-x-4 md:text-2xl"
            >
              <img
                src={iconMap["CheckIcon"]}
                alt={"Check Icon"}
                className="bg-primary h-10 md:h-12 md:p-3 md:w-12 p-2 rounded-full text-white w-10 flex justify-center items-center"
              />
              {check}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default SideBySide;
