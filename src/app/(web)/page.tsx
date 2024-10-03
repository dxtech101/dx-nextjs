import Footer from "@/components/web/Footer";
import Herosection from "@/components/web/Herosection";
import NavBar from "@/components/web/Navbar";
import Company from "@/components/web/Company";
import Image from "next/image";
import Testimonial from "@/components/web/Testimonial";
import Services from "@/components/web/Services";
import AboutCompany from "@/components/web/AboutCompany";

export default function Home() {
  return (
    <>
      <Herosection />
      <Services />
      <Company />
      <AboutCompany />
      <Testimonial />
      <Footer />
    </>
  );
}
