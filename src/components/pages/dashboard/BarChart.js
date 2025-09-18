import { useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart as BarChartSimple,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChart({ bars = [], data = [], dataKey, names, fills, barSize }) {
  
  const isMobile = useMediaQuery("(max-width: 600px)");

  //setting width of barchart accroding to view port
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return Array.isArray(data) ? (
    <BarChartSimple
      width={isMobile ? viewportWidth - 30 : 700}
      height={isMobile ? 200 : 250}
      data={data || []}
      barGap={0}
    >
      <XAxis dataKey={dataKey} />
      <YAxis allowDecimals={false} />
      <Tooltip />
      {data?.length && <Legend />}
      {bars.map((key, index) => (
        <Bar
          key={index}
          dataKey={key}
          name={names[index]}
          fill={fills[index]}
          barSize={barSize ? barSize : 80}
        />
      ))}
    </BarChartSimple>
  ) : (
    <></>
  );
}

export default BarChart;
