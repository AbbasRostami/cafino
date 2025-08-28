import Image from "next/image";
import CafeinLogoLight from "./../../../assets/Logo/9.png";
import CafeinLogoDark from "./../../../assets/Logo/10.png";

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
  return (
    <>
      <Image
        priority
        src={CafeinLogoLight}
        alt="Cafein Logo Light"
        className={`block dark:hidden object-contain ${className}`}
        width={width}
        sizes={sizes}
      />
      <Image
        priority
        src={CafeinLogoDark}
        alt="Cafein Logo Dark"
        className={`hidden dark:block object-contain ${className}`}
        width={width}
        sizes={sizes}
      />
    </>
  );
};

export default Logo;
