import Image from "next/image";
import Logo from "../ui/logo";

const ClanSearchCard = ({
  imageUrl,
  uniqueName,
  name,
  id,
}: {
  imageUrl: string;
  uniqueName: string;
  name: string;
  id: string;
}) => {
  return (
    <div
      className="w-80 h-fit flex items-center gap-3 hover:bg-active rounded-lg py-2 px-1 transition-colors cursor-pointer"
      data-clan={id}
    >
      <div className="size-10 rounded-full flex items-center justify-center shrink-0">
        {!imageUrl && (
          <Logo className="size-full border rounded-full border-active" />
        )}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            width={1}
            height={1}
            className="size-full object-cover border rounded-full border-active"
          />
        )}
      </div>
      <div className="">
        <h3 className="text-sm">{name}</h3>
        <p className="text-xs text-gray-400">@{uniqueName}</p>
      </div>
    </div>
  );
};

export default ClanSearchCard;
