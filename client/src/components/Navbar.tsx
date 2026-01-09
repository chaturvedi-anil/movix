import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="text-xl font-bold tracking-tight">Movix</div>

        {/* Search Bar */}
        <div className="flex w-full max-w-md items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="Search movies..." className="h-9" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost">Login</Button>
          <Button>Register</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
