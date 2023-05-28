
// =========== Formats the Video Pushlished Time ===========
export function formatPublishedDuration(addedDate: any):string {
    const todayDate: any = new Date();
    const diff = (todayDate - addedDate) / 1000;
    const addedMinutesAgo = Math.floor(diff / 60);
    const addedHoursAgo = Math.floor(diff / (60 * 60));
    const addedDaysAgo = Math.floor(diff / (24 * 60 * 60));
    const addedMonthsAgo = Math.floor(diff / (30 * 24 * 60 * 60));
    const addedYearsAgo = Math.floor(diff / (365 * 24 * 60 * 60));

    if (addedYearsAgo > 0) {
      return `${addedYearsAgo} year${addedYearsAgo === 1 ? "" : "s"} ago`;
    } else if (addedMonthsAgo > 0) {
      return `${addedMonthsAgo} month${addedMonthsAgo === 1 ? "" : "s"} ago`;
    } else if (addedDaysAgo > 0) {
      return `${addedDaysAgo} day${addedDaysAgo === 1 ? "" : "s"} ago`;
    } else if (addedHoursAgo > 0) {
      return `${addedHoursAgo} hour${addedHoursAgo === 1 ? "" : "s"} ago`;
    } else {
      return `${addedMinutesAgo} minute${addedMinutesAgo === 1 ? "" : "s"} ago`;
    }
  }


 // ====== Format views and Subscribers ======
export  function formatStatistics(data: string): string {
    const dataCount: number = parseInt(data, 10);
    if (dataCount >= 1000000000) {
      return Math.floor((dataCount / 1000000000)) + 'B';
    }
    if (dataCount >= 1000000) {
      return Math.floor((dataCount / 1000000)) + 'M';
    }
    if (dataCount >= 1000) {
      return Math.floor(((dataCount / 1000))) + 'K';
    }
    return data;
  }

//   Formats the Video Duration ========
  export function formatISOTime(youtube_time: string):string {
    let array = youtube_time.match(/(\d+)(?=[MHS])/gi) || [];
    const formatted = array
      .map(function (item) {
        if (item.length < 2) return "0" + item;
        return item;
      })
      .join(":");
    return formatted.length<=2 ?formatted+":00":formatted;
  }
