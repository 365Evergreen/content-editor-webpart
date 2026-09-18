/* eslint-disable @rushstack/no-new-null */
import * as React from 'react';

export interface IEditorQueryParameters {

  /**
   * Example:
   * /sites/site/BlogPostContent/about-us.json
   */
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