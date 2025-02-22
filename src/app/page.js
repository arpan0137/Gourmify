import Hero from "../components/layout/Hero"
import HomeMenu from "@/components/layout/TrendingSection";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function AdminPage() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16 " id="about">
        <SectionHeaders
          subHeader={"Our Story"}
          mainHeader={"About US"}
        />
        <div className="mt-5 max-w-2xl mx-auto flex flex-col gap-4 text-gray-700">
          <p>
            <strong>GOURMIFY</strong> is a premier online food ordering service, designed with a single aim - to satiate your food cravings with our wide variety of cuisines. Launched in 2024, we are a team of food enthusiasts who aim to bring delicious, fresh, and mouth-watering delicacies right to your doorstep.
          </p>
          <p>
            Our mission is to make great food available to everyone, everywhere, at any time. We believe that everyone deserves to enjoy a good meal, and with <strong>GOURMIFY</strong>, you can do just that.
          </p>
          <p>
            We promise to deliver not just food, but happiness. With <strong>GOURMIFY</strong>, every meal is a celebration. So go ahead, order from us and make your mealtime special!
          </p>
          <p>
            Thank you for choosing <strong>GOURMIFY</strong>. Happy eating!
          </p>
        </div>
      </section>
    </>
  );
}
