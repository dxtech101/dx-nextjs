import AboutCompany from "@/components/web/AboutCompany";
import Company from "@/components/web/Company";
import Herosection from "@/components/web/Herosection";
import Services from "@/components/web/Services";
import Testimonial from "@/components/web/Testimonial";

export default function Home() {
  return (
    <>
      <Herosection />
      <Services />
      <Company />
      <AboutCompany />
      <Testimonial />
    </>
  );
}
