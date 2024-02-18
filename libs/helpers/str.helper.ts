export const timeAgo = (createdAt: string | Date) => {
  const now = new Date();
  const date = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  const timeDifference = now.getTime() - date.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (secondsDifference < 60) {
    return rtf.format(-secondsDifference, "second");
  } else if (secondsDifference < 3600) {
    const minutesDifference = Math.floor(secondsDifference / 60);
    return rtf.format(-minutesDifference, "minute");
  } else if (secondsDifference < 86400) {
    const hoursDifference = Math.floor(secondsDifference / 3600);
    return rtf.format(-hoursDifference, "hour");
  } else if (secondsDifference < 604800) {
    const daysDifference = Math.floor(secondsDifference / 86400);
    return rtf.format(-daysDifference, "day");
  } else if (secondsDifference < 2419200) {
    const weeksDifference = Math.floor(secondsDifference / 604800);
    return rtf.format(-weeksDifference, "week");
  } else if (secondsDifference < 29030400) {
    const monthsDifference = Math.floor(secondsDifference / 2419200);
    return rtf.format(-monthsDifference, "month");
  } else {
    const yearsDifference = Math.floor(secondsDifference / 29030400);
    return rtf.format(-yearsDifference, "year");
  }
};
