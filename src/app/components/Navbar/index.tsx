import { DesktopNav } from "./components/DesktopNav";
import { MobileNav } from "./components/MobileNav";
import { TabletNav } from "./components/Tablet.Nav";


export function Navbar() {
  return (
    <header role="banner">
      <div className="hidden lg:block">
        <DesktopNav />
      </div>
      <div className="hidden md:block lg:hidden">
        <TabletNav />
      </div>
      <div className="block md:hidden">
        <MobileNav />
      </div>
    </header>
  );
}

// Default export for easier imports
export default Navbar;