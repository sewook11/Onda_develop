import { useEffect, useState } from "react";
import { getOptions } from "@/apis/options";
import { OptionResponse } from "@/apis/options";

interface OptionItem {
  value: number;
  label: string;
}

export default function useOptions() {
  const [options, setOptions] = useState<OptionResponse | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      const data = await getOptions();
      setOptions(data);
    };

    fetchOptions();
  }, []);

  const categoryOptions: OptionItem[] =
    options?.categories?.map((c) => ({
      value: c.id,
      label: c.category_name,
    })) ?? [];

  const interestOptions: OptionItem[] =
    options?.interests?.map((i) => ({
      value: i.id,
      label: i.interest_name,
    })) ?? [];

  const areaOptions = options?.areas ?? [];

  return { categoryOptions, interestOptions, areaOptions };
}
