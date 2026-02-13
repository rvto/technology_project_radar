import Link from "next/link";
import { CSSProperties, useMemo } from "react";

import styles from "./Label.module.css";

import { QuadrantLink } from "@/components/QuadrantLink/QuadrantLink";
import { getLabel } from "@/lib/data";
import { getSectorCenterAngle } from "@/lib/radarGeometry";
import { Sector } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LabelProps {
  quadrant: Sector;
}

export function Label({ quadrant }: LabelProps) {
  const sectorCount = 8;
  const angleInDegrees = getSectorCenterAngle(quadrant.position, sectorCount);
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  const labelDistanceByPosition: Record<number, number> = {
    1: 50,
    2: 58,
    3: 58,
    4: 55,
    5: 55,
    6: 65,
    7: 65,
    8: 52,
  };
  const labelDistance = labelDistanceByPosition[quadrant.position] ?? 62;
  const x = 50 + labelDistance * Math.sin(angleInRadians);
  const y = 50 - labelDistance * Math.cos(angleInRadians);

  const style = useMemo(
    () =>
      ({
        "--quadrant-color": quadrant.color,
        "--label-x": `${x}%`,
        "--label-y": `${y}%`,
      }) as CSSProperties,
    [quadrant.color, x, y],
  );

  return (
    <div className={cn(styles.label)} style={style}>
      <div className={styles.header}>
        <span>
          {getLabel("quadrant")} {quadrant.position}
        </span>
        <QuadrantLink quadrant={quadrant} />
      </div>
      <h3 className={styles.title}>{quadrant.title}</h3>
      <p className={styles.description}>{quadrant.description}</p>
    </div>
  );
}
