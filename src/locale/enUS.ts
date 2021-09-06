import { enUS } from 'naive-ui';
import { ActionId } from 'studo.js';

export default {
  ...enUS,
  copied: 'Copied to clipboard',
  Action: {
    BLOCKPRIVATEMESSAGE: 'Block',
    COPYTEXT: 'Copy Text',
    DELETE: 'Delete',
    DISABLEPUSH: 'Disable Push Notifications',
    ENABLEPUSH: 'Enable Push Notifications',
    HIDE: 'Hide',
    HIDEPRIVATE: 'Hide',
    PIN: 'Pin',
    REPORT: 'Report',
    REPORTUSER: 'Report',
    SHARE: 'Share',
    STARTPRIVATEMESSAGING: 'Private Message',
    UNPIN: 'Remove Pin',
  } as Record<ActionId, string>,
  Tag: {
    ACCEPTEDANSWER: 'Accepted Answer',
    DONE: 'Done',
    INPLANNING: 'In Planning',
  },
};
