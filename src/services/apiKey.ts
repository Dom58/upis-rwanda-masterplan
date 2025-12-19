import { AppConfig } from "@/app/configs";
import Axios from "axios";

export const fetchUpiData = async (upi: string): Promise<any> => {
  const url = AppConfig.upi.concat(
    `?upi=${upi}`,
  );
  return (await Axios.get(url)).data;
};
