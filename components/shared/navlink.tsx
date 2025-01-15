import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navlink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx("text-sm font-medium", isActive && "text-[#ff6a28]")}
    >
      {children}
    </Link>
  );
}
