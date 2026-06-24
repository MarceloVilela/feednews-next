import Home from "./tech/[slug]";
import originsJson from "../assets/json/tech/origins";

export default function Main() {
  return <Home slug={originsJson.origins[0]?.title} data={[]} total={0} />;
}
