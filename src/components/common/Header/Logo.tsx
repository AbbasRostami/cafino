import Image from "next/image";
import CafeinLogoLight from "./../../../assets/Logo/9.png";
import CafeinLogoDark from "./../../../assets/Logo/10.png";
import { useRouter } from "next/navigation";

interface LogoProps {
  className?: string;
  width?: number;
  sizes?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  width = 140,
  sizes = "140px",
}) => {
  const router = useRouter();
  return (
    <>
      <Image
        data-testid="logo"
        priority
        src={CafeinLogoLight}
        alt="Cafein Logo Light"
        className={`block dark:hidden object-contain cursor-pointer ${className}`}
        width={width}
        onClick={() => router.push("/")}
        sizes={sizes}
      />
      <Image
        data-testid="logo"
        priority
        src={CafeinLogoDark}
        alt="Cafein Logo Dark"
        className={`hidden dark:block object-contain cursor-pointer ${className}`}
        width={width}
        onClick={() => router.push("/")}
        sizes={sizes}
      />
    </>
  );
};

export default Logo;
