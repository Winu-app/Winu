import React, { Suspense } from "react";
import Clan from "@/components/clan";
import Navbar from "@/components/navbar";
import ClanIcon from "@/components/shortcuts/clan-icon";
import HostTournamentIcon from "@/components/shortcuts/host-tournament-icon";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <div className="w-full min-h-screen h-full">
        <Clan />
        <Navbar />
        <div className="fixed bottom-8 left-8 flex flex-col gap-4 z-50">
          <ClanIcon />
          <HostTournamentIcon />
        </div>
        {children}
      </div>
    </Suspense>
  );
};

export default ProtectedLayout;
