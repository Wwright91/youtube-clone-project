export function formatDuration(duration) {
  // take out PT and S, '3H3M' => '3H03M', '3M2' => '3M02'
  duration = duration
    .slice(2, -1)
    .replace(/H(\d)M/, "H0$1M")
    .replace(/M(\d)$/, "M0$1")
    .replace(/[HM]/g, ":");

  if (duration.length === 2) {
    duration = "00:" + duration;
  } else if (duration.length === 1) {
    duration = "00:" + duration + "0";
  }
  return duration;
}

export function formatViewsCount(views) {
  if (views.length >= 4 && views.length < 7) {
    views = views.slice(0, -3) + "," + views.slice(-3);
  } else if (views.length >= 7) {
    if (views[1] !== "0") {
      views = views[0] + "." + views[1] + "M";
    } else {
      views = views[0] + "M";
    }
  }
  return views;
}
