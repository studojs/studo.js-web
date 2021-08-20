import { enUS } from 'naive-ui';
import { ActionId } from 'studo.js';

export default {
  ...enUS,
  Action: {
    BLOCKPRIVATEMESSAGE: '🛑 Block',
    COPYTEXT: '📋 Copy Text',
    DISABLEPUSH: '🔊 Disable Push Notifications',
    ENABLEPUSH: '🔊 Enable Push Notifications',
    HIDE: '💨 Hide',
    HIDEPRIVATE: '💨 Hide',
    PIN: '🎯 Pin',
    REPORT: '🖐️ Report',
    REPORTUSER: '🖐️ Report',
    SHARE: '🗣️ Share',
    STARTPRIVATEMESSAGING: '👤 Private message',
    UNPIN: '🎯 Remove Pin',
  } as Record<ActionId, string>,
};
