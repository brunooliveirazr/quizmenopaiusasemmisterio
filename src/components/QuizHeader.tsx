import logo from "@/assets/logo.jpg";

export function QuizHeader({ size = "sm" }: { size?: "sm" | "lg" }) {
  const isLg = size === "lg";
  return (
    <div className="flex flex-col items-center pt-4 pb-2">
      <img
        src={logo}
        alt="Menopausa Sem Mistério"
        width={128}
        height={128}
        className={isLg ? "h-28 w-28 object-contain" : "h-14 w-14 object-contain"}
      />
      <p
        className={
          isLg
            ? "mt-2 tracking-[0.18em] uppercase text-[#B86A85] font-sans text-center font-normal text-lg"
            : "mt-1 text-[11px] tracking-[0.18em] uppercase text-[#B86A85] font-semibold"
        }
      >
        Menopausa Sem Mistério
      </p>
    </div>
  );
}
