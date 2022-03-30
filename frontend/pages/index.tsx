import type { NextPage } from "next";
import { Header } from "../components/headers";
import { History } from "../components/history";
import { Main } from "../components/main";

const Home: NextPage = () => {
  return (
    <div className="w-full h-screen justify-between flex flex-col bg-[#191A1F] text-white">
      <Header />
      <Main />
      <History />
    </div>
  );
};

export default Home;
