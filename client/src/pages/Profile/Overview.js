import Form from "react-validation/build/form";
import { DefaultTextInput } from "../../components/Base";

const Overview = (props) => {
  const { user } = props;

  return (
    <div>
      <Form>
        <div className="container">
          <div>
            <p>name</p>
            <input />
          </div>
          <div>
            <p>birthday</p>
            <input />
          </div>
          <div>
            <p>age</p>
            <input />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Overview;
