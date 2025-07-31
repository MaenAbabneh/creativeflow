import Link from "next/link";
import ROUTES from "@/constants/routes";
import UserAvatar from "../UserAvatar";
import { Users } from "@/types/global";

const UserCard = ({ _id, name, image, username }: Users) => (
  <div
    className="
      w-full xs:w-[230px] sm:w-[220px] md:w-[230px] xl:w-[230px]
      flex-shrink-0 m-2
      shadow-light100_darknone
    "
  >
    <article
      className="
        background-light900_dark200 light-border flex flex-col items-center justify-center
        rounded-2xl border p-6 h-full
      "
    >
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-300 flex items-center justify-center">
        <UserAvatar
          id={_id}
          name={name}
          imageUrl={image}
          className="size-[100px] rounded-full object-cover"
          fallbackClassName="text-3xl tracking-widest"
        />
      </div>

      <Link href={ROUTES.PROFILE(_id)}>
        <div className="mt-4 text-center w-full">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">{name}</h3>
          <p className="body-regular text-dark500_light500 mt-2">@{username}</p>
        </div>
      </Link>
    </article>
  </div>
);

export default UserCard;
