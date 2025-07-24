"use client";
import UserInfoCard from "./components/UserInfoCard";
import UserMetaCard from "./components/UserMetaCard";
export default function UserProfiles() {
  return (
    <>
      <div className="space-y-6">
        <UserMetaCard />
        <UserInfoCard />
      </div>
    </>
  );
}
