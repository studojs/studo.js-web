import { useMessage } from 'naive-ui';
import { Channel, Message, Topic } from 'studo.js';
import { useI18n } from 'vue-i18n';

export function useAction(component: Channel | Topic | Message) {
  const message = useMessage();
  const { t } = useI18n();

  return async function (action: string) {
    let copyText = '';
    if (action === 'SHARE') copyText = component.shareText;
    else if (action === 'COPYTEXT' && 'text' in component)
      copyText = component.text;
    if (copyText) {
      await navigator.clipboard.writeText(copyText);
      message.info(t('copied'));
    }
    await component.sendActions(action);
  };
}
