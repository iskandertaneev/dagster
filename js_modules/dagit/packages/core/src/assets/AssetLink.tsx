import {Box, Colors, Icon, MiddleTruncate} from '@dagster-io/ui';
import * as React from 'react';
import {Link} from 'react-router-dom';

import {assetDetailsPathForKey} from './assetDetailsPathForKey';

export const AssetLink: React.FC<{
  path: string[];
  icon?: 'asset' | 'asset_non_sda' | 'folder';
  textStyle?: 'break-word' | 'middle-truncate';
  url?: string;
  isGroup?: boolean;
}> = (props) => {
  const {path, icon, url, isGroup, textStyle = 'break-word'} = props;
  const linkUrl = url ? url : assetDetailsPathForKey({path});

  const text = () => {
    if (textStyle === 'break-word') {
      return (
        <span style={{wordBreak: 'break-word'}}>
          {path
            .map((p, i) => <span key={i}>{p}</span>)
            .reduce(
              (accum, curr, ii) => [
                ...accum,
                ii > 0 ? <React.Fragment key={`${ii}-space`}>&nbsp;/&nbsp;</React.Fragment> : null,
                curr,
              ],
              [] as React.ReactNode[],
            )}
          {isGroup ? '/' : null}
        </span>
      );
    }

    const assetPath = path
      .reduce((accum, elem, ii) => {
        return [...accum, ii > 0 ? ' / ' : '', elem];
      }, [] as string[])
      .join('');

    return <MiddleTruncate text={assetPath} />;
  };

  return (
    <Box
      flex={{direction: 'row', alignItems: 'flex-start', display: 'inline-flex'}}
      style={{maxWidth: '100%'}}
    >
      {icon ? (
        <Box margin={{right: 8, top: 1}}>
          <Icon name={icon} color={Colors.Gray400} />
        </Box>
      ) : null}
      <Link to={linkUrl} style={{overflow: 'hidden'}}>
        {text()}
        {isGroup ? '/' : null}
      </Link>
    </Box>
  );
};
