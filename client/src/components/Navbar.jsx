import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const name = "Mehak Narang";
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full p-3 flex justify-between items-center mx-auto shadow-lg">
        <div>
          <img src="/logo.svg" height="100px" width="130px" onClick = {() => navigate("/")}/>
        </div>
        <div className="flex gap-5 items-center">
          <p className="text-sm">Hi, {name}</p>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
