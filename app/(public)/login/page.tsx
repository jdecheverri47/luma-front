import Image from "next/image";
import loginCover from "@/public/images/login-bg.jpg";
import LogoAnti from "@/public/images/logo_luma_anti.png";
import { Suspense } from "react";
import LoginContent from "@/app/components/login/wrappers/LoginContent";

const Page: React.FC = () => {
  return (
    <main className="flex flex-row w-screen h-screen relative">
      <section className="basis-1/2 relative">
        <Image
          src={LogoAnti}
          alt=" Logo"
          className="w-30 absolute left-10 top-10 z-20"
        />
        <Image
          src={loginCover}
          alt="Background Gradient"
          className="object-cover object-center "
          fill
          priority
        />
      </section>
      <section className="basis-1/2 relative">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginContent />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
