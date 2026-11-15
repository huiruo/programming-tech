import { pageMetadata } from "@/generated/pageMetadata";
import { Resume } from "@/components/resume";

export const metadata = pageMetadata["/resume"];

export default function Home() {
  return <div>
    <h1>
    Resume
    </h1>

    <Resume />
  </div>
}
