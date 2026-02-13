export const RADAR_BASE_START_ANGLE = 270;

export function getSectorAngle(sectorCount: number): number {
  return 360 / sectorCount;
}

export function getSectorStartAngle(
  position: number,
  sectorCount: number,
): number {
  return RADAR_BASE_START_ANGLE + (position - 1) * getSectorAngle(sectorCount);
}

export function getSectorCenterAngle(
  position: number,
  sectorCount: number,
): number {
  return (
    getSectorStartAngle(position, sectorCount) + getSectorAngle(sectorCount) / 2
  );
}
