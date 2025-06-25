// import { useEffect, useState } from "react";
import { getOptions } from "@/apis/options";
// import { OptionResponse } from "@/apis/options";
import { useQuery } from "@tanstack/react-query";

interface OptionItem {
  value: number;
  label: string;
}

export default function useOptions() {
  const { data } = useQuery({
    queryKey: ["options"],
    queryFn: getOptions,
    staleTime: 1000 * 60 * 10, 
  });

  const categoryOptions: OptionItem[] =
    data?.categories?.map((c) => ({
      value: c.id,
      label: c.category_name,
    })) ?? [];

  const interestOptions: OptionItem[] =
    data?.interests?.map((i) => ({
      value: i.id,
      label: i.interest_name,
    })) ?? [];

  const areaOptions = data?.areas ?? [];

  return { categoryOptions, interestOptions, areaOptions };
}
