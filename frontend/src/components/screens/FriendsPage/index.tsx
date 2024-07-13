'use client'
import { useProfile } from "@/hooks";

import classes from './index.module.scss'
import { Loader } from "lucide-react";
import { UsersGridCard } from "@/components/ui";

export default function FriendsPage() {
  const { data, isLoading, refetch } = useProfile()

  return (
    <div className={classes.friendsBlock}>
      <h1>My Friends</h1>
      <hr />
      {data && Array.isArray(data.friends) && data.friends.length > 0 ?
        <UsersGridCard users={data.friends} isLoading={isLoading} refetch={refetch} isJustFriend={true} />
        : <p>People not found</p>}
    </div>
  );
}
  