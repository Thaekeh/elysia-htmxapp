import { Input } from "../components/Input";
import { Layout } from "./Layout";

export const Root = () => {
  return (
    <Layout title="/">
      <div>This is the root</div>

      <div className="w-80">
        <h2>With a form</h2>
        <form className="w-full" hx-post="/login">
          <Input label="test" placeholder="name" type="name"></Input>
        </form>
      </div>
    </Layout>
  );
};
