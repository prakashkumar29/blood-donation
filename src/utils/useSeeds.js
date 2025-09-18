import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getSeedService } from "../api/api";
import { setSeed } from "../redux/slice";

export const useSeeds = (path) => {
  const seed = useSelector((state) => state?.seeds?.[path]);
  const dispatch = useDispatch();
  useQuery(`${path}`, () => getSeedService(path), {
    enabled: !seed && !!path,
    retry: false,
    onSuccess: ({ data }) => {
      dispatch(setSeed({ [path]: [...data] }));
    },
  });
  return seed;
};
