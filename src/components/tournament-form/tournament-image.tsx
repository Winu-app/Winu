"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFileStore } from "@/helper/edgestore";
import { RootState } from "@/state-manager/store";
import Logo from "@/components/ui/logo";
import { FaImage } from "react-icons/fa";
import { toast } from "sonner";
import { setImage as setImageUrl } from "@/state-manager/features/tournament-form";
import Image from "next/image";

const TournamentImage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { image: imageUrl } = useSelector(
    (state: RootState) => state.tournamentForm
  );
  const { edgestore } = useFileStore();
  const dispatch = useDispatch();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files || !files[0]) {
      toast.error("Image not found!");
      return;
    }
    const res = await edgestore.publicFiles.upload({
      file: files[0],
      onProgressChange: (p) => {
        setUploadProgress(p);
      },
    });
    dispatch(setImageUrl(res.url));
  };
  return (
    <div className="size-96 relative bg-foreground shrink-0 rounded-xl border border-active overflow-hidden">
      {imageUrl ? (
        <Image
          alt="Tournament Image"
          src={imageUrl}
          className="size-full object-contain"
          width={1}
          height={1}
        ></Image>
      ) : (
        <Logo className="size-full -rotate-12" />
      )}
      <input
        className="size-full opacity-0 absolute top-0 left-0 cursor-pointer"
        type="file"
        accept="image/*"
        onChange={uploadImage}
      />
      <div className="size-12 rounded-full border bg-active border-active absolute bottom-4 right-4 pointer-events-none flex items-center justify-center text-gray-400">
        <FaImage size={22} />
      </div>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="absolute top-0 left-0 size-full flex items-center justify-center bg-[rgba(0,0,0,0.2)]">
          Loading... {uploadProgress}
        </div>
      )}
    </div>
  );
};

export default TournamentImage;
