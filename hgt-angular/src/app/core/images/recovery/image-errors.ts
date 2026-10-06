function text(error: any): string {
  return String(
    error?.message ||
    error?.error ||
    error ||
    '',
  ).toLowerCase();
}

export function imageFlagged(error: any): boolean {
  const code = String(
    error?.code || error?.hgtCode || '',
  ).toUpperCase();

  return (
    code === '3030_RETRY_FLAGGED' ||
    code === '3030' ||
    /3030_retry_flagged|cloudflare 3030|retry_also_flagged/.test(
      text(error),
    )
  );
}

export function imageQuota(error: any): boolean {
  return /429|4006|daily free allocation|quota|neurons? used|allocation.*used|too many requests/.test(
    text(error),
  );
}

export function imageTransient(error: any): boolean {
  return /failed to fetch|network|timeout|timed out|d[ée]pass[ée]|temporar|unavailable|502|503|504|gateway|connection|edge function/.test(
    text(error),
  );
}
