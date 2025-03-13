import Footer from "@/components/Footer";
import Header from "@/components/header";
import Testimonials from "@/components/Testimonials";
import UploadSection from "@/components/upload-section";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 h-screen">
        <div>
          <Header />
        </div>
        <div className="flex justify-center mt-10 mb-10">
          <UploadSection />
        </div>
        <div className="">
          <Testimonials></Testimonials>
                  </div>
        <Footer></Footer>
      </div>
    </>
  );
}
