import React, { useContext } from "react";
import Context from "@/presentation/contexts/form/form-context";

type Props = {
  label: string;
};

const SubmitButton: React.FC<Props> = ({ label }: Props) => {
  const { state } = useContext(Context);

  return (
    <button data-testid="submit" disabled={state.isFomInvalid}>
      {label}
    </button>
  );
};

export default SubmitButton;
