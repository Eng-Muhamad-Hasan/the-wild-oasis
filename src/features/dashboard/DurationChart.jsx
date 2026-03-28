import { useDarkMode } from "../../providers/DarkModeProvider";
import {
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import Heading from "../../ui/Heading";

const ChartBox = styled.div`
  padding: 2.4rem 3.2rem;

  grid-column: 3 / span 2;

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  /* A bit hack, but okay */
  & > *:first-child {
    margin-bottom: 1.6rem;
  }
`;


const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field, color) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1, color } : obj,
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night", startData[0].color);
      if (num === 2) return incArrayValue(arr, "2 nights", startData[1].color);
      if (num === 3) return incArrayValue(arr, "3 nights", startData[2].color);
      if ([4, 5].includes(num))
        return incArrayValue(arr, "4-5 nights", startData[3].color);
      if ([6, 7].includes(num))
        return incArrayValue(arr, "6-7 nights", startData[4].color);
      if (num >= 8 && num <= 14)
        return incArrayValue(arr, "8-14 nights", startData[5].color);
      if (num >= 15 && num <= 21)
        return incArrayValue(arr, "15-21 nights", startData[6].color);
      if (num >= 21)
        return incArrayValue(arr, "21+ nights", startData[7].color);
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

const CustomSector = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } =
    props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={payload.color}
      stroke={payload.color}
    />
  );
};

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading type="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            cx="40%"
            cy="50%"
            innerRadius={85}
            outerRadius={110}
            paddingAngle={3}
            startAngle={180}
            endAngle={-180}
            shape={<CustomSector />}
          />
          <Tooltip />
          <Legend
            
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
