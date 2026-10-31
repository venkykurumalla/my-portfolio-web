import { portfolioData } from "../data/portfolioData";

export default function Footer() {
  return (
    <footer className="container-x pb-10 pt-4">
      <div className="glass glass--flat glass--pill flex flex-col items-center justify-between gap-3 px-7 py-5 text-center text-sm md:flex-row md:text-left">
        <p className="font-semibold">{portfolioData.personalInfo.name}</p>
        <p className="dim">Aspiring Software Engineer · Full-Stack · AI/LLM</p>
        <p className="dim">&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
