/* eslint-disable @rushstack/no-new-null */
import * as React from 'react';

export interface IEditorQueryParameters {

  file: string | null;
}

export function useQueryParameters():
  IEditorQueryParameters {

  return React.useMemo(() => {

    const parameters =
      new URLSearchParams(
        window.location.search
      );

    return {

      file:
        parameters.get(
          'file'
        )
    };

  }, []);
}