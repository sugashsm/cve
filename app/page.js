import { redirect } from 'next/navigation';
import CveList from "@/app/cves/list/page";
export default function Home() {
  redirect('/cves/list');
  return (
    <>
      <CveList />
    </>
  );
}
