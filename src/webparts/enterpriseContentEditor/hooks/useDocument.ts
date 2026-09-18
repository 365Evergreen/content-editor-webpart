import { useState } from 'react';

import { IContentDocument } from '../common/models/IContentDocument';
import { createEmptyDocument } from '../common/utils/createEmptyDocument';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useDocument() {
  const [document, setDocument] =
    useState<IContentDocument>(
      createEmptyDocument()
    );

  const [dirty, setDirty] =
    useState<boolean>(false);

  return {
    document,
    setDocument,
    dirty,
    setDirty
  };
}