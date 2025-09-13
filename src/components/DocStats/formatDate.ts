export function formatDateUS(ts: number | string | undefined): string | null {
    if (!ts) return null;
  
    let date: Date;
    if (typeof ts === 'number') {
      // Heuristic: <1e12 = seconds, otherwise milliseconds
      date = new Date(ts < 1e12 ? ts * 1000 : ts);
    } else {
      const d = new Date(ts);
      if (Number.isNaN(d.getTime())) return null;
      date = d;
    }
  
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',  // Jun
      day: '2-digit',  // 27
      year: 'numeric', // 2025
    }).format(date);
  }