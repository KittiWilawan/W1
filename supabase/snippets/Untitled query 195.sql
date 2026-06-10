alter table public.reports drop constraint if exists reports_status_check;

alter table public.reports
  add constraint reports_status_check
  check (status in ('รอดำเนินการ','กำลังดำเนินการ','ขอข้อมูลเพิ่ม','เสร็จสิ้น','ปฎิเสธ'));