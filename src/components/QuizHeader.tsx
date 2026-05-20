import logo from "@/assets/logo.jpg";

export function QuizHeader() {
  return (
    <div className="flex flex-col items-center pt-4 pb-2">
      <img
        src={logo}
        alt="Menopausa Sem Mistério"
        width={64}
        height={64}
        className="h-14 w-14 object-contain"
      />
      <p className="mt-1 text-[11px] tracking-[0.18em] uppercase text-[#B86A85] font-semibold">
        Menopausa Sem Mistério
      </p>
    </div>
  );
}
