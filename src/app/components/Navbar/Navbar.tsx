import { DesktopNav } from "./DesktopNav";
import { TabletNav } from "./TabletNav";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopNav />
      </div>
      <div className="hidden md:block lg:hidden">
        <TabletNav />
      </div>
      <div className="block md:hidden">
        <MobileNav />
      </div>
    </>
  );
}
