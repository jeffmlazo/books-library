// const Header = () => {
//   return <div>Header</div>;
// };

// export default Header;

import Link from "next/link";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bebas-neue text-2xl text-primary">
          Books Library
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className={cn(
                  "text-gray-600 hover:text-primary transition-colors"
                )}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/books"
                className={cn(
                  "text-gray-600 hover:text-primary transition-colors"
                )}
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={cn(
                  "text-gray-600 hover:text-primary transition-colors"
                )}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
