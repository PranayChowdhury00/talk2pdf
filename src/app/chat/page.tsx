import { Chat } from "@/components/chat";

export default function chat() {
    return (
        <section className="relative container flex min-h-screen flex-col">
        <div className="flex flex-1 py-4">
          <div className="w-full">
            <Chat />
          </div>
        </div>
      </section>
    );
  }
