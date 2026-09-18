import * as React from 'react';

import {
  Badge
} from '@fluentui/react-components';

export interface ISaveStatusProps {
  dirty: boolean;
}

export const SaveStatus:
React.FC<ISaveStatusProps> = ({
  dirty
}) => {

  return (
    <Badge
      color={
        dirty
          ? 'warning'
          : 'success'
      }
    >
      {
        dirty
          ? 'Unsaved'
          : 'Saved'
      }
    </Badge>
  );
};