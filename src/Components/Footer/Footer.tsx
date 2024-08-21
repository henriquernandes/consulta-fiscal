import { footerData } from "../../data/landing.json";
import MailIcon from "../../assets/Icons/socials/MailIcon.svg";

const iconMap: Record<any, string> = {
  MailIcon,
};

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center text-center gap-y-8 pt-8 bg-black text-white w-full">
      <section>
        <a className="text-xl md:text-2xl" href="/">
          {footerData.logo}
        </a>
      </section>
      <section>
        <p className="md:text-lg">{footerData.description}</p>
      </section>
      <section className="flex flex-row flex-wrap justify-center gap-x-3 px-4 md:px-0 md:text-xl">
        {footerData.links.map((link, index) => (
          <a key={index} href={link.href}>
            {link.label}
          </a>
        ))}
      </section>
      <section className="mb-5 flex flex-row flex-wrap justify-center gap-x-3">
        {footerData.socials.map((social, index) => (
          <a key={index} href={social.href} title={social.icon}>
            <img className="w-8 h-8" src={iconMap[social.icon]} />
          </a>
        ))}
      </section>
    </footer>
  );
};

export default Footer;
