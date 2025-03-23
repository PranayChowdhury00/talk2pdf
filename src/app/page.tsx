import Footer from "@/components/Footer";
import Header from "@/components/header";
import Testimonials from "@/components/Testimonials";
import UploadSection from "@/components/upload-section";
import { fetchDeepSeek } from "@/lib/deepseek";

export default function Home() {
  const getAIResponse = async () => {
    const response = await fetchDeepSeek("Write me a code for priting a triangle using python.");
    console.log(response);
  };

  getAIResponse();

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
