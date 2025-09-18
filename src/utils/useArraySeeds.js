import { useQueries, useQueryClient } from "react-query";
import { getSeedService } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setSeed } from "../redux/slice";

function useArraySeeds(seedPaths = []) {
  const seeds = useSelector((state) => state?.seeds);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  useQueries(
    seedPaths.map((path) => ({
      queryKey: ["seedData", path],
      queryFn: () => getSeedService(path),
      enabled: !seeds?.[path] && !!path,
      onSuccess: ({ data }) => {
        dispatch(setSeed({ [path]: [...data] }));
      },
    }))
  );
  const updateSeed = (path) => {
    queryClient
      .fetchQuery(["seedData", path], () => getSeedService(path))
      .then(({ data }) => {
        dispatch(setSeed({ [path]: [...data] }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { ...seeds, updateSeed };
}

export default useArraySeeds;
