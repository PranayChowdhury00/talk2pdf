import UploadSection from "@/app/components/upload-section";

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-7xl font-black text-center text-violet-600 pt-24">
          Home Page
        </h1>
        <div className="flex justify-center mt-10 mb-10">
        <UploadSection />
        </div>
      </div>
    </>
  );
}
