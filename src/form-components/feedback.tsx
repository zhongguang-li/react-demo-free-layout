import styled from 'styled-components';
import { FieldError, FieldState, FieldWarning } from '@flowgram.ai/free-layout-editor';

interface StatePanelProps {
  errors?: FieldState['errors'];
  warnings?: FieldState['warnings'];
  invalid?: boolean;
}

const Error = styled.span`
  font-size: 12px;
  color: red;
`;

const Warning = styled.span`
  font-size: 12px;
  color: orange;
`;

export const Feedback = ({ errors, warnings, invalid }: StatePanelProps) => {
  const renderFeedbacks = (fs: FieldError[] | FieldWarning[] | undefined) => {
    if (!fs) return null;
    return fs.map((f) => <span key={f.name}>{f.message}</span>);
  };
  return (
    <div>
      <div>
        <Error>{renderFeedbacks(errors)}</Error>
      </div>
      <div>
        <Warning>{renderFeedbacks(warnings)}</Warning>
      </div>
    </div>
  );
};
