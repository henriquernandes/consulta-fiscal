import { adventajesData } from "../../data/landing.json";
import SideBySide from "../SideBySide/SideBySide";

const Advantajes = () => {
  return (
    <section id="adventajes-section" className="flex flex-col mb-20 gap-y-28">
      <h2 className="text-2xl text-center md:text-5xl font-semibold">
        {adventajesData.title}
      </h2>
      <div>
        {adventajesData.adventajes.map((adventaje, idx) => (
          <SideBySide
            key={idx}
            data={adventaje}
            reversed={(idx + 1) % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
};

export default Advantajes;
