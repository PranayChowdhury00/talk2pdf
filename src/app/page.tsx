import Footer from "@/components/Footer";
import Header from "@/components/header";
import Testimonials from "@/components/Testimonials";
import UploadSection from "@/components/upload-section";
// import { fetchDeepSeek } from "@/lib/openrouter";

export default function Home() {
  // const getAIResponse = async () => {
  //   console.log("Fetching AI response...");
  //     const response = await fetchDeepSeek("Write me a code for priting a triangle using python.");
  //     console.log(response);
  //   };

  //   getAIResponse();

  return (
    <>
      <div className="bg-muted">
        <div>
          <Header />
        </div>
        <div className="flex justify-center mt-10 mb-10">
          <UploadSection />
        </div>
        <div className="">
          <Testimonials />
        </div>
        <Footer />
      </div>
    </>
  );
}
