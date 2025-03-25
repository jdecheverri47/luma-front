import Image from "next/image";
import logoLuma from "@/public/images/logo_luma_night.png";
const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-20 w-full h-14 border-b border-zinc-200 px-6 py-2 bg-white">
      <div className="w-full flex justify-between items-center h-full">
        <Image
          src={logoLuma}
          alt="logo-luma"
          priority
          width={100}
          height={200}
        />

        <div className="space-x-4">
          <span className="font-medium text-sm hover:opacity-70 cursor-pointer">
            Settings
          </span>
          <span className="font-medium text-sm hover:opacity-70 cursor-pointer">
            Accounts
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
