import Link from "next/link";
import { CSSProperties, useMemo } from "react";

import styles from "./Label.module.css";

import { QuadrantLink } from "@/components/QuadrantLink/QuadrantLink";
import { getLabel } from "@/lib/data";
import { Sector } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LabelProps {
  quadrant: Sector;
}

export function Label({ quadrant }: LabelProps) {
  const angleInDegrees = 22.5 + (quadrant.position - 1) * 45;
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  const labelDistanceByPosition: Record<number, number> = {
    1: 62,
    2: 52,
    3: 52,
    4: 65,
    5: 65,
    6: 52,
    7: 52,
    8: 62,
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
