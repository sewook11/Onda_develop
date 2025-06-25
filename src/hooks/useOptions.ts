// import { useEffect, useState } from "react";
import { getOptions } from "@/apis/options";
import { Option } from "@/types/post";
// import { OptionResponse } from "@/apis/options";
import { useQuery } from "@tanstack/react-query";

export default function useOptions() {
  const { data } = useQuery({
    queryKey: ["options"],
    queryFn: getOptions,
    staleTime: 1000 * 60 * 10, 
  });

  const categoryOptions: Option[] =
    data?.categories?.map((c) => ({
      id: c.id,
      name: c.category_name,
    })) ?? [];

  const interestOptions: Option[] =
    data?.interests?.map((i) => ({
      id: i.id,
      name: i.interest_name,
    })) ?? [];

  const areaOptions = data?.areas ?? [];

  return { categoryOptions, interestOptions, areaOptions };
}
