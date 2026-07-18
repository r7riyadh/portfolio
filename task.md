# CMS Fetch Delay Calibration Tasks (6-Second Window)

- [x] Increase request timeout limit from `4000ms` to `6000ms` in `googleSheets.ts` to allow extreme latency networks to load rows
- [x] Slow down active timeline drawing animation inside `GitCommitLoader.tsx` to `6.0` seconds
- [x] Tune status cycle interval speed to `1500ms` (1.5 seconds) per tick
- [x] Shift delay multipliers for nodes 1-4 to `1.5`, `3.0`, `4.5`, `6.0` respectively
- [x] Enforce minimum loader duration of `6500ms` (6.5 seconds) in `App.tsx`
- [x] Run `npm run build` to verify clean compilation
