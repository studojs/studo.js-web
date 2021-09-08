import { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider';
import { Channel, Message, Topic } from 'studo.js';
import { useI18n } from 'vue-i18n';

export async function useAction(
  action: string,
  component: Channel | Topic | Message,
  message: MessageApiInjection
) {
  const { t } = useI18n();
  let copyText = '';
  if (action === 'SHARE') copyText = component.shareText;
  else if (action === 'COPYTEXT' && 'text' in component)
    copyText = component.text;
  if (copyText) {
    await navigator.clipboard.writeText(copyText);
    message.info(t('copied'));
    return;
  }
  await component.sendActions(action);
}
