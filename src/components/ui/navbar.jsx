import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

export function Navbar({ links = [] }) {
  return (
    <div className="group flex flex-col gap-4 py-2">
      <nav className="grid gap-1 px-2">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  variant: isActive ? "default" : "ghost",
                  size: "lg",
                }),

                "justify-start px-6"
              )
            }
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
            {link.label && <span className={cn("ml-auto")}>{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
