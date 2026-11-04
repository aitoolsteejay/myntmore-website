import Story from "./CaseStudyStoryQuote";
import data from "@/content/case-study-long/ecommerce-conversion-playbook.json";

export default function Body() {
  return <Story d={data} slug="ecommerce-conversion-playbook" />;
}
