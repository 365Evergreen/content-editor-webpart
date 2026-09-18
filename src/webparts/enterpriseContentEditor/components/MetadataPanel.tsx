import * as React from 'react';

import {
  Field,
  Input
} from '@fluentui/react-components';

import { IContentDocument } from '../common/models/IContentDocument';

export interface IMetadataPanelProps {
  document: IContentDocument;

  onTitleChange(
    value: string
  ): void;

  onRouteChange(
    value: string
  ): void;
}

export const MetadataPanel:
React.FC<IMetadataPanelProps> = ({
  document,
  onTitleChange,
  onRouteChange
}) => {

  return (
    <div>

      <Field
        label='Title'
      >
        <Input
          value={document.title}
          onChange={(_, data) =>
            onTitleChange(data.value)
          }
        />
      </Field>

    </div>
  );
};