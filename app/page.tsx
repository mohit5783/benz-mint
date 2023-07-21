import Image from "next/image";
import dynamic from "next/dynamic";

const Welcome = dynamic(() => import("../components/Welcome"), { ssr: false });

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <NavBar />
      <Welcome />
      <Footer />
    </main>
  );
}
