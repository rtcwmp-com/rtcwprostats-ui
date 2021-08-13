import { AxiosResponse } from "axios";

export const pickData = <T>(res: AxiosResponse<T>) => res.data;
