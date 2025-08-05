"use client";

import { useRouter } from "next/navigation";

export const useTeaNavigation = () => {
  const router = useRouter();

  const navigateToTea = (id: string) => {
    router.push(`/closet/tea/${id}`);
  };

  const navigateToTeaEdit = (id: string) => {
    router.push(`/closet/tea/${id}/edit`);
  };

  const navigateToTeaDelete = (id: string) => {
    router.push(`/closet/tea/${id}/delete`);
  };

  const navigateToNewTea = () => {
    router.push("/closet/tea/new");
  };

  const navigateToCloset = (filter?: string) => {
    const path = filter ? `/closet?type=${filter}` : "/closet";
    router.push(path);
  };

  return {
    navigateToTea,
    navigateToTeaEdit,
    navigateToTeaDelete,
    navigateToNewTea,
    navigateToCloset,
  };
};
