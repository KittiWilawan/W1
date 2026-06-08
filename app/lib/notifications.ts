export interface AppNotification {
  id: string;
  user_id: string;
  title: string;
  content: string | null;
  report_id: string | null;
  read: boolean;
  created_at: string;
}

export function isNewReportNotification(notif: AppNotification) {
  return (
    notif.title.includes("แจ้งเหตุใหม่") ||
    notif.title.includes("New Incident")
  );
}

export function isStatusUpdateNotification(notif: AppNotification) {
  return (
    notif.title.includes("อัปเดตสถานะ") ||
    notif.title.toLowerCase().includes("status")
  );
}

export function extractStatusFromNotification(notif: AppNotification): string | null {
  const match = notif.content?.match(/"(รอดำเนินการ|กำลังดำเนินการ|เสร็จสิ้น|ขอข้อมูลเพิ่ม)"/);
  return match?.[1] || null;
}

export function getNotificationListPath(userRole: "admin" | "member" | string) {
  return userRole === "admin"
    ? "/admindashboard/notification"
    : "/Dashboard/notification";
}

export function getNotificationTarget(
  notif: AppNotification,
  userRole: "admin" | "member" | string
): string | null {
  if (!notif.report_id) return null;

  if (userRole === "admin") {
    return `/admindashboard?report=${notif.report_id}`;
  }

  return `/reportissue/historys?report=${notif.report_id}`;
}

export function getStatusBadgeClass(status: string) {
  switch (status) {
    case "เสร็จสิ้น":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "กำลังดำเนินการ":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "ขอข้อมูลเพิ่ม":
      return "bg-purple-100 text-purple-700 border-purple-200";
    default:
      return "bg-amber-100 text-amber-700 border-amber-200";
  }
}
