import type { BuildStatus } from '../types/core';
export default function StatusBadge({status}:{status:BuildStatus}) {
  return <span className={`status-badge status-${status.toLowerCase().replaceAll('/','-').replaceAll(' ','-')}`}>{status}</span>;
}
