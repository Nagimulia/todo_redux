import InputForm from "@/components/InputForm";

export default function Home() {
  return (
    <main className="w-full min-h-screen pt-4 font-bodyFont bg-gradient-to-t from-sky-600 via-sky-400 to-sky-300 text-white px-4 flex flex-col gap-10 justify-center items-center">
      <div className="w-full lgl:w-[850px] h-full bg-bodyColor p-4 lgl:p-10 flex flex-col gap-10">
        <InputForm />
      </div>
    </main>
  );
}
