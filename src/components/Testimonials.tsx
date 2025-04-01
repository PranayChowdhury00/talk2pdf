import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager, TechCorp",
      text: "Talk2PDF has transformed how I interact with documents. AI-powered summaries save me hours every week!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Lee",
      role: "Researcher, AI Labs",
      text: "The AI-driven chat feature is a game-changer. I can extract insights from PDFs in seconds!",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Emily Carter",
      role: "Freelance Writer",
      text: "I love how intuitive and fast Talk2PDF is. The multilingual support is a huge plus!",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-foreground">
          What Our Users Say
        </h2>
        <p className="mt-2 text-muted-foreground">
          Hear from people who love using Talk2PDF.
        </p>

        <div className="grid gap-6 mt-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2 border-2 border-gray-600"
            >
              <Image
                width={64}
                height={64}
                src={testimonial.image}
                alt={testimonial.name}
                className="mx-auto rounded-full"
              />
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {testimonial.name}
              </h3>
              <p className="text-muted-foreground text-sm">
                {testimonial.role}
              </p>
              <p className="mt-3 text-muted-foreground">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
